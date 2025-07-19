import React, { useEffect, useState } from "react";
import SideMenu from "../component/SideMenu/SideMenu";
import MainMenu from "../component/MainMenu";
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "../features/countriesSlice";
import { setOwnCountry } from "../features/ownCountrySlice";
import axios from "axios";
import withLoader from "../extra/ButtonWithLoading";

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
  const isComplete = useSelector((state) => state.ownCountry.isComplete);
  const countryName = useSelector((state) => state.ownCountry.name);
  const round = useSelector((state) => state.ownCountry.round);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const updateData = async () => {
    setLoading(true);
    const { data } = await axios.get(
      `${apiUrl}/update_info?country_name=${countryName}`
    );
    setLoading(false);
    const ownCountry = data.ownCountry;
    const countries = data.countries;
    if (round !== ownCountry.round) {
      dispatch(setCountries(countries));
      dispatch(setOwnCountry(ownCountry));
    }
  };

  const ButtonWithLoader = withLoader((props) => {
    return <button {...props}>Обновить</button>;
  });

  return (
    <div className="container" style={{ maxWidth: 1480 + "px" }}>
      <div className="row">
        <div className="col-8">
          {isComplete ? (
            <ButtonWithLoader
              type="button"
              className="btn btn-primary btn-lg fw-bold mt-4"
              onClick={updateData}
              loading={loading}
            />
          ) : (
            <MainMenu />
          )}
        </div>
        <div className="col-4">{isComplete ? null : <SideMenu />}</div>
      </div>
    </div>
  );
};

export default Home;
