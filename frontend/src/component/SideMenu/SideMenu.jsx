import React from "react";
import SideCountry from "./SideCountry";
import { useSelector } from "react-redux";
import { selectExclude } from "../../features/ownCountrySlice";

const SideMenu = () => {
    const countryName = useSelector((state) => state.ownCountry.name);
    const countries = useSelector((state) => selectExclude(state, countryName));

    return (
        <div className="mt-4">
            {countries.map((country, index) => (
                <SideCountry
                    country={country}
                    index={index}
                    key={country.name}
                />
            ))}
        </div>
    );
};

export default SideMenu;
