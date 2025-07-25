import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/NavBar";
import Home from "./pages/Home";
import Statistics from "./pages/Statistics";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./features/ownCountrySlice";

function App() {
    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.ownCountry.isAuth);

    if (!isAuth) {
        dispatch(checkAuth({ password: undefined }));
    }

    const ProtectedRoute = ({ children }) => {
        return isAuth ? children : <Navigate to="/" replace />;
    };

    const Navigation = ({ children }) => {
        const NewComponent = () => {
            return (
                <>
                    <Navbar />
                    {children}
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
                <Route
                    path="home"
                    element={
                        <ProtectedRoute>
                            <Navigation>
                                <Home />
                            </Navigation>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="statistics"
                    element={
                        <ProtectedRoute>
                            <Navigation>
                                <Statistics />
                            </Navigation>
                        </ProtectedRoute>
                    }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
