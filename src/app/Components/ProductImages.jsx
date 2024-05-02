"use client";

import { useState } from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px 10px;
`;
const MainImage = styled.img`
  max-heigth: 200px;
  max-width: 100%;
`;

const Image = styled.img`
  height: 50px;
  cursor: pointer;
  @media screen and (max-width: 900px) {
    height: 35px;
  }
`;

const ImageButtons = styled.div`
  display: flex;
  gap: 20px;
  flex-grow: 0;
`;

const ImgButton = styled.div``;

function ProductImages({ images }) {
  const [activeImage, setActiveImage] = useState(images?.[0]);

  return (
    <Wrapper>
      <MainImage src={activeImage} alt="Image" />
      <ImageButtons>
        {images.map((img) => (
          <ImgButton key={img}>
            <Image src={img} alt="" onClick={() => setActiveImage(img)} />
          </ImgButton>
        ))}
      </ImageButtons>
    </Wrapper>
  );
}

export default ProductImages;
