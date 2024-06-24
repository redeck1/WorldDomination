import React from "react";

const CityForm = ({ id }) => {
  return (
    <form className="px-3">
      <div className="mb-2 form-check">
        <input type="checkbox" className="form-check-input" id={`${id}0`}></input>
        <label className="form-check-label text-center" htmlFor={`${id}0`}>
          Развить город <span className="opacity-50">(150$)</span>
        </label>
      </div>
      <div className="mb-2 form-check">
        <input type="checkbox" className="form-check-input" id={`${id}1`}></input>
        <label className="form-check-label text-center" htmlFor={`${id}1`}>
          Построить щит <span className="opacity-50">(300$)</span>
        </label>
      </div>
    </form>
  );
};

export default CityForm;
