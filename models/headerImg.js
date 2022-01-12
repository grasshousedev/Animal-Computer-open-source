import mongoose from "mongoose";

export const headersImages = mongoose.model("headers images", {
  imageURL: String,

  created: { type: Date, default: Date.now },
});
