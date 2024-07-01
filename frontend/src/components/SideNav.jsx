import React from "react";

const colors = [
  "#59D5E0",
  "#F5DD61",
  "#FAA300",
  "#BE95C4",
  "#F4538A",
  "#C80036",
  // "#1D24CA",
  "#0C1844",
];

const SideNav = ({ country, index }) => {
  return (
    <nav className="navbar navbar-dark pt-0">
      <div className="container-fluid" style={{ backgroundColor: colors[index] }}>
        <span href="#" className="navbar-brand fw-bold">
          {country.name}
        </span>
        <span href="#" className="navbar-brand me-0">
          {country.mean}%
        </span>
      </div>
    </nav>
  );
};

export default SideNav;
