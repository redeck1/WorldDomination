import React from "react";
import SideCountry from "./SideCountry";
import { useSelector } from "react-redux";
import useExcludeSelect from "../extra/useExcludeSelect";

const SideMenu = () => {
  const thisName = useSelector((state) => state.ownCountry.name);
  const countries = useExcludeSelect(thisName);

  return (
    <div className="mt-4">
      {countries.map((country, index) => (
        <SideCountry country={country} index={index} key={country.name} />
      ))}
    </div>
  );
};

export default SideMenu;
