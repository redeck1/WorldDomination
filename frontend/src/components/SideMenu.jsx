import React from "react";
import { countries } from "../Data";
import SideCountry from "./SideCountry";
const cities = [
  { name: "First", liveLVL: 57 },
  { name: "Second", liveLVL: 57 },
  { name: "Third", liveLVL: 57 },
  { name: "Fourth", liveLVL: 57 },
];

const SideMenu = () => {
  return (
    <div className="mt-4">
      {countries.map((country) => (
        <SideCountry country={country} cities={cities} key={country.name} />
      ))}
    </div>
  );
};

export default SideMenu;
