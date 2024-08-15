import React from "react";
import { changeCity } from "../features/ownCountrySlice";
import { useDispatch, useSelector } from "react-redux";

const CityForm = ({ name }) => {
  const dispatch = useDispatch();
  const balance = useSelector((state) => state.ownCountry.balance);
  const isAlive = useSelector(
    (state) => state.ownCountry.cities.find((city) => city.name === name).isAlive
  );
  const isHaveShield = useSelector(
    (state) => state.ownCountry.cities.find((city) => city.name === name).isHaveShield
  );

  const upgradeClicked = useSelector((state) =>
    state.ownCountry.changes.find((item) => item.name === `Улучшение ${name}`)
  );
  const shieldClicked = useSelector((state) =>
    state.ownCountry.changes.find((item) => item.name === `Щит для ${name}`)
  );

  return (
    <form className="px-3">
      <div className="mb-2 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`Улучшение ${name}`}
          checked={upgradeClicked ? true : false}
          disabled={(balance - 150 < 0 && !upgradeClicked) || !isAlive}
          onChange={(e) =>
            dispatch(changeCity({ name: name, type: "Улучшение", bool: e.target.checked }))
          }
        ></input>
        <label className="form-check-label text-center" htmlFor={`Улучшение ${name}`}>
          Развить город <span className="opacity-50">(150$)</span>
        </label>
      </div>
      <div className="mb-2 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={`Щит для ${name}`}
          checked={shieldClicked ? true : false}
          disabled={(balance - 300 < 0 && !shieldClicked) || !isAlive || isHaveShield}
          onChange={(e) =>
            dispatch(changeCity({ name: name, type: "Щит для", bool: e.target.checked }))
          }
        ></input>
        <label className="form-check-label text-center" htmlFor={`Щит для ${name}`}>
          {isHaveShield ? (
            <>Щит построен</>
          ) : (
            <>
              Построить щит <span className="opacity-50">(300$)</span>
            </>
          )}
        </label>
      </div>
    </form>
  );
};

export default CityForm;
