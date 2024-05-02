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
  @media screen and (max-width: 900px) {
    grid-template-columns: 1fr;
  }
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

function Page() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    usePageContext();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post(`/api/cart`, { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    }
  }, [cartProducts]);

  useEffect(() => {
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  });

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

  const goToPayment = async (e) => {
    e.preventDefault();
    const response = await axios.post("/api/checkout", {
      name,
      cartProducts,
      email,
      mobileNumber,
      landmark,
      streetAddress,
    });

    if (response.data) {
      window.location = response.data;
    }
  };

  if (isSuccess) {
    return (
      <>
        <ColumnsWrapper>
          <Box>
            <h1>Order Confirmed! Thank You!</h1>
            <p>We will send a confirmation email when your order is ready</p>
          </Box>
        </ColumnsWrapper>
      </>
    );
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
                      $
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
              <td>${total}</td>
            </tr>
          </tbody>
        </Table>
      </Box>
      {!!cartProducts.length && (
        <Box>
          <h2>Order Information</h2>
          <form onSubmit={goToPayment}>
            <Input
              onChange={(e) => setName(e.target.value)}
              value={name}
              name="name"
              type="text"
              placeholder="Name"
            />
            <Input
              onChange={(e) => setStreetAddress(e.target.value)}
              value={streetAddress}
              name="streetAddress"
              type="text"
              placeholder="Street Address"
            />
            <Input
              onChange={(e) => setLandmark(e.target.value)}
              value={landmark}
              name="landmark"
              type="text"
              placeholder="Landmark"
            />
            <Input
              onChange={(e) => setMobileNumber(e.target.value)}
              value={mobileNumber}
              name="mobileNumber"
              type="text"
              placeholder="Mobile Number"
            />
            <Input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              type="email"
              placeholder="Email"
            />
            <button type="submit" className="btn-primary">
              Continue to payment
            </button>
          </form>
        </Box>
      )}
    </ColumnsWrapper>
  );
}

function usePageContext() {
  const contextValue = useContext(CartContext);
  return contextValue;
}

export default Page;
