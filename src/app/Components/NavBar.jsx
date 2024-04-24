"use client";
import Link from "next/link";
import { styled } from "styled-components";
import { useContext } from "react";
import { CartContext } from "./CartContext";

const Logo = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 1rem 5rem;
  background-color: #003049;
`;

const LinkDiv = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
`;

function NavBar() {
  const { cartProducts } = useContext(CartContext);
  return (
    <Nav>
      <Logo href="/">Bright Mind</Logo>
      <LinkDiv>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">All Products</NavLink>
        <NavLink href="/categories">Categories</NavLink>
        <NavLink href="/account">Account</NavLink>
        <NavLink href="/cart">Cart ({cartProducts.length})</NavLink>
      </LinkDiv>
    </Nav>
  );
}

export default NavBar;
