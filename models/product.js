import mongoose from "mongoose";

export const sellProduct = mongoose.model("products", {
  authorId: String,
  authorName: String,

  title: String,
  description: String,
  brand: String,
  color: String,
  productType: String,
  processorName: String,
  processorDetail: String,
  price: String,
  display: String,
  displayDetails: String,
  ram: String,
  storage: String,
  label: String,
  imageURL1: String,
  imageURL2: String,
  imageURL3: String,
  imageURL4: String,

  created: { type: Date, default: Date.now },
});
