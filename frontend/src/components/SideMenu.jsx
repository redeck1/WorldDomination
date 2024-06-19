import React from "react";
import { countries } from "../Data";
const cities = [
  { name: "First", liveLVL: 57 },
  { name: "Second", liveLVL: 57 },
  { name: "Third", liveLVL: 57 },
  { name: "Fourth", liveLVL: 57 },
];

const SideMenu = () => {
  return (
    <div className="mt-4">
      {countries.map((country) => (
        <div className="bg-body-secondary rounded-3 overflow-hidden mt-2 pb-2" key={country.name}>
          <nav className="navbar navbar-dark pt-0">
            <div className="container-fluid" style={{ backgroundColor: "#be95c4" }}>
              <span href="#" className="navbar-brand fw-bold">
                {country.name}
              </span>
              <span href="#" className="navbar-brand me-0">
                {country.mean}%
              </span>
            </div>
          </nav>
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
        </div>
      ))}
    </div>
  );
};

export default SideMenu;
