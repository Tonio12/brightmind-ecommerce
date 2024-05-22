"use client";
import { styled } from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";

const StyledHeader = styled.header``;

export default function Header() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      const data = response.data;
      setProducts((prev) => {
        return data.filter((product) => {
          return (
            product.title === "Pepsi" ||
            product.title === "Guinness" ||
            product.title === "Coca Cola"
          );
        });
      });
    });
  }, []);
  return (
    <StyledHeader>
      <ProductCarousel products={products} />;
    </StyledHeader>
  );
}
