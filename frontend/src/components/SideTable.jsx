import React from "react";

const SideTable = ({ country }) => {
  const renderCity = (city) => {
    if (city.isAlive) {
      return (
        <div className="form-check" key={country.name}>
          <input
            type="checkbox"
            className="form-check-input"
            id={country.name + "-" + city.name}
          ></input>
          <label htmlFor={country.name + "-" + city.name}>Бомбить</label>
        </div>
      );
    }
    return <div className="text-center text-danger">Уничтожен</div>;
  };

  return (
    <div className="d-flex justify-content-between px-3">
      {country.cities.map((city) => (
        <div key={country.name + "-" + city.name}>
          <h6 className="text-center fw-bold">{city.name}</h6>
          <p style={{ fontSize: 14 }} className="mb-1">
            Ур. жизни {city.liveLvl}%
          </p>
          {renderCity(city)}
        </div>
      ))}
    </div>
  );
};

export default SideTable;
