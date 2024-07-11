import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" exact="true" element={<Login />}></Route>
        <Route path="home" element={<Home />} />
        <Route path="statistics" element={<Statistics />} />
      </Routes>
      <div style={{ marginBottom: "600px" }}></div>
    </BrowserRouter>
  );
}

export default App;
