import React from "react";
import "./LoanDetails.css";
import LoanDetailCard from "./LoanDetailCard/LoanDetailCard";
import { useTranslation } from "react-i18next";
import { Reveal } from "../Animation/Reveal";

const LoanDetails = () => {
  const [translate] = useTranslation();

  const loanDetailsContent = [
    {
      title: translate("loanDetail.title1"),
      description: {
        line1: translate("loanDetail.description1.line1"),
        line2: translate("loanDetail.description1.line2"),
        line3: translate("loanDetail.description1.line3"),
        line4: translate("loanDetail.description1.line4"),
      },
      hiddenY: -50,
      delay: 0.4,
    },
    {
      title: translate("loanDetail.title2"),
      description: {
        line1: translate("loanDetail.description2.line1"),
        line2: translate("loanDetail.description2.line2"),
        line3: translate("loanDetail.description2.line3"),
        line4: translate("loanDetail.description2.line4"),
      },
      hiddenY: -50,
      delay: 0.6,
    },
    {
      title: translate("loanDetail.title3"),
      description: {
        line1: translate("loanDetail.description3.line1"),
        line2: translate("loanDetail.description3.line2"),
        line3: translate("loanDetail.description3.line3"),
        line4: translate("loanDetail.description3.line4"),
      },
      hiddenY: -50,
      delay: 0.8,
    },
    {
      title: translate("loanDetail.title4"),
      description: translate("loanDetail.description4"),
      hiddenY: -50,
      delay: 1
    },
  ];

  return (
    <div className="loanDetails-container">
      <Reveal delay={0}>
        <div className="loanDetails-header">
          <h3>{translate("loanDetails.header")}</h3>
        </div>
      </Reveal>
      <div className="loanDetails-content">
        {loanDetailsContent.map((item, index) => (
          <LoanDetailCard
            key={index}
            title={item.title}
            description={item.description}
            hiddenY={item.hiddenY}
            delay={item.delay}
          />
        ))}
      </div>
    </div>
  );
};

export default LoanDetails;
