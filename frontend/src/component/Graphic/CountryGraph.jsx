import React from "react";
import { Tooltip, BarChart, Bar, CartesianGrid, XAxis, YAxis, Text } from "recharts";

function CountryGraph({ country, color }) {
  // const data = country.cities.map((city) => ({
  //   ...city,
  //   name: city.name.length > 8 ? city.name.slice(0, 6) + "..." : city.name,
  // }));

  function CustomizedAxisTick({ x, y, payload }) {
    return (
      <Text x={x} y={y} textAnchor="middle" verticalAnchor="start">
        {payload.value.length > 8 ? payload.value.slice(0, 6) + "..." : payload.value}
      </Text>
    );
  }

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
      <XAxis dataKey="name" tick={<CustomizedAxisTick />} interval={0} />
      <YAxis domain={[0, 100]}></YAxis>
      <Tooltip content={<CustomTooltip />} />
      <Bar dataKey="liveLvl" fill={color} />
    </BarChart>
  );
}

export default CountryGraph;
