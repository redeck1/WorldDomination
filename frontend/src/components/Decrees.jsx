import React from "react";
import PanelHeader from "./PanelHeader";
import { useSelector } from "react-redux";
import { selectEco, selectExpense } from "../features/ownCountry/ownCountrySlice";

const Decrees = () => {
  const expenses = useSelector(selectExpense);
  const ecologyChanges = useSelector(selectEco);
  const cities = useSelector((state) => state.ownCountry.cities);

  function computeSum(array, prop) {
    return array.reduce((sum, cur) => sum + cur[prop], 0);
  }

  const outcome = computeSum(expenses, "cost");
  const income = computeSum(cities, "profit");
  const allEcologyChanges = computeSum(ecologyChanges, "cost");

  const renderPartOfExpense = (textColor, changes, sum, chr = "") => {
    return (
      <div>
        {changes.map((change) => (
          <div className="d-flex justify-content-between" key={change.name}>
            <span className={textColor}>{change.name}</span>
            <span className={textColor}>
              {change.cost ? change.cost : change.profit}
              {chr}
            </span>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <span className={textColor} fw-bold="true">
            Всего
          </span>
          <span className={textColor} fw-bold="true">
            {sum}
            {chr}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
      <PanelHeader>отданые приказы</PanelHeader>
      <h5 className="text-danger">ВАШИ РАСХОДЫ</h5>
      {renderPartOfExpense("text-danger", expenses, outcome)}
      <h5 className="text-success">ВАШИ ДОХОДЫ</h5>
      {renderPartOfExpense("text-success", cities, income)}
      <h5 className="text-info">ВАШ ВКЛАД В ЭКОЛОГИЮ</h5>
      {renderPartOfExpense("text-info", ecologyChanges, allEcologyChanges, "%")}
    </div>
  );
};

export default Decrees;
