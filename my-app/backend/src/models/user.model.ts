import mongoose from "mongoose";

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "USER";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: String,
  role: {
    type: String,
    enum: ["SUPER_ADMIN", "ADMIN", "USER"],
    default: "USER",
  },
  createdAt: Date,
  updataedAt: Date,
  createdBy: String,
});

export const User = mongoose.model("User", userSchema);
