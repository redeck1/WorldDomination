import React from "react";
import PanelHeader from "../PanelHeader";
import { useDispatch, useSelector } from "react-redux";
import { changeEco } from "../../features/ownCountrySlice";

const Ecology = () => {
  const dispatch = useDispatch();
  const clicked = useSelector((state) => state.ownCountry.ecology);
  const balance = useSelector((state) => state.ownCountry.balance);
  const ecoLvl = useSelector((state) => state.ownCountry.ecologyLvl).at(-1).lvl;

  return (
    <div className="bg-body-tertiary rounded-4 p-3 mt-3">
      <PanelHeader>
        Экология <span className="opacity-50">({ecoLvl}%)</span>
      </PanelHeader>
      <form>
        <div className="mb-2 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="eco"
            checked={clicked}
            disabled={balance - 150 < 0 && !clicked}
            onChange={(e) => dispatch(changeEco(e.target.checked))}
          ></input>
          <label className="form-check-label text-center" htmlFor="eco">
            Улучшить экологию <span className="opacity-50">(150$)</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Ecology;
