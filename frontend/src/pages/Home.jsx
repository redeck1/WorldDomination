import React from "react";
import CityCard from "../components/CityCard";

const data = [
  { name: "Москва", image: "00", growth: 70, liveLVL: 65, profit: 200 },
  {
    name: "Санкт-Петербург",
    image: "01",
    growth: 70,
    liveLVL: 65,
    profit: 2,
  },
  { name: "Новосибирск", image: "02", growth: 100, liveLVL: 99, profit: 150 },
  { name: "Владивосток", image: "03", growth: 80, liveLVL: 77, profit: 200 },
];

const Home = () => {
  return (
    <div className="container py-3 mt-4 bg-body-secondary rounded-3 ">
      <nav className="navbar navbar-expand ">
        <div className="container-fluid">
          <h4 className="navbar-brand fw-bold">РОССИЯ</h4>
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
              <h6
                className="fs-1 d-flex justify-content-end"
                style={{ width: 70 + "px" }}
              >
                100
              </h6>
            </li>
          </ul>
        </div>
      </nav>
      <div className="d-flex w-100 justify-content-between">
        {data.map((city) => (
          <CityCard {...city} key={city.name} />
        ))}
      </div>
    </div>
  );
};

export default Home;
