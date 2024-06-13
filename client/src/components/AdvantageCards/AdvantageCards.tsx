import React from "react";
import "./AdvantageCards.css";
import Card from "./Card/Card";
import advan1 from "../../assets/images/advan1.png";
import advan2 from "../../assets/images/advan2.png";
import advan3 from "../../assets/images/advan3.png";
import advan4 from "../../assets/images/advan4.png";
import { useTranslation } from "react-i18next";

const AdvantageCards = () => {
  const [translate] = useTranslation();

  const cardContent = [
    {
      title: translate("advanCards.title1"),
      description: translate("advanCards.description1"),
      imageUrl: advan1,
      hiddenY: 25,
    },
    {
      title: translate("advanCards.title2"),
      description: translate("advanCards.description2"),
      imageUrl: advan2,
      hiddenY: -25,
    },
    {
      title: translate("advanCards.title3"),
      description: translate("advanCards.description3"),
      imageUrl: advan3,
      hiddenY: 25,
    },
    {
      title: translate("advanCards.title4"),
      description: translate("advanCards.description4"),
      imageUrl: advan4,
      hiddenY: -25,
    },
  ];

  return (
    <div className="advantageCards-container">
      {cardContent.map((item, index) => (
        <Card
          key={index}
          title={item.title}
          description={item.description}
          imageUrl={item.imageUrl}
          hiddenY={item.hiddenY}
        />
      ))}
    </div>
  );
};

export default AdvantageCards;
