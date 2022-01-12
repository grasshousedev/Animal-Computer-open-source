import mongoose from "mongoose";

export const orders = mongoose.model("client orders", {
  clientId: String,
  firstName: String,
  lastName: String,
  phoneNumber: String,
  deliveryAddress: String,
  googleLocation: String,
  total: String,
  arrayOfCart: Array,
  status: { type: String, default: "pending" },

  created: { type: Date, default: Date.now },
});
