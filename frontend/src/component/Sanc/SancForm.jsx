import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSanction, selectExclude } from "../../features/ownCountrySlice";
import { createSelector } from "@reduxjs/toolkit";

const SancForm = () => {
    const dispatch = useDispatch();
    const selectActiveSanctions = createSelector(
        (state) => state.ownCountry.changes,
        (changes) => changes.filter((item) => item.type === "sanction")
    );

    const activeSanctions = useSelector(selectActiveSanctions);

    const countryName = useSelector((state) => state.ownCountry.name);
    const countries = useSelector((state) => selectExclude(state, countryName));

    return (
        <>
            {countries.map((country) => (
                <div className="form-check" key={country.name}>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={country.name}
                        checked={activeSanctions.some(
                            (item) => item.to === country.name
                        )}
                        onChange={(e) =>
                            dispatch(
                                changeSanction({
                                    to: country.name,
                                    send: e.target.checked,
                                })
                            )
                        }
                    ></input>
                    <label htmlFor={country.name}>{country.name}</label>
                </div>
            ))}
        </>
    );
};

export default SancForm;
