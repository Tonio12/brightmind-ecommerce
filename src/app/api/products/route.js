import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  try {
    await connectMongoDB();

    if (id !== null) {
      const productDoc = await Product.findById(id);
      return NextResponse.json(productDoc, { status: 200 });
    }

    const products = await Product.find({}, null, {
      sort: { _id: -1 },
    });
    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    return NextResponse.error(err);
  }
}
