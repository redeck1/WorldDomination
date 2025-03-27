import React from "react";

const CityTable = (city) => {
  return (
    <div className="px-3">
      <table className="table table-light">
        <tbody>
          <tr>
            <th>Развитие</th>
            <td>{city.growth}%</td>
          </tr>
          <tr>
            <th>Ур. жизни</th>
            <td>{city.liveLvl}%</td>
          </tr>
          <tr>
            <th>Доход</th>
            <td>{city.profit}$</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CityTable;
