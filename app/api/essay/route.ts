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
    const { email, phone, text } = body;

    if (!email || !phone || !text) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const contestEntry = await ContestEntry.findOneAndUpdate(
      { email, phone, paymentStatus: "completed" },
      { essay: text },
      { new: true }
    );

    if (!contestEntry) {
      return NextResponse.json(
        { error: "Contest entry not found or payment not completed" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Essay submitted successfully", entryId: contestEntry._id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Essay submission error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
