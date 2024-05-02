"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ProductsGrid from "../Components/ProductsGrid";

const Title = styled.h1`
  font-size: 1.5rem;
`;

const Wrapper = styled.div`
  padding: 0 5rem;
  @media screen and (max-width: 900px) {
    padding: 0 1rem;
  }
`;

function Page() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get("/api/products").then((response) => {
      const data = response.data;
      setProducts((prev) => {
        return data.map((product) => {
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
      });
    });
  }, []);
  return (
    <Wrapper>
      <Title>All Products</Title>
      {products.length > 0 && <ProductsGrid products={products} />}
    </Wrapper>
  );
}

export default Page;
