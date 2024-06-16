import React from "react";
import './LandingPage.css'
import Thumbnail from "../../components/Thumbnail/Thumbnail";
import AdvantageCards from "../../components/AdvantageCards/AdvantageCards";
import LoanReasons from "../../components/LoanReasons/LoanReasons";
import LoanProducts from "../../components/LoanProducts/LoanProducts";
import LoanProcedures from "../../components/LoanProcedures/LoanProcedures";
import LoanSteps from "../../components/LoanSteps/LoanSteps";
import Progress from "../../components/Animation/Progress/Progress";
import LoanDetails from "../../components/LoanDetails/LoanDetails";

function LandingPage() {
  return (
    <div className="landing-page-container">
      <Thumbnail />
      <AdvantageCards />
      <LoanReasons />
      <LoanDetails />
      <LoanProducts />
      <LoanProcedures />
      <LoanSteps />
      <Progress />
    </div>

  );
};

export default LandingPage;
