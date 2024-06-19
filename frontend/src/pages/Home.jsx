import React from "react";
import SideMenu from "../components/SideMenu";
import MainMenu from "../components/MainMenu";

const Home = () => {
  return (
    <div className="container" style={{ maxWidth: 1480 + "px" }}>
      <div className="row">
        <div className="col-8">
          <MainMenu />
        </div>
        <div className="col-4">
          <SideMenu />
        </div>
      </div>
    </div>
  );
};

export default Home;
