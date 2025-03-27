import React, { useState } from "react";
import PanelHeader from "../PanelHeader";
import { useDispatch, useSelector } from "react-redux";
import { buildBombs, changeTech } from "../../features/ownCountrySlice";

let NuclerTech = () => {
  const dispatch = useDispatch();
  const buildTechClicked = useSelector((state) => state.ownCountry.nuclearTech);
  const balance = useSelector((state) => state.ownCountry.balance);
  const isHaveNuclearTech = useSelector((state) => state.ownCountry.isHaveNuclearTech);
  const bombs = useSelector((state) => state.ownCountry.bombs);
  let bombsToBuild = useSelector((state) =>
    state.ownCountry.changes.find((item) => item.name === "Строительство бомб")
  );
  bombsToBuild = bombsToBuild ? bombsToBuild.count : 0;

  const [waste, setWaste] = useState(0);

  const onClickHandler = (e) => {
    const count = Number(e.target.id[0]);
    dispatch(buildBombs({ count: count, waste: waste }));
    setWaste(150 * count);
  };

  const renderNuclearTech = () => {
    if (isHaveNuclearTech) {
      return (
        <form className="d-flex justify-content-between mb-2">
          <span>
            Количество бомб: <strong>{bombs}</strong>
          </span>
          <span>Построить:</span>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="buildBombs"
              id="0bomb"
              defaultChecked={true}
              onChange={(e) => onClickHandler(e)}
            />
            <label className="form-check-label" htmlFor="0bomb">
              0
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="buildBombs"
              id="1bomb"
              checked={bombsToBuild === 1}
              disabled={balance + waste - 150 < 0 && bombsToBuild !== 1}
              onChange={(e) => onClickHandler(e)}
            />
            <label className="form-check-label" htmlFor="1bomb">
              1 <span className="opacity-50">(150$)</span>
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="buildBombs"
              id="2bomb"
              checked={bombsToBuild === 2}
              disabled={balance + waste - 300 < 0 && bombsToBuild !== 2}
              onChange={(e) => onClickHandler(e)}
            />
            <label className="form-check-label" htmlFor="2bomb">
              2 <span className="opacity-50">(300$)</span>
            </label>
          </div>
        </form>
      );
    }

    return (
      <form className="mb-2 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="tech"
          checked={buildTechClicked}
          disabled={balance - 500 < 0 && !buildTechClicked}
          onChange={(e) => dispatch(changeTech(e.target.checked))}
        ></input>
        <label className="form-check-label text-center" htmlFor="tech">
          Разработать ядерное оружие <span className="opacity-50">(500$)</span>
        </label>
      </form>
    );
  };

  return (
    <div className="bg-body-tertiary rounded-4 p-3 mt-3">
      <PanelHeader>Ядерное оружие</PanelHeader>
      {renderNuclearTech()}
    </div>
  );
};

NuclerTech = React.memo(NuclerTech);

export default NuclerTech;
