import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    changeBombing,
    selectAttackedCities,
} from "../../features/ownCountrySlice";

const SideTable = ({ country }) => {
    const dispatch = useDispatch();
    const bombs = useSelector((state) => state.ownCountry.bombs);

    const atackedCities = useSelector(selectAttackedCities);

    const renderCity = (city) => {
        if (city.isAlive) {
            const clicked = atackedCities.find(
                (item) => item.name === `${country.name}/${city.name}`
            )
                ? true
                : false;
            return (
                <div className="form-check" key={country.name}>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={`${country.name}/${city.name}`}
                        checked={clicked}
                        disabled={bombs < 1 && !clicked}
                        onChange={(e) =>
                            dispatch(
                                changeBombing({
                                    name: e.target.id,
                                    bool: e.target.checked,
                                })
                            )
                        }
                    />
                    <label htmlFor={`${country.name}/${city.name}`}>
                        Бомбить
                    </label>
                </div>
            );
        }
        return <div className="text-center text-danger">Уничтожен</div>;
    };

    return (
        <div className="d-flex justify-content-between px-3">
            {country.cities.map((city) => (
                <div key={country.name + "/" + city.name}>
                    <h6 className="text-center fw-bold">{city.name}</h6>
                    <p style={{ fontSize: 14 }} className="mb-1">
                        Ур. жизни {city.liveLvl}%
                    </p>
                    {renderCity(city)}
                </div>
            ))}
        </div>
    );
};

export default SideTable;
