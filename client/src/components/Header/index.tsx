import React from "react";
import { GrLanguage } from "react-icons/gr";
import { MdOutlineDarkMode } from "react-icons/md";
import "./Header.css"
import logo from '../../assets/images/LogoViettelchuẩn-02.jpg'

const Header: React.FC = () => {
  return (
    <nav className="header-container">
      <div className="logo-containter">
        <img src={logo} alt="" />
      </div>
      <div className="header-contents">
        <div className="utilities-container">

          <div className="header-icon-container">
            <MdOutlineDarkMode
            className={`icon`}
            size={26}
            />
          </div>
          
          <div className="header-icon-container">
            <GrLanguage
            className={`icon`}
            size={22}
            />
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Header;
