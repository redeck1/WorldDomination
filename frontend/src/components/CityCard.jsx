import React from "react";
import CityTable from "./CityTable";
import CityForm from "./CityForm";

const CityCard = (props) => {
  return (
    <div className="bg-body-tertiary rounded-4 overflow-hidden" style={{ width: 200 + "px" }}>
      <img
        src={require(`../imgs/${props.image}.png`)}
        style={{ width: 200 + "px", height: 200 + "px" }}
        alt="img"
      />
      <h6 className="fw-bold d-flex justify-content-center"> {props.name} </h6>
      <CityTable {...props} />
      <CityForm id={props.name} />
    </div>
  );
};

export default CityCard;
