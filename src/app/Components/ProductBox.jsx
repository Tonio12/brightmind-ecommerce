"use client";

import { styled } from "styled-components";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { useRouter } from "next/navigation";

const ProductWrapper = styled.div`
  width: 80%;
`;

const Box = styled.div`
  padding: 20px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background-color: #fdf0d5;
  img {
    max-width: 100%;
    max-height: 80px;
  }
`;

const Title = styled.h2`
  font-weight: normal;
  font-size: 0.9rem;
  margin: 0;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2px;
  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
    button {
      width: 100%;
      gap: 50px;
    }
  }
`;

const Price = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  @media screen and (max-width: 900px) {
    font-size: 1rem;
  }
`;

export default function ProductBox({ _id, title, description, price, images }) {
  const { addProduct } = useContext(CartContext);
  const router = useRouter();

  return (
    <ProductWrapper>
      <Box onClick={() => router.push(`/product/${_id}`)}>
        <img src={images[0]} alt="" />
      </Box>
      <ProductInfoBox>
        <Title>{title}</Title>
        <PriceRow>
          <Price>GHS {price}</Price>
          <button onClick={() => addProduct(_id)} className="btn-secondary">
            <ShoppingCartIcon
              style={{
                height: "16",
                padding: 0,
                margin: 0,
                border: "0px",
                color: "#c1121f",
              }}
            />
            Add to cart
          </button>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}
