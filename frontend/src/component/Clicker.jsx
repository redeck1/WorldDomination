import React, { useState } from "react";
import HorizontalSlider from "./HorizontalSlider";

function Clicker() {
    const [coins, setCoins] = useState(0);
    const [clickPower, setClickPower] = useState(1);
    const [isPressed, setIsPressed] = useState(false);

    const upgrades = [
        { id: 1, name: "Усложнение(+4)", cost: 30, power: 4 },
        { id: 2, name: "Новая кнопка(+5)", cost: 50, power: 10 },
        { id: 3, name: "МЕГА КЛИК +25", cost: 200, power: 25 },
        { id: 4, name: "УЛЬТРА КЛИК +100", cost: 1000, power: 100 },
        { id: 5, name: "+5 за клик", cost: 10, power: 5 },
        { id: 6, name: "+10 за клик", cost: 50, power: 10 },
        { id: 7, name: "МЕГА КЛИК +25", cost: 200, power: 25 },
        { id: 8, name: "УЛЬТРА КЛИК +100", cost: 1000, power: 100 },
    ];

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
        setCoins(coins + clickPower);
    };

    const buyUpgrade = (upgrade) => {
        if (coins >= upgrade.cost) {
            setCoins(coins - upgrade.cost);
            setClickPower(clickPower + upgrade.power);
        }
    };

    return (
        <div>
            <div
                style={{
                    fontFamily: "Arial",
                    maxWidth: "1000px",
                    margin: "0 auto",
                }}
            >
                <center>
                    <h1>
                        <font face="Arial" color="black">
                            COIN CLICKER DELUXE
                        </font>
                    </h1>
                    <br />
                    <font size="6" face="Comic Sans MS" color="green">
                        Coins: {coins}
                    </font>
                    <br />
                    <br />

                    <input
                        type="button"
                        value={`КЛИК (+${clickPower})`}
                        onMouseDown={handleMouseDown}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={() => setIsPressed(false)}
                        style={{
                            fontSize: "24px",
                            padding: "10px 20px",
                            backgroundColor: isPressed ? "#ff0000" : "#ffff00",
                            color: isPressed ? "#ffffff" : "#000000",
                            border: "3px solid #ff0000",
                            cursor: "pointer",
                            marginBottom: "20px",
                        }}
                    />

                    <h2>
                        <font color="maroon"> УЛУЧШЕНИЯ</font>
                    </h2>
                </center>
            </div>
            <HorizontalSlider style={{ position: "fixed", bottom: 0, left: 0 }}>
                {upgrades.map((upgrade) => (
                    <div
                        key={upgrade.id}
                        tabIndex="0"
                        style={{
                            flex: "0 0 auto",
                            padding: "10px",
                            backgroundColor: "#fff",
                            border: "2px solid #000",
                            borderRadius: "5px",
                            minWidth: "150px",
                            textAlign: "center",
                        }}
                    >
                        <h3>
                            <font color="blue">{upgrade.name}</font>
                        </h3>
                        <font size="3">Цена: {upgrade.cost} монет</font>
                        <br />
                        <br />
                        <input
                            type="button"
                            value="КУПИТЬ"
                            onClick={() => buyUpgrade(upgrade)}
                            disabled={coins < upgrade.cost}
                            style={{
                                padding: "5px 10px",
                                backgroundColor:
                                    coins >= upgrade.cost
                                        ? "#00ff00"
                                        : "#cccccc",
                                border: "2px solid #000",
                                cursor:
                                    coins >= upgrade.cost
                                        ? "pointer"
                                        : "not-allowed",
                            }}
                        />
                    </div>
                ))}
            </HorizontalSlider>
        </div>
    );
}

export default Clicker;

//ВОт вамм кликер, чтобы вы не скучали
