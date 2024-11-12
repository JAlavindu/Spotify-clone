import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: {
    typeOf: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  clerkId: {
    type: String,
    required: true,
  },
});
