import React from "react";
import PanelHeader from "./PanelHeader";

const Decrees = () => {
  return (
    <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
      <PanelHeader>отданые приказы</PanelHeader>
      <h5 className="text-danger">ВАШИ РАСХОДЫ</h5>
      <h5 className="text-success">ВАШИ ДОХОДЫ</h5>
      <h5 className="text-info">ВАШ ВКЛАД В ЭКОЛОГИЮ</h5>
    </div>
  );
};

export default Decrees;
