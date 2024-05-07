"use client";
import { styled } from "styled-components";
import Hero from "./Hero";

const StyledHeader = styled.header`
  background-color: #003049;
  @media screen and (max-width: 900px) {
  }
`;

export default function Header() {
  return (
    <StyledHeader>
      <Hero />
    </StyledHeader>
  );
}
