import React from "react";
import { useSelector } from "react-redux";

const SancForm = () => {
  const countries = useSelector((state) => state.countries);
  return (
    <>
      {countries.map((country) => (
        <div className="form-check" key={country.name}>
          <input type="checkbox" className="form-check-input" id={country.name}></input>
          <label htmlFor={country.name}>{country.name}</label>
        </div>
      ))}
    </>
  );
};

export default SancForm;
