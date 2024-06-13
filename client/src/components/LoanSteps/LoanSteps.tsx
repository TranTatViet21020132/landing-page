import React from "react";
import "./LoanSteps.css";
import { Reveal } from "../Animation/Reveal";
import { Slide } from "../Animation/Slide";
import { useTranslation } from "react-i18next";

const LoanSteps = () => {
  const [translate] = useTranslation();

  const loanSteps = [
    {
      id: "01",
      header: translate("loanSteps.step1.header"),
      content: translate("loanSteps.step1.content"),
    },
    {
      id: "02",
      header: translate("loanSteps.step2.header"),
      content: translate("loanSteps.step2.content"),
    },
    {
      id: "03",
      header: translate("loanSteps.step3.header"),
      content: translate("loanSteps.step3.content"),
    },
    {
      id: "04",
      header: translate("loanSteps.step4.header"),
      content: translate("loanSteps.step4.content"),
    },
  ];

  return (
    <div className="loanSteps-container">
      <Reveal width="100%">
        <div className="loanSteps-title">
          <h3>{translate("loanSteps.header")}</h3>
          <h4>{translate("loanSteps.subHeader")}</h4>
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
