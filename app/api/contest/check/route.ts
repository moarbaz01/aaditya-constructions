import { NextResponse } from "next/server";
import ContestEntry from "../../../../models/ContestEntry";
import connectDB from "../../../../lib/db";

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
    const { email, phone } = body;

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email and phone are required" },
        { status: 400 }
      );
    }

    const existingEntry = await ContestEntry.findOne({ email, phone });
    
    if (existingEntry) {
      return NextResponse.json(
        { error: "Email or Phone already registered for contest" },
        { status: 409 }
      );
    }

    return NextResponse.json({ message: "Available" }, { status: 200 });
  } catch (error) {
    console.error("Contest check error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
