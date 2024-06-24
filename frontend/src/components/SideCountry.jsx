import React from "react";
import SideNav from "./SideNav";
import SideTable from "./SideTable";

export default function SideCountry({ country }) {
  return (
    <div className="bg-body-secondary rounded-3 overflow-hidden mt-2 pb-2">
      <SideNav country={country} />
      <SideTable country={country} />
    </div>
  );
}
