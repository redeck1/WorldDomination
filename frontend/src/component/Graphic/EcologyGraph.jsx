import { useSelector } from "react-redux";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from "recharts";

const EcologyGraph = () => {
  const data = useSelector((state) => state.ownCountry.ecologyLvl);

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
