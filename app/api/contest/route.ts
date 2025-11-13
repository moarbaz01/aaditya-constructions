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
    if (
      !name ||
      !email ||
      !phone ||
      !gender ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
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
