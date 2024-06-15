import React from "react";

const CityCard = (props) => {
  return (
    <div className="bg-body-tertiary rounded-4 overflow-hidden">
      <img
        src={require(`../imgs/${props.image}.png`)}
        style={{ width: 200 + "px", height: 200 + "px" }}
        alt="img"
      />
      <h6 className="fw-bold d-flex justify-content-center"> {props.name} </h6>
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
    </div>
  );
};

export default CityCard;
