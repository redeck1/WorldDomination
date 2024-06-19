import React from "react";
import CountryNav from "../components/CountryNav";
import NuclerTech from "../components/NuclerTech";
import Ecology from "../components/Ecology";
import Sanc from "../components/Sanc";
import Transfer from "../components/Transfer";
import Decrees from "../components/Decrees";
import CityGroup from "../components/CityGroup";

const MainMenu = () => {
  return (
    <div className="container py-2 mt-4 bg-body-secondary rounded-3 ">
      <CountryNav />
      <CityGroup />

      <div className="container">
        <div className="row">
          <div className="col-7 ps-0">
            <NuclerTech />
          </div>
          <div className="col-5 pe-0">
            <Ecology />
          </div>
        </div>
        <div className="row">
          <div className="col-6 ps-0">
            <Sanc />
          </div>
          <div className="col-6 pe-0">
            <Transfer />
            <Decrees />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
