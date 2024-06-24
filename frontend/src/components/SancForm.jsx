import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSanction } from "../features/ownCountry/ownCountrySlice";

const SancForm = () => {
  const dispatch = useDispatch();

  const countries = useSelector((state) => state.countries);
  return (
    <>
      {countries.map((country) => (
        <div className="form-check" key={country.name}>
          <input
            type="checkbox"
            className="form-check-input"
            id={country.name}
            onChange={(e) => dispatch(changeSanction({ to: country.name, send: e.target.checked }))}
          ></input>
          <label htmlFor={country.name}>{country.name}</label>
        </div>
      ))}
    </>
  );
};

export default SancForm;
