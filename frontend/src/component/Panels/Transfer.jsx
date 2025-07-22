import React, { useMemo } from "react";
import PanelHeader from "../PanelHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { changeTransfer, selectExclude } from "../../features/ownCountrySlice";
import axios from "axios";

const Transfer = () => {
    const countryName = useSelector((state) => state.ownCountry.name);
    const countries = useSelector((state) => selectExclude(state, countryName));
    const balance = useSelector((state) => state.ownCountry.balance);
    const [rawTransfers, setRawTransfers] = useState(
        countries.reduce((obj, item) => ({ ...obj, [item.name]: 0 }), {})
    );
    const dispatch = useDispatch();
    const apiUrl = process.env.REACT_APP_API_URL;

    const transfers = useMemo(() => {
        const result = {};
        for (const countryName in rawTransfers) {
            result[countryName] = Math.min(
                Math.max(0, rawTransfers[countryName]),
                balance
            );
        }
        return result;
    }, [rawTransfers, balance]);

    const transferSubmit = async (event) => {
        event.preventDefault();
        console.log(transfers);
        const { data } = await axios.post(
            `${apiUrl}/transfer`,
            { countryName, transfers },
            { withCredentials: true }
        );
        console.log(data);
        // dispatch(changeTransfer({ transfers }));
    };

    return (
        <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
            <PanelHeader>перевести деньги</PanelHeader>
            <form className="container" onSubmit={transferSubmit}>
                {countries.map((country) => (
                    <div className="row mb-2" key={country.name}>
                        <div className="col-4">{country.name}</div>
                        <div className="col-4">
                            <input
                                onChange={(e) =>
                                    setRawTransfers({
                                        ...rawTransfers,
                                        [country.name]:
                                            parseInt(e.target.value) || 0,
                                    })
                                }
                                className="form-control py-0 text-center"
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
