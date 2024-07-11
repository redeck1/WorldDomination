import React from "react";
import { Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

function CoutryGraph({ country, color }) {
  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="border border-dark-subtle p-3 bg-light">
          <div>{label}</div>
          <div
            style={{ color: "rgb(136, 132, 216)" }}
          >{`Уровень жизни : ${payload[0].value}%`}</div>
        </div>
      );
    }

    return null;
  }
  return (
    <BarChart width={430} height={300} data={country.cities}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis domain={[0, 100]}></YAxis>
      <Tooltip content={<CustomTooltip />} />

      <Bar dataKey="liveLvl" fill={color} />
    </BarChart>
  );
}

export default CoutryGraph;
