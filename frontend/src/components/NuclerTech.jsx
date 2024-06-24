import React from "react";
import PanelHeader from "./PanelHeader";
import { useDispatch, useSelector } from "react-redux";
import { changeTech } from "../features/ownCountry/ownCountrySlice";

const NuclerTech = () => {
  const dispatch = useDispatch();
  const clicked = useSelector((state) => state.ownCountry.nuclearTech);
  const balance = useSelector((state) => state.ownCountry.balance);

  return (
    <div className="bg-body-tertiary rounded-4 p-3 mt-3">
      <PanelHeader>Ядерное оружие</PanelHeader>
      <form>
        <div className="mb-2 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="tech"
            disabled={balance - 500 < 0 && !clicked}
            checked={clicked}
            onChange={(e) => dispatch(changeTech(e.target.checked))}
          ></input>
          <label className="form-check-label text-center" htmlFor="tech">
            Разработать ядерное оружие <span className="opacity-50">(500$)</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default NuclerTech;
