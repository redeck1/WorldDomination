import React from "react";
import CountryNav from "../components/CountryNav";
import NuclerTech from "../components/NuclerTech";
import Ecology from "../components/Ecology";
import Sanc from "../components/Sanc";
import Transfer from "../components/Transfer";
import Decrees from "../components/Decrees";
import CityGroup from "../components/CityGroup";
import { useDispatch, useSelector } from "react-redux";
import { nextMove, updateInfo } from "../features/ownCountrySlice";

const MainMenu = () => {
  const countryName = useSelector((state) => state.ownCountry.name);
  const changes = useSelector((state) => state.ownCountry.changes);
  const dispatch = useDispatch();

  return (
    <div className="container py-2 mt-4 bg-body-secondary rounded-3">
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
      <div className="justify-content-center d-flex mt-3">
        <button
          type="button"
          className="btn btn-outline-primary btn-lg fw-bold"
          onClick={() => dispatch(nextMove({ name: countryName, changes: changes }))}
        >
          Закончить ход
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
