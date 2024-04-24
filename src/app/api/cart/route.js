import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/mongoose";
import { Product } from "../../../../models/Product";

export async function POST(req) {
  try {
    // 1. Parse request body
    const body = await req.json();
    const { ids } = body;

    // 2. Validate input (optional)
    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { error: "Invalid product IDs" },
        { status: 400 }
      );
    }

    // 3. Connect to MongoDB (assuming you have a separate function)
    await connectMongoDB();

    // 4. Find products with proper execution
    const products = await Product.find({ _id: { $in: ids } });

    // 5. Return successful response
    return NextResponse.json(products);
  } catch (error) {
    console.error(error);
    // Handle errors appropriately, e.g., return an error response
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
