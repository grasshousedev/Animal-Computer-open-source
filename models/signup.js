import mongoose from "mongoose";

export const signUpUser = mongoose.model("signup users", {
  firstName: String,
  lastName: String,
  email: {
    type: String,
    trim: true,
    lowercase: true,
  },
  password: String,
  phoneNumber: String,
  address: String,
  seller: Boolean,

  created: { type: Date, default: Date.now },
});
