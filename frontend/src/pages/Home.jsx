import React, { useState } from "react";
import SideMenu from "../component/SideMenu/SideMenu";
import MainMenu from "../component/MainMenu";
import { useDispatch, useSelector } from "react-redux";
import { setCountries } from "../features/countriesSlice";
import { logout, setOwnCountry } from "../features/ownCountrySlice";
import axios from "axios";
import withLoader from "../extra/ButtonWithLoading";
import { Navigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const Home = () => {
    const isComplete = useSelector((state) => state.ownCountry.isComplete);
    const countryName = useSelector((state) => state.ownCountry.name);
    const countriesLoading =
        useSelector((state) => state.countries.status) === "loading";
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const ButtonWithLoader = withLoader((props) => {
        return <button {...props}>Обновить</button>;
    });

    if (countriesLoading) {
        return (
            <div className="d-flex justify-content-center align-items-center h-100 w-100 position-fixed">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ maxWidth: 1480 + "px" }}>
            <div className="row">
                <div className="col-8">
                    {isComplete ? (
                        <ButtonWithLoader
                            type="button"
                            className="btn btn-primary btn-lg fw-bold mt-4"
                            loading={loading ? "true" : undefined}
                        />
                    ) : (
                        <MainMenu />
                    )}
                </div>
                <div className="col-4">{isComplete ? null : <SideMenu />}</div>
            </div>
        </div>
    );
};

export default Home;
