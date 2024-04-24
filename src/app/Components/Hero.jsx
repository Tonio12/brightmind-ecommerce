"use client";
import { styled } from "styled-components";
import Image from "next/image";
import HeroImg from "../../../public/Hero2.png";
import Link from "next/link";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  justify-items: center;
  align-items: center;
  padding: 1rem 5rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 3rem;
  color: #fff;
`;

const Desc = styled.p`
  color: #fff;
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

function Hero() {
  return (
    <Container>
      <div>
        <Title>Bright Star</Title>
        <Desc>
          Welcome to Bright Mind, your one-stop online shop for premium
          beverages! Explore our curated selection of alcoholic and
          non-alcoholic drinks, perfect for any occasion. From fine wines and
          craft beers to refreshing juices and gourmet sodas, we have something
          for everyone. Shop now and elevate your beverage experience with
          Bright Mind. Cheers!
        </Desc>
        <HeroButtons>
          <Link href="/products" className="btn-primary">
            Products
          </Link>
        </HeroButtons>
      </div>
      <div>
        <Image src={HeroImg} alt="Hero Image" height={400} />
      </div>
    </Container>
  );
}

export default Hero;
