"use client";
import Link from "next/link";
import { styled } from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Logo = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 14px;
  font-weight: bold;
  @media screen and (max-width: 900px) {
    position: relative;
    z-index: 3;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 1rem 5rem;
  background: radial-gradient(circle, #87ceeb, #4682b4);
  @media screen and (max-width: 900px) {
    padding: 10px 20px;
  }
`;

const LinkDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  @media screen and (max-width: 900px) {
    display: ${(props) => (props.$mobileNavActive ? "flex" : "none")};
    flex-direction: column;
    z-index: 99;
    position: absolute;
    top: 0;
    right: 0;
    padding: 50px 50px;
    background-color: #003049;
    transition: all 0.3s ease-in-out;
    border-radius: 5px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 14px;
  &:hover {
    color: #0056b3;
  }
  @media screen and (max-width: 900px) {
    padding: 10px 0;
    color: white;
  }
`;

const NavButton = styled.button`
  background-color: transparent;
  border: 0;
  cursor: pointer;
  display: none;
  @media screen and (max-width: 900px) {
    display: inline-block;
    position: relative;
    z-index: 100;
  }
`;

function NavBar() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <Nav>
      <Logo href="/">Bright Mind</Logo>
      <LinkDiv $mobileNavActive={mobileNavActive}>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/products">All Products</NavLink>
        <NavLink href="/categories">Categories</NavLink>
        <NavLink href="/account">Account</NavLink>
        <NavLink href="/cart">Cart ({cartProducts.length})</NavLink>
      </LinkDiv>
      <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
        <Bars3Icon style={{ height: 30, width: 30, color: "white" }} />
      </NavButton>
    </Nav>
  );
}

export default NavBar;
