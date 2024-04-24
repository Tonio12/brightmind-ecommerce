"use client";

import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { CartContext } from "../Components/CartContext";
import axios from "axios";
import Table from "../Components/Table";

const ColumnsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 40px;
  padding: 0 5rem;
  margin-top: 50px;
`;

const Box = styled.div`
  border-radius: 10px;
  padding: 30px;
`;

const ProductInfoCell = styled.td`
  img {
    max-width: 150px;
    max-height: 150px;
  }
`;

const ProductImageBox = styled.div`
  max-width: 150px;
  max-height: 150px;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 0 10px #669bbc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function page() {
  const { cartProducts } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post(`/api/cart`, { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  return (
    <ColumnsWrapper>
      <Box>
        <h2>Cart</h2>
        {!cartProducts?.length && <div>You cart is empty</div>}
        <Table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cartProducts?.length > 0 && (
              <>
                {products.map((product) => (
                  <tr key={product._id}>
                    <ProductInfoCell>
                      <ProductImageBox>
                        <img src={product.images[0]} alt="" />
                      </ProductImageBox>
                      {product.title}
                    </ProductInfoCell>
                    <td>
                      {cartProducts.filter((id) => id === product._id).length}
                    </td>
                    <td>GHS {product.price}</td>
                  </tr>
                ))}
              </>
            )}
          </tbody>
        </Table>
      </Box>
      {!!cartProducts.length && (
        <Box>
          <h2>Order Information</h2>
          <input type="text" placeholder="Address" />
          <input type="text" placeholder="Mobile Number" />
          <input type="email" placeholder="Email" />
          <button className="btn-primary">Continue to payment</button>
        </Box>
      )}
    </ColumnsWrapper>
  );
}

export default page;
