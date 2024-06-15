import React from "react";
import CityCard from "../components/CityCard";
import CountryNav from "../components/CountryNav";
import NuclerTech from "../components/NuclerTech";
import Ecology from "../components/Ecology";
import Sanctions from "../components/Sanctions";
import Transfer from "../components/Transfer";
import Decrees from "../components/Decrees";

const data = [
  { name: "Москва", image: "00", growth: 70, liveLVL: 65, profit: 200 },
  { name: "Санкт-Петербург", image: "01", growth: 70, liveLVL: 65, profit: 2 },
  { name: "Новосибирск", image: "02", growth: 100, liveLVL: 99, profit: 150 },
  { name: "Владивосток", image: "03", growth: 80, liveLVL: 77, profit: 200 },
];

const Home = () => {
  return (
    <div className="container py-3 mt-4 bg-body-secondary rounded-3 ">
      <CountryNav />
      <div className="d-flex w-100 justify-content-between">
        {data.map((city) => (
          <CityCard {...city} key={city.name} />
        ))}
      </div>

      <div className="container">
        <div className="row">
          <div className="col-7 ps-0">
            <NuclerTech />
          </div>
          <div className="col-5 pe-0">
            <Ecology />
          </div>
        </div>
      </div>
      <Sanctions />
      <Transfer />
      <Decrees />
    </div>
  );
};

export default Home;
