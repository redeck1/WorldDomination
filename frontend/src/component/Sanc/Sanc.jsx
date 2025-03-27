import React from "react";
import SancInfo from "./SancInfo";
import SancForm from "./SancForm";
import PanelHeader from "../PanelHeader";

const Sanc = () => {
  return (
    <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
      <div className="d-flex justify-content-center">
        <PanelHeader>санкции</PanelHeader>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-6">
            <SancInfo />
          </div>
          <div className="col-6 d-block">
            <h6>Наложить на:</h6>
            <SancForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sanc;
