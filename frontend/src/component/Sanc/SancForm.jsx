import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSanction } from "../../features/ownCountrySlice";
import useExcludeSelect from "../../extra/useExcludeSelect";

const SancForm = () => {
  const dispatch = useDispatch();
  const activeSanctions = useSelector((state) =>
    state.ownCountry.changes.filter((item) => item.type === "sanction")
  );
  // console.log(activeSanctions.find((item) => item.to === "США") ? true : false);

  const thisName = useSelector((state) => state.ownCountry.name);
  const countries = useExcludeSelect(thisName);

  return (
    <>
      {countries.map((country) => (
        <div className="form-check" key={country.name}>
          <input
            type="checkbox"
            className="form-check-input"
            id={country.name}
            checked={activeSanctions.find((item) => item.to === country.name) ? true : false}
            onChange={(e) => dispatch(changeSanction({ to: country.name, send: e.target.checked }))}
          ></input>
          <label htmlFor={country.name}>{country.name}</label>
        </div>
      ))}
    </>
  );
};

export default SancForm;
