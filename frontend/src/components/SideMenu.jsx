import React from "react";
import SideCountry from "./SideCountry";
import { useSelector } from "react-redux";

const SideMenu = () => {
  const countries = useSelector((state) => state.countries);
  return (
    <div className="mt-4">
      {countries.map((country, index) => (
        <SideCountry country={country} index={index} key={country.name} />
      ))}
    </div>
  );
};

export default SideMenu;
