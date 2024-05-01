"use client";
import { styled } from "styled-components";
import ProductBox from "./ProductBox";
import ProductsGrid from "./ProductsGrid";

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 0 5rem;
  font-weight: 400px;
`;

function NewProducts({ products }) {
  return (
    <>
      <Title>New Arrivals</Title>
      <ProductsGrid products={products} />
    </>
  );
}

export default NewProducts;
