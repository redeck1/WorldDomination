import React, { useState } from "react";
import { useSelector } from "react-redux";

const tlogs = [
    "[Россия] Развитие ядерной технологии",
    "[Россия] Улучшение Санкт-Петербург",
    "[Россия] Щит для Новосибирск",
    "[Россия] Санкции на Китай",
    "[США] Улучшение Нью-Йорк",
    "[США] Щит для Нью-Йорк",
    "[США] Вклад в экологию",
    "[США] Санкции на Китай",
    "[Китай] Улучшение Шанхай",
    "[Китай] Улучшение Пекин",
    "[Китай] Улучшение Чунцин",
    "[Китай] Улучшение Гуанчжоу",
    "==НОВЫЙ РАУНД==",
    "[Китай] Щит для Шанхай",
    "[Китай] Щит для Пекин",
    "[Китай] Улучшение Чунцин",
    "[Китай] Улучшение Гуанчжоу",
    "[Россия] Строительство бомб",
    "[Россия] Улучшение Санкт-Петербург",
    "[Россия] Вклад в экологию",
    "[США] Развитие ядерной технологии",
    "[США] Улучшение Нью-Йорк",
    "[США] Улучшение Вашингтон",
    "[США] Вклад в экологию",
    "==НОВЫЙ РАУНД==",
    "[США] Строительство бомб",
    "[Россия] Строительство бомб",
    "[Россия] Атаковала Китай/Пекин",
    "[Россия] Атаковала Китай/Гуанчжоу",
    "[Китай] Улучшение Шанхай",
    "[Китай] Улучшение Чунцин",
    "[Китай] Развитие ядерной технологии",
    "==НОВЫЙ РАУНД==",
    "[Китай] Строительство бомб",
    "[Россия] Строительство бомб",
    "[Россия] Атаковала США/Нью-Йорк",
    "[Россия] Атаковала США/Вашингтон",
    "[США] Атаковала Китай/Шанхай",
    "[США] Атаковала Россия/Новосибирск",
    "[США] Строительство бомб",
    "==НОВЫЙ РАУНД==",
    "[Китай] Атаковала Россия/Санкт-Петербург",
    "[Китай] Атаковала Россия/Москва",
    "[США] Атаковала Россия/Москва",
    "[США] Атаковала Россия/Санкт-Петербург",
    "[Россия] Строительство бомб",
    "==НОВЫЙ РАУНД==",
    "[Россия] Атаковала Китай/Пекин",
    "[Россия] Атаковала Китай/Чунцин",
    "[Россия] Атаковала Китай/Шанхай",
    "[Россия] Атаковала США/Нью-Йорк",
    "[Китай] Улучшение Чунцин",
    "[Китай] Улучшение Шанхай",
    "[Китай] Улучшение Пекин",
    "==НОВЫЙ РАУНД==",
];

function Logs() {
    const [cheched1, setCheched1] = useState(true);
    const [cheched2, setCheched2] = useState(false);
    const logs = useSelector((state) => state.logs);
    const atackLogs = tlogs.filter((item) => item.includes("Атаковала"));

    const [content, setContent] = useState(tlogs);

    const changeChecked = () => {
        if (cheched1) {
            setContent(atackLogs);
            setCheched1(false);
            setCheched2(true);
        } else {
            setContent(tlogs);
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
