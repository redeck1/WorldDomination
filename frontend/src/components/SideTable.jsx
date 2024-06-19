import React from "react";

const SideTable = ({ country, cities }) => {
  return (
    <div className="d-flex justify-content-between px-3">
      {cities.map((city) => (
        <div key={country.name + "-" + city.name}>
          <h6 className="text-center fw-bold">{city.name}</h6>
          <p style={{ fontSize: 14 }} className="mb-1">
            Ур. жизни {city.liveLVL}%
          </p>
          <div className="form-check" key={country.name}>
            <input
              type="checkbox"
              className="form-check-input"
              id={country.name + "-" + city.name}
            ></input>
            <label htmlFor={country.name + "-" + city.name}>Бомбить</label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideTable;
