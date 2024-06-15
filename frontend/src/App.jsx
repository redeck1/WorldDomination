import React from "react";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <div style={{ marginBottom: "600px" }}></div>
    </>
  );
}

export default App;
