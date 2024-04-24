import connectMongoDB from "../../lib/mongoose";
import Header from "./Components/Header";
import NewProducts from "./Components/NewProducts";
import { Product } from "../../models/Product";

export default async function Home() {
  const data = await getData();
  const products = data.map((product) => {
    return {
      _id: product._id.toString(), // Convert buffer to string
      title: product.title,
      description: product.description,
      price: product.price,
      images: product.images, // Handle images appropriately 
      category: product.category.toString(),
      updatedAt: product.updatedAt.toString(), // Convert date to string
    };
  });

  return (
    <div>
      <Header />
      <NewProducts products = {...products}/>
    </div>
  );
}

async function getData() {
  await connectMongoDB();
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });
  return newProducts;
}
