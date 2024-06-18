import React from "react";
import logo from '../../assets/images/LogoViettelchuẩn-02-transparent.png';
import LocaleSwitcher from "../../components/LocaleSwitcher/LocaleSwitcher";
import "./Header.css"
import DarkMode from "../../components/Animation/DarkMode/DarkMode";

const Header: React.FC = () => {
  return (
    <nav className="header-container">
      <div className="logo-containter">
        <img src={logo} alt="" />
      </div>
      <div className="header-contents">
        <div className="utilities-container">

          <div className="header-icon-container">
            <LocaleSwitcher />
          </div>

          <div className="header-icon-container">
            <DarkMode />
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
