import React from "react";
import SideMenu from "../component/SideMenu/SideMenu";
import MainMenu from "../component/MainMenu";
import { useSelector } from "react-redux";
import Clicker from "../component/Clicker";

const Home = () => {
    const isComplete = useSelector((state) => state.ownCountry.isComplete);
    const completed = useSelector((state) => state.ownCountry.completed);
    const countriesLoading =
        useSelector((state) => state.countries.status) === "loading";
    const numPlayers = useSelector((state) => state.countries.numPlayers);

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
            {isComplete ? (
                <>
                    <h6>
                        Вы завершили ход. Завершили {completed}/{numPlayers}
                    </h6>
                    <Clicker />
                </>
            ) : (
                <div className="row">
                    <div className="col-8">
                        <MainMenu />
                    </div>
                    <div className="col-4">
                        <SideMenu />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
