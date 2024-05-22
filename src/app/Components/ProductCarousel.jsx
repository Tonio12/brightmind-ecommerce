import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pepsi from "../../../public/HeroPepsi.jpg";
import guinness from "../../../public/HeroGuinness.jpg";
import coke from "../../../public/HeroCocaCola.jpg";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { Button } from "@/components/ui/button";

const ProductCarousel = ({ products }) => {
  const { addProduct } = useContext(CartContext);

  return (
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      {products.map((product, index) => (
        <div key={product._id} className="h-[70vh] relative">
          {product.title === "Pepsi" ? (
            <Image src={pepsi} alt={product.name} fill />
          ) : product.title === "Guinness" ? (
            <Image src={guinness} alt={product.name} fill />
          ) : (
            <Image src={coke} alt={product.name} fill />
          )}

          <div className="legend">
            <h2 style={{ fontSize: "24px" }}>{product.title}</h2>
            <p>{product.description}</p>
            <Button
              onClick={() => {
                addProduct(product._id);
              }}
              className="btn-secondary"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
