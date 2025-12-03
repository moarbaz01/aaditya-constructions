import { NextResponse } from "next/server";
import ContestEntry from "../../../../models/ContestEntry";
import { verifyPhonePePayment } from "@/lib/phonepay";
import connectDB from "../../../../lib/db";

async function handleVerification(
  merchantTransactionId: string,
  userData: string
) {
  console.log("Starting payment verification for:", {
    merchantTransactionId,
  });

  await connectDB();

  if (!merchantTransactionId || !userData) {
    console.log("Missing required parameters");
    return NextResponse.json(
      { error: "Missing transaction ID or user data" },
      { status: 400 }
    );
  }

  let parsedUserData;
  try {
    parsedUserData = JSON.parse(decodeURIComponent(userData));
  } catch (error) {
    return NextResponse.json({ error: "Invalid user data" }, { status: 400 });
  }

  let verificationResult;
  try {
    console.log("Calling PhonePe verification API...");
    verificationResult = await verifyPhonePePayment(merchantTransactionId);
    console.log("PhonePe verification response:", verificationResult);
  } catch (error) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }

  const paymentState = verificationResult?.state;
  const isCompleted = paymentState === "COMPLETED";

  console.log("Payment state:", paymentState, "Is completed:", isCompleted);

  // Create contest entry with payment status
  try {
    const existingEntry = await ContestEntry.findOne({
      email: parsedUserData.email,
      phone: parsedUserData.phone,
    });

    if (!existingEntry) {
      await ContestEntry.create({
        name: parsedUserData.name,
        email: parsedUserData.email,
        phone: parsedUserData.phone,
        gender: parsedUserData.gender,
        address: parsedUserData.address,
        city: parsedUserData.city,
        state: parsedUserData.state,
        pincode: parsedUserData.pincode,
        paymentStatus: isCompleted ? "completed" : "failed",
        transactionId: merchantTransactionId,
        essay: "",
      });
      console.log(
        "Contest entry created with payment status:",
        isCompleted ? "completed" : "failed"
      );
    }
  } catch (error) {
    console.error("Error creating contest entry:", error);
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";
  const redirectUrl = isCompleted
    ? `${baseUrl}/payment/success?transactionId=${merchantTransactionId}&email=${encodeURIComponent(
        parsedUserData.email
      )}&phone=${encodeURIComponent(parsedUserData.phone)}`
    : `${baseUrl}/payment/failure?transactionId=${merchantTransactionId}`;

  console.log("Redirecting to:", redirectUrl);
  return NextResponse.redirect(redirectUrl);
}

export async function GET(request: Request) {
  try {
    console.log("GET request received for payment verification");
    const { searchParams } = new URL(request.url);
    const merchantTransactionId = searchParams.get("merchantTransactionId");
    const userData = searchParams.get("userData");

    console.log("URL parameters:", { merchantTransactionId });

    if (!merchantTransactionId || !userData) {
      console.log("Missing URL parameters");
      return NextResponse.json(
        { error: "Missing transaction ID or user data" },
        { status: 400 }
      );
    }

    return await handleVerification(merchantTransactionId, userData);
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    console.log("POST request received for payment verification");
    const body = await request.json();
    const { merchantTransactionId, userData } = body;

    console.log("Request body:", { merchantTransactionId });

    return await handleVerification(merchantTransactionId, userData);
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Payment verification failed" },
      { status: 500 }
    );
  }
}
