import React from "react";
import "react-multi-carousel/lib/styles.css";
import "./LoanProducts.css";
import Carousel from "react-multi-carousel";
import product1 from "../../assets/images/product1.jpg";
import product2 from "../../assets/images/product2.jpg";
import product3 from "../../assets/images/product3.jpg";
import product4 from "../../assets/images/product4.jpg";
import product5 from "../../assets/images/product5.jpg";
import product6 from "../../assets/images/product6.jpg";
import { Reveal } from "../Animation/Reveal";
import { useTranslation } from "react-i18next";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const LoanProducts = () => {
  const [translate] = useTranslation();

  const cardContent = [
    {
      title: translate("loanProducts.title1"),
      description: translate("loanProducts.description1"),
      thumbnail: product4,
    },
    {
      title: translate("loanProducts.title2"),
      description: translate("loanProducts.description2"),
      thumbnail: product2,
    },
    {
      title: translate("loanProducts.title3"),
      description: translate("loanProducts.description3"),
      thumbnail: product6,
    },
    {
      title: translate("loanProducts.title4"),
      description: translate("loanProducts.description4"),
      thumbnail: product3,
    },
    {
      title: translate("loanProducts.title5"),
      description: translate("loanProducts.description5"),
      thumbnail: product1,
    },
    {
      title: translate("loanProducts.title6"),
      description: translate("loanProducts.description6"),
      thumbnail: product5,
    },
  ];
  
  return (
    <div className="loanProducts-container">
      <Reveal width="100%">
        <div className="loanProducts-header">
          <h3>{translate("loanProducts.header")}</h3>
        </div>
      </Reveal>
      <>
        <Carousel
          responsive={responsive}
          autoPlay={true}
          autoPlaySpeed={3000}
          transitionDuration={1000}
          swipeable={true}
          showDots={true}
          infinite={true}
          partialVisible={false}
          customTransition={"transform 600ms ease-in-out"}
          dotListClass="custom-dot-list-style"
          sliderClass="custom-slider-style"
        >
          {cardContent.map((item, index) => (
            <div className="product-card" tabIndex={index} key={index}>
              <div className="product-image-container">
                <img src={item.thumbnail} alt="" />
              </div>
              <div className="product-label-container">
                <h4>{item.title}</h4>
                <span>{item.description}</span>
              </div>
            </div>
          ))}
        </Carousel>
      </>
    </div>
  );
};

export default LoanProducts;
