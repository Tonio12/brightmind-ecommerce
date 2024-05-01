"use client";

import ProductImages from "@/app/Components/ProductImages";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { CartContext } from "@/app/Components/CartContext";

const Wrapper = styled.div`
  padding: 1rem 5rem;
`;
const Title = styled.h1`
  font-size: 1.5rem;
`;

const ColWrap = styled.div`
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 40px;
  margin-top: 40px;
`;

const Box = styled.div`
  padding: 20px;
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

const PriceRow = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

function Page({ params }) {
  const id = params.id;
  const [productInfo, setProductInfo] = useState(null);
  const { addProduct } = usePageContext();

  useEffect(() => {
    axios.get("/api/products?id=" + id).then((resp) => {
      setProductInfo(resp.data);
    });
  }, []);
  return (
    <Wrapper>
      {productInfo && (
        <ColWrap>
          <Box>
            <ProductImages images={productInfo?.images} />
          </Box>
          <div>
            <Title>{productInfo.title}</Title>
            <p>{productInfo.description}</p>
            <PriceRow>
              <span style={{ fontSize: "1.5rem" }}>${productInfo.price}</span>
              <button
                className="btn-primary"
                onClick={() => addProduct(productInfo._id)}
              >
                <ShoppingCartIcon
                  style={{
                    height: "16",
                    padding: 0,
                    margin: 0,
                    border: "0px",
                    color: "#white",
                  }}
                />
                Add to cart
              </button>
            </PriceRow>
          </div>
        </ColWrap>
      )}
    </Wrapper>
  );
}

function usePageContext() {
  const contextValue = useContext(CartContext);
  return contextValue;
}

export default Page;
