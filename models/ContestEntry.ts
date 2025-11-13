import mongoose from "mongoose";

interface IContestEntry {
  name: string;
  email: string;
  phone: string;
  gender: "male" | "female" | "other";
  address: string;
  city: string;
  state: string;
  pincode: string;
  entryFee: number;
  paymentStatus: "pending" | "completed" | "failed";
  entryDate: Date;
  transactionId?: string;
  essay?: string;
}

const contestEntrySchema = new mongoose.Schema<IContestEntry>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    pincode: {
      type: String,
      required: true,
      trim: true,
    },
    entryFee: {
      type: Number,
      default: 399,
    },
    essay: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    entryDate: {
      type: Date,
      default: Date.now,
    },
    transactionId: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ContestEntry ||
  mongoose.model<IContestEntry>("ContestEntry", contestEntrySchema);
