import React from "react";
import CountryNav from "../component/CountryNav";
import NuclerTech from "../component/Panels/NuclerTech";
import Ecology from "../component/Panels/Ecology";
import Sanc from "../component/Sanc/Sanc";
import Transfer from "../component/Panels/Transfer";
import Decrees from "../component/Panels/Decrees";
import CityGroup from "./City/CityGroup";
import { useDispatch, useSelector } from "react-redux";
import { nextMove } from "../features/ownCountrySlice";
import withLoader from "../extra/ButtonWithLoading";

const MainMenu = () => {
    const countryName = useSelector((state) => state.ownCountry.name);
    const changes = useSelector((state) => state.ownCountry.changes);
    const nextMoveLoading = useSelector((state) => state.ownCountry.status);
    const dispatch = useDispatch();

    const NextMoveButton = withLoader((props) => {
        return <button {...props}>Закончить ход</button>;
    });

    return (
        <div className="container py-2 mt-4 bg-body-secondary rounded-3">
            <CountryNav />
            <CityGroup />

            <div className="container">
                <div className="row">
                    <div className="col-7 ps-0">
                        <NuclerTech />
                    </div>
                    <div className="col-5 pe-0">
                        <Ecology />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 ps-0">
                        <Sanc />
                    </div>
                    <div className="col-6 pe-0">
                        <Transfer />
                        <Decrees />
                    </div>
                </div>
            </div>
            <div className="justify-content-center d-flex mt-3">
                <NextMoveButton
                    type="button"
                    className={
                        nextMoveLoading === "error"
                            ? "btn btn-outline-danger btn-lg fw-bold"
                            : "btn btn-outline-primary btn-lg fw-bold"
                    }
                    loading={nextMoveLoading === "loading" ? "true" : undefined}
                    onClick={() =>
                        dispatch(
                            nextMove({ name: countryName, changes: changes })
                        )
                    }
                />
            </div>
        </div>
    );
};

export default MainMenu;
