import { NextResponse } from "next/server";
import ContestEntry from "../../../../models/ContestEntry";
import connectDB from "../../../../lib/db";

export async function GET(request: Request) {
  try {
    await connectDB();
  } catch (dbError) {
    return NextResponse.json(
      { error: "Database connection failed" },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "50");
    const skip = (page - 1) * limit;

    const total = await ContestEntry.countDocuments();
    const contests = await ContestEntry.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select("-__v");

    return NextResponse.json(
      { contests, total, page, totalPages: Math.ceil(total / limit) },
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
