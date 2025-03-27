import React from "react";
import CityCard from "./CityCard";
import { useSelector } from "react-redux";

export default function CityGroup() {
  const cities = useSelector((state) => state.ownCountry.cities);

  return (
    <div className="d-flex w-100 justify-content-between">
      {cities.map((city) => (
        <CityCard {...city} key={city.name} />
      ))}
    </div>
  );
}
