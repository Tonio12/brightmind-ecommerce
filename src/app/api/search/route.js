import { NextResponse } from "next/server";
import { Product } from "../../../../models/Product";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  try {
    const response = await Product.find({
      title: { $regex: query, $options: "i" },
    });
    return NextResponse.json(response, { status: 200 });
  } catch (err) {
    return NextResponse.error(err, { status: 500 });
  }
}
