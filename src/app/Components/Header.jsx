"use client";
import { styled } from "styled-components";
import Hero from "./Hero";

const StyledHeader = styled.header`
  background-color: #003049;
`;

export default function Header() {
  return (
    <StyledHeader>
      <Hero />
    </StyledHeader>
  );
}
