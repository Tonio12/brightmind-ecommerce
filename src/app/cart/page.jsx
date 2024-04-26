"use client";

import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { CartContext } from "../Components/CartContext";
import axios from "axios";
import Table from "../Components/Table";
import Input from "../Components/Input";

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
  padding: 10px 0;
`;

const ProductImageBox = styled.div`
  width: 100px;
  height: 100px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px #fdf0d5;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fdf0d5;
  img {
    width: 80px;
    height: 80px;
  }
`;

const QuantityLabel = styled.span`
  padding: 0 3px;
`;

function page() {
  const { cartProducts, addProduct, removeProduct } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post(`/api/cart`, { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  const addMore = (id) => {
    addProduct(id);
  };

  const reduceProductQuantity = (id) => {
    removeProduct(id);
  };

  let total = 0;

  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    total += price;
  }

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
                      <button
                        className="btn-secondary"
                        onClick={() => reduceProductQuantity(product._id)}
                      >
                        -
                      </button>
                      <QuantityLabel>
                        {cartProducts.filter((id) => id === product._id).length}
                      </QuantityLabel>
                      <button
                        className="btn-secondary"
                        onClick={() => addMore(product._id)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      GHS{" "}
                      {cartProducts.filter((id) => id === product._id).length *
                        product.price}
                    </td>
                  </tr>
                ))}
              </>
            )}
            <tr>
              <td></td>
              <td></td>
              <td>GHS {total}</td>
            </tr>
          </tbody>
        </Table>
      </Box>
      {!!cartProducts.length && (
        <Box>
          <h2>Order Information</h2>
          <Input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="Name"
          />
          <Input
            onChange={(e) => setStreetAddress(e.target.value)}
            value={streetAddress}
            type="text"
            placeholder="Street Address"
          />
          <Input
            onChange={(e) => setLandmark(e.target.value)}
            value={landmark}
            type="text"
            placeholder="Landmark"
          />
          <Input
            onChange={(e) => setMobileNumber(e.target.value)}
            value={mobileNumber}
            type="text"
            placeholder="Mobile Number"
          />
          <Input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email"
          />
          <button className="btn-primary">Continue to payment</button>
        </Box>
      )}
    </ColumnsWrapper>
  );
}

export default page;
