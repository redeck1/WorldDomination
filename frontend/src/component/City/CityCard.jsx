import React from "react";
import CityTable from "./CityTable";
import CityForm from "./CityForm";

let CityCard = (city) => {
  let img = undefined;
  try {
    img = require(`../../imgs/${city.name}.png`);
  } catch {}

  return (
    <div className="bg-body-tertiary rounded-4 overflow-hidden pb-2" style={{ width: 224 + "px" }}>
      <img
        src={img ? img : require("../../imgs/NotFound.png")}
        style={{ width: 224 + "px", height: 224 + "px" }}
        alt={`${city.name}`}
      />

      <h6 className="fw-bold d-flex justify-content-center"> {city.name} </h6>
      <CityTable {...city} />
      <CityForm name={city.name} />
    </div>
  );
};

CityCard = React.memo(CityCard);

export default CityCard;
