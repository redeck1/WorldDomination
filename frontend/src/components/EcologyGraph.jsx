import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";
const data = [
  { round: 1, lvl: 90, amt: 2400 },
  { round: 2, lvl: 70, amt: 2400 },
  // { round: 3, lvl: 40, amt: 2400 },
  // { round: 4, lvl: 35, amt: 2400 },
  // { round: 5, lvl: 50, amt: 2400 },
  // { round: 6, lvl: 55, amt: 2400 },
];

const EcologyGraph = () => {
  function CustomTooltip({ payload, label, active }) {
    if (active) {
      return (
        <div className="opacity-50 bg-secondary-subtle">
          <strong className="mx-2 my-5">{`Round ${label} : ${payload[0].value}%`}</strong>
        </div>
      );
    }

    return null;
  }

  return (
    <LineChart
      width={900}
      height={400}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="lvl" stroke="#8ac926" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="round" />
      <YAxis />
      <Tooltip content={<CustomTooltip />} />
    </LineChart>
  );
};

export default EcologyGraph;
