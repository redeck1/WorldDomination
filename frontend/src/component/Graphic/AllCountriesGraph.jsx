import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";

function AllCountriesGraph({ data }) {
    return (
        <BarChart width={700} height={350} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <Bar dataKey="meanLiveLvl" fill="rgb(136, 132, 216)" />
        </BarChart>
    );
}

export default AllCountriesGraph;
