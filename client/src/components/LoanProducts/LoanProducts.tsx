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

const cardContent = [
  {
    title: "CÔNG TY SẢN XUẤT ĐA TẦNG",
    description: "Doanh nghiệp cần cấp vốn kinh doanh. Vay tín chấp và thế chấp lãi suất ưu đãi",
    thumbnail: product1,
  },
  {
    title: "KINH DOANH MÔ HÌNH LỚN NHỎ",
    description: "Hỗ trợ nâng cấp vốn cho các tiểu thương. Bổ sung đáp ứng phát triển hoạt động",
    thumbnail: product2,
  },
  {
    title: "NHÂN VIÊN CÔNG TY ĐA NGÀNH",
    description: "Được hưởng lương ngân hàng, tiền mặt. Nhiều chương trình hỗ trợ lãi suất ưu đãi",
    thumbnail: product3,
  },
  {
    title: "DOANH NGHIỆP PHÁT TRIỂN LỚN",
    description: "Tài trợ cấp vốn đầu tư các dự án lớn, nhỏ. Luôn cập nhật gói vay trung và ngắn hạn",
    thumbnail: product4,
  },
  {
    title: "VÀ ĐỐI TƯỢNG KHÁC CẦN VAY",
    description: "Đang cần nguồn vốn đầu tư khởi nghiệp. Nhiều cách vay lựa chọn và tham khảo..",
    thumbnail: product5,
  },
  {
    title: "CÔNG TÁC CƠ QUAN NHÀ NƯỚC",
    description: "Nhiều gói vay cán bộ, chức trách cấp cao. Có rất nhiều chính sách ưu đãi dành riêng",
    thumbnail: product6,
  },
];

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
  return (
    <div className="loanProducts-container">
      <Reveal width="100%">
        <div className="loanProducts-header">
          <h3>Sản phẩm dịch vụ vay</h3>
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
