"use client";
import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 30px 5rem;
  gap: 40px;
`;

const Title = styled.h2`
  font-size: 2rem;
  margin: 30px 0 0 5rem;
  font-weight: 400px;
`;

function NewProducts({ products }) {
  return (
    <>
      <Title>New Arrivals</Title>
      <ProductsGrid>
        {products.map((product) => (
          <ProductBox {...product} key={product._id}></ProductBox>
        ))}
      </ProductsGrid>
    </>
  );
}

export default NewProducts;
