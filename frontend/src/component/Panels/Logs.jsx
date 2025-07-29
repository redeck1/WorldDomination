import React, { useState } from "react";
import { useSelector } from "react-redux";

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
                return <p key={ind}>{str}</p>;
            })}
        </div>
    );
}

export default Logs;
