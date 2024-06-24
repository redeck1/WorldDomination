import React from "react";
import CityCard from "./CityCard";

export default function CityGroup({ cities }) {
  return (
    <div className="d-flex w-100 justify-content-between">
      {cities.map((city) => (
        <CityCard {...city} key={city.name} />
      ))}
    </div>
  );
}
