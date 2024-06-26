import React from "react";
import { useSelector } from "react-redux";

const CountryNav = () => {
  const country = useSelector((state) => state.ownCountry);

  return (
    <nav className="navbar navbar-expand ">
      <div className="container-fluid">
        <h1 style={{ fontSize: 30 }} className="navbar-brand fw-bold text-uppercase">
          {country.name}
        </h1>
        <ul className="navbar-nav align-items-center">
          <li>
            <h6 className="fw-bold text-primary">
              Средний уровень <br /> жизни в стране
            </h6>
          </li>
          <li className="ms-3 text-primary">
            <h6 className="fs-1">{country.mean}%</h6>
          </li>
          <li className="ms-5">
            <h6 className="fw-bold text-primary">
              Доступный <br /> бюджет
            </h6>
          </li>
          <li className="ms-3">
            <h6
              className="fs-1 d-flex justify-content-end text-primary"
              style={{ width: 70 + "px" }}
            >
              {country.balance}
            </h6>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CountryNav;
