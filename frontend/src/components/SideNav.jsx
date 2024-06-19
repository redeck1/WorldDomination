import React from "react";

const SideNav = ({ country }) => {
  return (
    <nav className="navbar navbar-dark pt-0">
      <div className="container-fluid" style={{ backgroundColor: "#be95c4" }}>
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
