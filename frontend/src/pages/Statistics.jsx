import React from "react";
import EcologyGraph from "../component/Graphic/EcologyGraph";
import CountryGraph from "../component/Graphic/CountryGraph";
import { useSelector } from "react-redux";
import { Navigate  } from "react-router-dom";
import AllCountriesGraph from "../component/Graphic/AllCountriesGraph";

const colors = [
  "#59D5E0",
  "#F5DD61",
  "#FAA300",
  "#BE95C4",
  "#F4538A",
  "#C80036",
  "#1D24CA",
  "#0C1844",
];

const Statistics = () => {
  const countries = useSelector((state) => state.countries.items);
  const isAuth = useSelector((state) => state.ownCountry.password) !== null;

  if (!isAuth) {
        return <Navigate to="/" replace />; 
      }

  return (
    <>
      <div className="row row-cols-4 mt-4">
        {countries.map((country, index) => (
          <div className="col" key={country.name}>
            <h3 className="ps-5">
              {country.name} <span className="opacity-50">({country.meanLiveLvl}%)</span>
            </h3>
            <CountryGraph country={country} color={colors[index]} />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col">
          <h3 className="ps-5">Экология</h3>
          <EcologyGraph />
        </div>

        <div className="col">
          <h3 className="ps-5">Средний уровень развития стран</h3>
          <AllCountriesGraph data={countries} />
        </div>
      </div>
    </>
  );
};

export default Statistics;
