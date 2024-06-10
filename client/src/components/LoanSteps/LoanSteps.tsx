import React from "react";
import "./LoanSteps.css";
import { Reveal } from "../Animation/Reveal";
import { Slide } from "../Animation/Slide";

const loanSteps = [
  {
    id: "01",
    header: "LIÊN HỆ TƯ VẤN",
    content: "Đăng Ký Online hoặc Alo Trực Tiếp",
  },
  {
    id: "02",
    header: "CHUẨN BỊ HỒ SƠ",
    content: "Chuyên Viên Sẽ Hướng Dẫn Cụ Thể",
  },
  {
    id: "03",
    header: "NHẬN XÉT DUYỆT",
    content: "Kết Quả Nhanh Sau Khi Nộp Hồ Sơ",
  },
  {
    id: "04",
    header: "KÝ HỢP ĐỒNG VAY",
    content: "Nhận Trực Tiếp hoặc Chuyển Khoản",
  },
];

const LoanSteps = () => {
  return (
    <div className="loanSteps-container">
      <Reveal width="100%">
        <div className="loanSteps-title">
          <h3>4 BƯỚC ĐƠN GIẢN VAY</h3>
          <h4>QUY TRÌNH ĐƠN GIẢN - THỦ TỤC NHANH GỌN</h4>
        </div>
      </Reveal>
      <Slide width="100%" hiddenX={1000} duration={1} delay={0.25}>
        <ul className="loanSteps-content">
          {loanSteps.map((item, index) => {
            return (
              <li className="single-step" tabIndex={index} key={index}>
                <div className="single-step-counter">
                  <span>{item.id}</span>
                </div>
                <div className="single-step-content">
                  <h4>{item.header}</h4>
                  <span>{item.content}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </Slide>
    </div>
  );
};

export default LoanSteps;
