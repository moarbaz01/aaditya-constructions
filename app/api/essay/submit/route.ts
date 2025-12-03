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
    const { email, phone, essay } = await request.json();

    if (!email || !phone || !essay) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const contest = await ContestEntry.findOne({ email, phone });

    if (!contest) {
      return NextResponse.json(
        { error: "No entry found" },
        { status: 404 }
      );
    }

    if (contest.essay) {
      return NextResponse.json(
        { error: "Essay already submitted" },
        { status: 400 }
      );
    }

    contest.essay = essay;
    await contest.save();

    return NextResponse.json(
      { message: "Essay submitted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting essay:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
