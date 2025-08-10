import React, { useState } from "react";
import { useSelector } from "react-redux";

const colors = {
    США: "#59D5E0",
    Россия: "#F5DD61",
    Китай: "#FAA300",
    "Сев. Корея": "#BE95C4",
    Германия: "#F4538A",
    Франция: "#C80036",
    Ирак: "#1D24CA",
    Греция: "#0C1844",
};

function Logs() {
    const [cheched1, setCheched1] = useState(true);
    const [cheched2, setCheched2] = useState(false);
    const logs = useSelector((state) => state.logs);
    const atackLogs = logs.filter(
        (item) =>
            item.includes("Атаковала") ||
            item.includes("РАУНД") ||
            item.includes("Здесь пока ничего нет")
    );

    const [content, setContent] = useState(logs);

    const changeChecked = () => {
        if (cheched1) {
            setContent(atackLogs);
            setCheched1(false);
            setCheched2(true);
        } else {
            setContent(logs);
            setCheched1(true);
            setCheched2(false);
        }
    };

    return (
        <div className="container bg-body-tertiary rounded-4 p-3 mt-3">
            <div
                className="d-flex align-items-center"
                style={{ marginBottom: 0.5 + "rem" }}
            >
                <h4
                    className="fw-bold text-uppercase my-0"
                    style={{ marginRight: 1 + "rem" }}
                >
                    логи
                </h4>
                <div className="btn-group" role="group">
                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio1"
                        autoComplete="off"
                        readOnly
                        checked={cheched1}
                    ></input>
                    <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio1"
                        onClick={() => changeChecked()}
                    >
                        Все
                    </label>

                    <input
                        type="radio"
                        className="btn-check"
                        name="btnradio"
                        id="btnradio2"
                        autoComplete="off"
                        readOnly
                        checked={cheched2}
                    ></input>
                    <label
                        className="btn btn-outline-primary"
                        htmlFor="btnradio2"
                        onClick={() => changeChecked()}
                    >
                        Атаки
                    </label>
                </div>
            </div>
            {content.map((str, ind) => {
                const countryKey = Object.keys(colors).find((country) =>
                    str.includes(country)
                );

                if (!countryKey) {
                    return <p key={ind}>{str}</p>;
                }

                const parts = str.split(countryKey);

                return (
                    <p key={ind}>
                        {parts[0]}
                        <span style={{ color: colors[countryKey] }}>
                            {countryKey}
                        </span>
                        {parts[1]}
                    </p>
                );
            })}
        </div>
    );
}

export default Logs;
