import React from "react";
import CityTable from "./CityTable";
import CityForm from "./CityForm";
import { useSelector } from "react-redux";

let CityCard = (city) => {
    const isAlive = useSelector(
        (state) =>
            state.ownCountry.cities.find((c) => c.name === city.name).isAlive
    );

    let img = undefined;
    try {
        img = require(`../../imgs/${city.name}.png`);
    } catch {}

    return (
        <div
            className="bg-body-tertiary rounded-4 overflow-hidden pb-2"
            style={{ width: 224 + "px" }}
        >
            <div className="position-relative">
                {!isAlive && (
                    <img
                        src={require("../../imgs/x.png")}
                        style={{
                            width: 224 + "px",
                            height: 224 + "px",
                            opacity: 0.85,
                        }}
                        alt="destroyed"
                        className="position-absolute top-0"
                    />
                )}
                <img
                    src={img ? img : require("../../imgs/NotFound.png")}
                    style={{
                        width: 224 + "px",
                        height: 224 + "px",
                    }}
                    alt={`${city.name}`}
                />
            </div>

            <h6 className="fw-bold d-flex justify-content-center">
                {" "}
                {city.name}{" "}
            </h6>
            <CityTable {...city} />
            <CityForm name={city.name} />
        </div>
    );
};

CityCard = React.memo(CityCard);

export default CityCard;
