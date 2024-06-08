import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="footer-container">
      <div className="footer-contents">

        <div className="footer-contacts col">
          <h4>THÔNG TIN LIÊN HỆ</h4>
          <ul>
            <li><span>Địa chỉ: 06 Nguyễn Khắc Viện, tòa nhà Capital Tower, Quận 7, HCM</span></li>
            <li><span>Hotline: 090 677 1111</span></li>
            <li><span>Email: nguyenle889tkhi@gmail.com</span></li>
          </ul>
          <div className="footer-socials">
            <Link to={"https://youtube.com"} className="socials-link"><FaYoutube size={16}/></Link>
            <Link to={"https://facebook.com"} className="socials-link"><FaFacebookF size={16}/></Link>
            <Link to={"https://instagram.com"} className="socials-link"><FaInstagram size={16}/></Link>
            <Link to={"https://linkedIn.com"} className="socials-link"><FaLinkedinIn size={16}/></Link>
            <Link to={"https://twitter.com"} className="socials-link"><FaTwitter size={16}/></Link>
            </div>
        </div>

        <div className="footer-checkpoints col">
          <h4>DỊCH VỤ UY TÍN</h4>
          <ul>
            <li><span>Chúng tôi mang đến gói vay uy tín nhất cập nhật về đầy đủ DỊCH VỤ VAY TIỀN ONLINE</span></li>
            <li><span>Tổng hợp những sản phẩm đa dạng Vay Tín Chấp & Vay Thế Chấp - HOT nhất hiện nay</span></li>
            <li><span>Chuyên tư vấn tài chính với thủ tục đơn giản, vay tiền nhanh - TẤT CẢ ĐỀU VAY ĐƯỢC</span></li>
            <li><span>Xây dựng các dịch vụ cho vay tiền dựa vào sự Trung Thật, Minh Bạch, Bảo Mật, UY TÍN</span></li>
          </ul>
        </div>

        <div className="register-form col"></div>

      </div>
      <div className="footer-copyrights"><span>&copy; 2024 All Rights Reserved</span></div>
    </div>
  )
};

export default Footer;
