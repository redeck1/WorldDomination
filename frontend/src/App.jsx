import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/NavBar";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import { useDispatch } from "react-redux";
import { fetchCountriesData } from "./features/countriesSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountriesData());
  }, []);

  const Navigation = (WrappedComponent) => {
    const NewComponent = () => {
      return (
        <>
          <Navbar />
          <WrappedComponent />
          <div style={{ marginBottom: 600 + "px" }}></div>
        </>
      );
    };
    return <NewComponent />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" exact="true" element={<Login />} />
        <Route path="home" element={Navigation(Home)} />
        <Route path="statistics" element={Navigation(Statistics)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
