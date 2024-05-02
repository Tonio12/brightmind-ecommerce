"use client";
import Link from "next/link";
import { styled } from "styled-components";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { Bars3Icon } from "@heroicons/react/24/solid";

const Logo = styled(Link)`
  text-decoration: none;
  color: #fff;
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
  background-color: #003049;
`;

const LinkDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  transition: all 0.3s ease-in-out;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    position: fixed;
    top: 0px;
    buttom: 0;
    left: 0rem;
    right: 0;
    padding: 50px 5rem;
    background-color: #003049;
    transition: all 0.3s ease-in-out;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  @media screen and (max-width: 900px) {
    padding: 10px 0;
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
    z-index: 3;
  }
`;

function NavBar() {
  const { cartProducts } = useContext(CartContext);
  const [mobileNavActive, setMobileNavActive] = useState(false);
  return (
    <Nav>
      <Logo href="/">Bright Mind</Logo>
      <LinkDiv mobileNavActive={mobileNavActive}>
        {mobileNavActive && (
          <>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/products">All Products</NavLink>
            <NavLink href="/categories">Categories</NavLink>
            <NavLink href="/account">Account</NavLink>
            <NavLink href="/cart">Cart ({cartProducts.length})</NavLink>
          </>
        )}
      </LinkDiv>
      <NavButton onClick={() => setMobileNavActive((prev) => !prev)}>
        <Bars3Icon style={{ height: 30, width: 30, color: "white" }} />
      </NavButton>
    </Nav>
  );
}

export default NavBar;
