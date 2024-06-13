import React from "react";
import './Footer.css';
import { Link } from "react-router-dom";
import { FaYoutube, FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Footer: React.FC = () => {
  const [translate] = useTranslation();
  
  return (
    <div className="footer-container">
      <div className="footer-contents">

        <div className="footer-contacts col">
          <h4>{translate("footer.col1.header")}</h4>
          <ul>
            <li><span>{translate("footer.col1.content1")}</span></li>
            <li><span>{translate("footer.col1.content2")}</span></li>
            <li><span>{translate("footer.col1.content3")}</span></li>
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
          <h4>{translate("footer.col2.header")}</h4>
          <ul>
            <li><span>{translate("footer.col2.content1")}</span></li>
            <li><span>{translate("footer.col2.content2")}</span></li>
            <li><span>{translate("footer.col2.content3")}</span></li>
            <li><span>{translate("footer.col2.content4")}</span></li>
          </ul>
        </div>

        <div className="register-form col"></div>

      </div>
      <div className="footer-copyrights"><span>&copy; 2024 All Rights Reserved</span></div>
    </div>
  )
};

export default Footer;
