import React from "react";
import CityTable from "./CityTable";
import CityForm from "./CityForm";

let CityCard = (city) => {
  return (
    <div className="bg-body-tertiary rounded-4 overflow-hidden pb-2" style={{ width: 224 + "px" }}>
      {/* {city?.image && (
        <img
          src={require(`../imgs/${city.image}.png`)}
          style={{ width: 224 + "px", height: 224 + "px" }}
          alt="img"
        />
      )} */}

      <h6 className="fw-bold d-flex justify-content-center"> {city.name} </h6>
      <CityTable {...city} />
      <CityForm name={city.name} />
    </div>
  );
};

CityCard = React.memo(CityCard);

export default CityCard;
