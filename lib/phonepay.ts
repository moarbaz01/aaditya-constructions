import axios from "axios";

let cachedToken: string | null = null;
let tokenExpiry: number | null = null;

/**
 * STEP 1: Generate and Cache OAuth Token (PG v2)
 */
async function getPhonePeAuthToken() {
  try {
    if (cachedToken && tokenExpiry && Date.now() < tokenExpiry) {
      return cachedToken;
    }

    const clientId = process.env.PHONEPE_CLIENT_ID!;
    const clientSecret = process.env.PHONEPE_CLIENT_SECRET!;
    const clientVersion = "1";

    const tokenUrl =
      process.env.NODE_ENV === "production"
        ? "https://api.phonepe.com/apis/identity-manager/v1/oauth/token"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";

    const formData = new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      client_version: clientVersion,
      grant_type: "client_credentials",
    });

    const { data } = await axios.post(tokenUrl, formData, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    cachedToken = data.access_token;
    tokenExpiry = Date.now() + 55 * 60 * 1000; // 55 mins validity
    return cachedToken;
  } catch (error: any) {
    console.error("Error generating token:", error.response);
    throw error;
  }
}

/**
 * STEP 2: Create Payment (PG v2)
 */
export async function createPhonePePayment(
  orderId: string,
  amountInRupees: number,
  redirectUrl: string
) {
  try {
    const amountInPaise = amountInRupees * 100;

    const payload = {
      merchantOrderId: orderId,
      amount: amountInPaise,
      expireAfter: 1200,

      paymentFlow: {
        type: "PG_CHECKOUT",
        message: "Payment message used for collect requests",
        merchantUrls: {
          redirectUrl: redirectUrl ?? "",
        },
        paymentModeConfig: {
          enabledPaymentModes: [
            {
              type: "UPI_INTENT",
            },
            {
              type: "UPI_COLLECT",
            },
            {
              type: "UPI_QR",
            },
            {
              type: "NET_BANKING",
            },
            {
              type: "CARD",
              cardTypes: ["DEBIT_CARD", "CREDIT_CARD"],
            },
          ],
          disabledPaymentModes: [
            {
              type: "UPI_INTENT",
            },
            {
              type: "UPI_COLLECT",
            },
            {
              type: "UPI_QR",
            },
            {
              type: "NET_BANKING",
            },
            {
              type: "CARD",
              cardTypes: ["DEBIT_CARD", "CREDIT_CARD"],
            },
          ],
        },
      },
    };

    const endpoint =
      process.env.NODE_ENV === "production"
        ? "https://api.phonepe.com/apis/pg/checkout/v2/pay"
        : "https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/pay";

    const token = await getPhonePeAuthToken();

    const res = await axios.post(endpoint, payload, {
      headers: {
        Authorization: `O-Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return res;
  } catch (error: any) {
    console.error("Error creating payment:", error.response.data);
    throw error;
  }
}

/**
 * STEP 3: Verify Payment (PG v2)
 */
export async function verifyPhonePePayment(merchantTransactionId: string) {
  const endpoint =
    process.env.NODE_ENV === "production"
      ? `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantTransactionId}/status`
      : `https://api-preprod.phonepe.com/apis/pg-sandbox/checkout/v2/order/${merchantTransactionId}/status`;

  const token = await getPhonePeAuthToken();

  const { data } = await axios.get(endpoint, {
    headers: {
      Authorization: `O-Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  return data;
}
