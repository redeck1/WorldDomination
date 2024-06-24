import React from "react";
import PanelHeader from "./PanelHeader";
import { useSelector } from "react-redux";
import { selectEco, selectExpense } from "../features/ownCountry/ownCountrySlice";

const Decrees = ({ cities }) => {
  const expenses = useSelector(selectExpense);
  const ecologyChanges = useSelector(selectEco);

  let outcome = 0;
  expenses.map((expense) => (outcome += expense.cost));

  let income = 0;
  cities.map((city) => (income += city.profit));

  let allEcologyChanges = 0;
  ecologyChanges.map((item) => (allEcologyChanges += item.cost));

  const renderIncome = () => {
    return (
      <div>
        <div className="d-flex justify-content-between">
          <span className="text-success">Доход с городов</span>
          <span className="text-success">{income}</span>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-success fw-bold">Всего</span>
          <span className="text-success fw-bold">{income}</span>
        </div>
      </div>
    );
  };

  const renderExpenses = () => {
    return (
      <div>
        {expenses.map((expense) => (
          <div className="d-flex justify-content-between" key={expense.name}>
            <span className="text-danger">{expense.name}</span>
            <span className="text-danger">{expense.cost}</span>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <span className="text-danger fw-bold">Всего</span>
          <span className="text-danger fw-bold">{outcome}</span>
        </div>
      </div>
    );
  };

  const renderEcology = () => {
    return (
      <div>
        {ecologyChanges.map((change) => (
          <div className="d-flex justify-content-between" key={change.name}>
            <span className="text-info">{change.name}</span>
            <span className="text-info">{change.cost}%</span>
          </div>
        ))}
        <div className="d-flex justify-content-between">
          <span className="text-info fw-bold">Всего</span>
          <span className="text-info fw-bold">{allEcologyChanges}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
      <PanelHeader>отданые приказы</PanelHeader>
      <h5 className="text-danger">ВАШИ РАСХОДЫ</h5>
      {renderExpenses()}
      <h5 className="text-success">ВАШИ ДОХОДЫ</h5>
      {renderIncome()}
      <h5 className="text-info">ВАШ ВКЛАД В ЭКОЛОГИЮ</h5>
      {renderEcology()}
    </div>
  );
};

export default Decrees;
