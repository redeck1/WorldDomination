import React from "react";
import { changeCity } from "../features/ownCountry/ownCountrySlice";
import { useDispatch, useSelector } from "react-redux";

const CityForm = ({ name }) => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.ownCountry.balance);

  return (
    <form className="px-3">
      <div className="mb-2 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`upgrade${name}`}
          disabled={balance - 150 < 0 && !document.getElementById(`upgrade${name}`).checked}
          onChange={(e) =>
            dispatch(changeCity({ name: name, type: "upgrade", bool: e.target.checked }))
          }
        ></input>
        <label className="form-check-label text-center" htmlFor={`upgrade${name}`}>
          Развить город <span className="opacity-50">(150$)</span>
        </label>
      </div>
      <div className="mb-2 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`buildShield${name}`}
          disabled={balance - 300 < 0 && !document.getElementById(`buildShield${name}`).checked}
          onChange={(e) =>
            dispatch(changeCity({ name: name, type: "shield", bool: e.target.checked }))
          }
        ></input>
        <label className="form-check-label text-center" htmlFor={`buildShield${name}`}>
          Построить щит <span className="opacity-50">(300$)</span>
        </label>
      </div>
    </form>
  );
};

export default CityForm;
