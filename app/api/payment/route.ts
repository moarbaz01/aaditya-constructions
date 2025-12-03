import { NextResponse } from "next/server";
import { createPhonePePayment } from "../../../lib/phonepay";
import ContestEntry from "../../../models/ContestEntry";
import connectDB from "../../../lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, phone, gender, address, city, state, pincode } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }
    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    if (!phone) {
      return NextResponse.json(
        { error: "Phone is required" },
        { status: 400 }
      );
    }
    if (!gender) {
      return NextResponse.json(
        { error: "Gender is required" },
        { status: 400 }
      );
    }
    if (!address) {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 }
      );
    }
    if (!city) {
      return NextResponse.json(
        { error: "City is required" },
        { status: 400 }
      );
    }
    if (!state) {
      return NextResponse.json(
        { error: "State is required" },
        { status: 400 }
      );
    }
    if (!pincode) {
      return NextResponse.json(
        { error: "Pincode is required" },
        { status: 400 }
      );
    }

    // Validate name (only letters and spaces)
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      return NextResponse.json(
        { error: "Name should contain only letters and spaces" },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Validate phone (10 digits)
    if (!/^\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: "Phone number must be exactly 10 digits" },
        { status: 400 }
      );
    }

    // Validate pincode (6 digits)
    if (!/^\d{6}$/.test(pincode)) {
      return NextResponse.json(
        { error: "Pincode must be exactly 6 digits" },
        { status: 400 }
      );
    }
    const amount = 199;

    await connectDB();

    const isExistingContest = await ContestEntry.findOne({
      email,
      phone,
    });

    if (isExistingContest) {
      return NextResponse.json(
        { error: "You have already registered for the contest" },
        { status: 400 }
      );
    }

    // Generate unique order ID
    const orderId = `ORDER_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Validate environment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      return NextResponse.json(
        { error: "Base URL not configured" },
        { status: 500 }
      );
    }

    // ✅ Redirect to verify route with user data
    const userData = encodeURIComponent(
      JSON.stringify({
        name,
        email,
        phone,
        gender,
        address,
        city,
        state,
        pincode,
        amount,
      })
    );
    const redirectUrl = `${baseUrl}/api/payment/verify?merchantTransactionId=${encodeURIComponent(
      orderId
    )}&userData=${userData}`;

    console.log("Initiating PhonePe payment for:", {
      orderId,
      amount,
      email,
      redirectUrl,
    });

    const paymentResponse = await createPhonePePayment(
      orderId,
      amount,
      redirectUrl
    );

    // ✅ v2 returns `code` and `data`
    if (paymentResponse?.status !== 200 || !paymentResponse?.data) {
      return NextResponse.json(
        {
          success: false,
          error: paymentResponse?.data.message || "Payment creation failed",
        },
        { status: 500 }
      );
    }

    // ✅ v2 redirect URL
    const redirectInfo = paymentResponse.data.redirectUrl;

    console.log("redirect url", redirectInfo);

    if (!redirectInfo) {
      return NextResponse.json(
        { success: false, error: "Redirect URL not received" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      paymentUrl: redirectInfo,
      orderId: paymentResponse.data.merchantTransactionId,
    });
  } catch (error: any) {
    console.error("Payment API error:", error);
    return NextResponse.json(
      { error: "Payment initiation failed" },
      { status: 500 }
    );
  }
}
