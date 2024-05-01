import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";
import { Order } from "../../../../models/Order";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK);
export async function POST(req) {
  const body = await req.json();
  const { name, cartProducts, email, mobileNumber, landmark, streetAddress } =
    body;
  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  await connectMongoDB();
  const productInfos = await Product.find({ _id: { $in: uniqueIds } });

  let line_items = [];
  for (const id of uniqueIds) {
    const info = productInfos.find((p) => p._id.toString() === id);
    const quantity = productIds.filter((_id) => _id === id)?.length || 0;
    if (quantity > 0 && info) {
      line_items.push({
        quantity,
        price_data: {
          currency: "USD",
          product_data: { name: info.title },
          unit_amount: info.price * 100,
        },
      });
    }
  }

  const orderDoc = await Order.create({
    line_items,
    name,
    landmark,
    streetAddress,
    mobileNumber,
    email,
    paid: false,
  });

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: "payment",
    success_url: process.env.BASE_URL + "/cart?success=true",
    cancel_url: process.env.BASE_URL + "/cart?canceled=true",
    metadata: {
      orderId: orderDoc._id.toString(),
    },
  });

  return NextResponse.json(session.url);
}
