import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import logo from '../../assets/images/LogoViettelchuẩn-02-transparent.png';
import LocaleSwitcher from "../../components/LocaleSwitcher/LocaleSwitcher";
import "./Header.css"

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
            <MdOutlineDarkMode
            className={`icon`}
            size={26}
            />
          </div>
          
        </div>
      </div>
    </nav>
  );
};

export default Header;
