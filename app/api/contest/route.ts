import { NextResponse } from "next/server";
import ContestEntry from "../../../models/ContestEntry";
import connectDB from "../../../lib/db";

export async function POST(request: Request) {
  try {
    await connectDB();
  } catch (dbError) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    console.log("Received contest data:", body);
    const { name, email, phone, gender, address, city, state, pincode } = body;

    // Validate required fields
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

    const { essay, transactionId } = body;

    if (!essay) {
      return NextResponse.json({ error: "Essay is required" }, { status: 400 });
    }

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingEntry = await ContestEntry.findOne({ email, phone });
    if (existingEntry) {
      return NextResponse.json(
        { error: "Email or Phone already registered for contest" },
        { status: 409 }
      );
    }

    // Create new contest entry with essay and transaction ID
    const contestEntry = new ContestEntry({
      name,
      email,
      phone,
      gender,
      address,
      city,
      state,
      pincode,
      paymentStatus: "completed",
    });

    contestEntry.essay = essay;
    contestEntry.transactionId = transactionId;

    console.log("Creating contest entry with essay:", essay);
    console.log("Contest entry before save:", contestEntry.toObject());
    await contestEntry.save();
    console.log("Contest entry saved:", contestEntry.toObject());

    return NextResponse.json(
      {
        message: "Contest entry saved successfully",
        entryId: contestEntry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contest entry error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
