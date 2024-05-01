import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema(
  {
    line_items: Object,
    name: String,
    landmark: String,
    streetAddress: String,
    mobileNumber: String,
    email: String,
    paid: Boolean,
  },
  {
    timestamps: true,
  }
);

export const Order =
  mongoose.models.Order || mongoose.model("Order", OrderSchema);
