import React from "react";
import EcologyGraph from "../components/EcologyGraph";
import CoutryGraph from "../components/CoutryGraph";
import { useSelector } from "react-redux";

const colors = [
  "#59D5E0",
  "#F5DD61",
  "#FAA300",
  "#BE95C4",
  "#F4538A",
  "#C80036",
  // "#1D24CA",
  "#0C1844",
];

const Statistics = () => {
  const countries = useSelector((state) => state.countries);

  return (
    <>
      <div class="row row-cols-4">
        {countries.map((country, index) => (
          <div className="col">
            <h3 className="ps-5">
              {country.name} <span className="opacity-50">({country.mean}%)</span>
            </h3>
            <CoutryGraph country={country} color={colors[index]} />
          </div>
        ))}
      </div>

      <EcologyGraph />
    </>
  );
};

export default Statistics;
