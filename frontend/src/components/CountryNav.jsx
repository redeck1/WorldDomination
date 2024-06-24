import React from "react";

const CountryNav = ({ country }) => {
  return (
    <nav className="navbar navbar-expand ">
      <div className="container-fluid">
        <h1 style={{ fontSize: 30 }} className="navbar-brand fw-bold text-uppercase">
          {country.name}
        </h1>
        <ul className="navbar-nav align-items-center">
          <li>
            <h6 className="fw-bold">
              Средний уровень <br /> жизни в стране
            </h6>
          </li>
          <li className="ms-3">
            <h6 className="fs-1">{country.mean}%</h6>
          </li>
          <li className="ms-5">
            <h6 className="fw-bold">
              Доступный <br /> бюджет
            </h6>
          </li>
          <li className="ms-3 ">
            <h6 className="fs-1 d-flex justify-content-end" style={{ width: 70 + "px" }}>
              {country.balance}
            </h6>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CountryNav;
