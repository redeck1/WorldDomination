import React from "react";
import CityCard from "./CityCard";
import { data } from "../Data";

export default function CityGroup() {
  return (
    <div className="d-flex w-100 justify-content-between">
      {data.map((city) => (
        <CityCard {...city} key={city.name} />
      ))}
    </div>
  );
}
