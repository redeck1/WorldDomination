import React from "react";

const CountryNav = () => {
  return (
    <nav className="navbar navbar-expand ">
      <div className="container-fluid">
        <h6 className="navbar-brand fw-bold">РОССИЯ</h6>
        <ul className="navbar-nav align-items-center">
          <li>
            <h6 className="fw-bold">
              Средний уровень <br /> жизни в стране
            </h6>
          </li>
          <li className="ms-3">
            <h6 className="fs-1">58%</h6>
          </li>
          <li className="ms-5">
            <h6 className="fw-bold">
              Доступный <br /> бюджет
            </h6>
          </li>
          <li className="ms-3 ">
            <h6 className="fs-1 d-flex justify-content-end" style={{ width: 70 + "px" }}>
              100
            </h6>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default CountryNav;
