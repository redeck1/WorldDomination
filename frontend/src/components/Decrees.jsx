import React from "react";
import PanelHeader from "./PanelHeader";

const Decrees = ({ cities }) => {
  let income = 0;
  cities.map((city) => (income += city.profit));

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

  return (
    <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
      <PanelHeader>отданые приказы</PanelHeader>
      <h5 className="text-danger">ВАШИ РАСХОДЫ</h5>
      <h5 className="text-success">ВАШИ ДОХОДЫ</h5>
      {renderIncome()}
      <h5 className="text-info">ВАШ ВКЛАД В ЭКОЛОГИЮ</h5>
    </div>
  );
};

export default Decrees;
