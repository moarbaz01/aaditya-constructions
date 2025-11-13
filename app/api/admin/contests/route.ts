import { NextResponse } from "next/server";
import ContestEntry from "../../../../models/ContestEntry";
import connectDB from "../../../../lib/db";

export async function GET() {
  try {
    await connectDB();
  } catch (dbError) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 503 }
    );
  }

  try {
    const contests = await ContestEntry.find()
      .sort({ createdAt: -1 })
      .select("-__v");

    return NextResponse.json(
      { contests, total: contests.length },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching contests:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
