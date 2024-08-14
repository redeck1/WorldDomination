import React from "react";
import SideMenu from "../components/SideMenu";
import MainMenu from "../components/MainMenu";
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "../features/countriesSlice";
import { setOwnCountry } from "../features/ownCountrySlice";
import axios from "axios";

const Home = () => {
  const isComplete = useSelector((state) => state.ownCountry.isComplete);
  const countryName = useSelector((state) => state.ownCountry.name);
  const round = useSelector((state) => state.ownCountry.round);
  const dispatch = useDispatch();

  const updateData = async () => {
    const { data } = await axios.get(
      `http://localhost:4444/update_info?country_name=${countryName}`
    );
    const ownCountry = data.ownCountry;
    const countries = data.countries;
    if (round !== ownCountry.round) {
      dispatch(setCountries(countries));
      dispatch(setOwnCountry(ownCountry));
    }
  };

  if (isComplete) {
    return (
      <button type="button" className="btn btn-primary btn-lg fw-bold" onClick={updateData}>
        Обновить
      </button>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 1480 + "px" }}>
      <div className="row">
        <div className="col-8">
          <MainMenu />
        </div>
        <div className="col-4">
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
