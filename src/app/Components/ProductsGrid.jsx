"use client";

import { styled } from "styled-components";
import ProductBox from "./ProductBox";

const StyledProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  padding: 30px 5rem;
  gap: 40px;
`;

export default function ProductsGrid({ products }) {
  return (
    <StyledProductsGrid>
      {products.map((product) => (
        <ProductBox {...product} key={product._id}></ProductBox>
      ))}
    </StyledProductsGrid>
  );
}
