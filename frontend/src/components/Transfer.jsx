import React from "react";
import { countries } from "../Data";
import PanelHeader from "./PanelHeader";

const Transfer = () => {
  return (
    <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
      <PanelHeader>перевести деньги</PanelHeader>
      <div className="container">
        {countries.map((country) => (
          <div className="row mb-2" key={country.name}>
            <div className="col-4">{country.name}</div>
            <div className="col-3">
              <input className="form-control py-0" type="number" id={"to" + country.name} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transfer;
