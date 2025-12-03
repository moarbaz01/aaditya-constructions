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
    const { email, phone } = await request.json();

    if (!email || !phone) {
      return NextResponse.json(
        { error: "Email and phone are required" },
        { status: 400 }
      );
    }

    const contest = await ContestEntry.findOne({ email, phone });

    if (!contest) {
      return NextResponse.json(
        { error: "No entry found with these details" },
        { status: 404 }
      );
    }

    return NextResponse.json({ contest }, { status: 200 });
  } catch (error) {
    console.error("Error fetching contest status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
