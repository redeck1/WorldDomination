import React from "react";
import PanelHeader from "../PanelHeader";
import { useSelector } from "react-redux";
import { useState } from "react";
import useExcludeSelect from "../../extra/useExcludeSelect";

const Transfer = () => {
  const thisName = useSelector((state) => state.ownCountry.name);
  const countries = useExcludeSelect(thisName);
  const [transfers, setTransfers] = useState(
    countries.reduce((obj, item) => ({ ...obj, [item.name]: "" }), {})
  );

  const transferSubmit = (event) => {
    event.preventDefault();
    console.log(transfers);
  };

  return (
    <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
      <PanelHeader>перевести деньги</PanelHeader>
      <form className="container" onSubmit={(e) => transferSubmit(e)}>
        {countries.map((country) => (
          <div className="row mb-2" key={country.name}>
            <div className="col-4">{country.name}</div>
            <div className="col-3">
              <input className="form-control py-0" type="number" id={"to" + country.name} />
            </div>
          </div>
        ))}
        <button className="btn btn-primary" type="submit">
          Перевести
        </button>
      </form>
    </div>
  );
};

export default Transfer;
