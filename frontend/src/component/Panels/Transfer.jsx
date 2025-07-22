import React from "react";
import PanelHeader from "../PanelHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeTransfer, selectExclude } from "../../features/ownCountrySlice";

const Transfer = () => {
    const countryName = useSelector((state) => state.ownCountry.name);
    const countries = useSelector((state) => selectExclude(state, countryName));
    const balance = useSelector((state) => state.ownCountry.balance);
    const [transfers, setTransfers] = useState(
        countries.reduce((obj, item) => ({ ...obj, [item.name]: 0 }), {})
    );
    const dispatch = useDispatch();

    const transferSubmit = (event) => {
        event.preventDefault();
        console.log(transfers);
        // dispatch(changeTransfer({ transfers }));
    };

    const handleBlur = (value, countryName) => {
        if (value < 0) {
            setTransfers({ ...transfers, [countryName]: 0 });
        } else if (value > balance) {
            setTransfers({ ...transfers, [countryName]: balance });
        }
        setTimeout(() => dispatch(changeTransfer({ transfers })), 500);
    };

    return (
        <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
            <PanelHeader>перевести деньги</PanelHeader>
            <form className="container" onSubmit={transferSubmit}>
                {countries.map((country) => (
                    <div className="row mb-2" key={country.name}>
                        <div className="col-4">{country.name}</div>
                        <div className="col-3">
                            <input
                                onChange={(e) =>
                                    setTransfers({
                                        ...transfers,
                                        [country.name]: e.target.value,
                                    })
                                }
                                className="form-control py-0"
                                type="number"
                                id={"to" + country.name}
                                value={transfers[country.name]}
                            />
                        </div>
                    </div>
                ))}
                <button className="btn btn-primary" type="submit">
                    Перевести
                </button>
            </form>
        </div>
    );
};

export default Transfer;
