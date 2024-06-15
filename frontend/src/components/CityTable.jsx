import React from "react";

const CityTable = (props) => {
  return (
    <div className="px-3">
      <table className="table table-light">
        <tbody>
          <tr>
            <th>Развитие</th>
            <td>{props.growth}%</td>
          </tr>
          <tr>
            <th>Ур. жизни</th>
            <td>{props.liveLVL}%</td>
          </tr>
          <tr>
            <th>Доход</th>
            <td>{props.profit}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
