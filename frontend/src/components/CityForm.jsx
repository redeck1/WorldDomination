import React from "react";

const CityForm = (props) => {
  return (
    <form className="px-3">
      <div className="mb-2 form-check">
        <input type="checkbox" className="form-check-input" id={`${props.id}0`}></input>
        <label className="form-check-label text-center" htmlFor={`${props.id}0`}>
          Развить город <br /> <span className="opacity-50">(150$)</span>
        </label>
      </div>
      <div className="mb-2 form-check">
        <input type="checkbox" className="form-check-input" id={`${props.id}1`}></input>
        <label className="form-check-label text-center" htmlFor={`${props.id}1`}>
          Построить щит <br /> <span className="opacity-50">(300$)</span>
        </label>
      </div>
    </form>
  );
};

export default CityForm;
