"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import ProductsGrid from "../Components/ProductsGrid";
import SearchBar from "../Components/SearchBar";

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin: 0 5rem;
`;

const Wrapper = styled.div`
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
            category: product.category,
            updatedAt: product.updatedAt,
          };
        });
      });
    });
  }, []);
  return (
    <Wrapper>
      <SearchBar />
      <Title>All Products</Title>
      {products.length > 0 && <ProductsGrid products={products} />}
    </Wrapper>
  );
}

export default Page;
