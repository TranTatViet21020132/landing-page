import { useTranslation } from "react-i18next";
import { supportedLngs } from "../../configs/i18n";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import vnFlag from '../../assets/images/vi-flag-32.png';
import enFlag from '../../assets/images/en-flag-32.png';
import { useState } from "react";
import './LocaleSwitcher.css';

export default function LocaleSwitcher() {
  const { i18n } = useTranslation();

  const [modeMenuState, setModeMenuState] = useState(false);

  const handleMouseOver = () => {
    setModeMenuState(true);
  };

  const handleMouseOut = () => {
    setModeMenuState(false);
  };

  const handleLanguageChange = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.target as HTMLLIElement;
    i18n.changeLanguage(target.getAttribute('value') || 'vi');
  };

  return (
    <div
      className="language-toggle-container"
      onMouseOver={handleMouseOver} onMouseLeave={handleMouseOut}
    >
      <div className="language-toggle-header">
      {
        i18n.resolvedLanguage === "vi" ? 
        <img
          src={vnFlag}
          alt="Tiếng Việt"
        /> : 
        <img
          src={enFlag}
          alt="English"
        />
      }
      {modeMenuState === false ? <FaChevronDown className="icon"/> : <FaChevronUp className="icon"/>}
      </div>          
      <ul>
        {Object.entries(supportedLngs).map(([code, name]) => (
          <li value={code} key={code} onClick={handleLanguageChange}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  );
}