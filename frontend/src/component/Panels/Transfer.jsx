import React from "react";
import PanelHeader from "../PanelHeader";
import { useDispatch, useSelector } from "react-redux";
import {
    selectExclude,
    setTransfers,
    submitTransfers,
} from "../../features/ownCountrySlice";
import withLoader from "../../extra/ButtonWithLoading";

const Transfer = () => {
    const countryName = useSelector((state) => state.ownCountry.name);
    const countries = useSelector((state) => selectExclude(state, countryName));
    const balance = useSelector((state) => state.ownCountry.balance);
    const transfers = useSelector((state) => state.ownCountry.transfers);
    const transferStatus = useSelector(
        (state) => state.ownCountry.transferStatus
    );
    const dispatch = useDispatch();

    const SubmitButton = withLoader((props) => {
        return <button {...props}>Перевести</button>;
    });

    return (
        <div className="container py-3 mt-4 bg-body-tertiary rounded-4 ">
            <PanelHeader>перевести деньги</PanelHeader>
            <form
                className="container"
                onSubmit={(event) => {
                    event.preventDefault();
                    dispatch(submitTransfers({ countryName, transfers }));
                }}
            >
                {countries.map((country) => (
                    <div className="row mb-2" key={country.name}>
                        <div className="col-4">{country.name}</div>
                        <div className="col-4">
                            <input
                                onChange={(e) =>
                                    dispatch(
                                        setTransfers({
                                            countryName: country.name,
                                            value:
                                                parseInt(e.target.value) || 0,
                                        })
                                    )
                                }
                                className="form-control py-0 text-center"
                                type="number"
                                id={"to" + country.name}
                                value={transfers[country.name]}
                            />
                        </div>
                    </div>
                ))}
                <SubmitButton
                    className={
                        transferStatus === "error"
                            ? "btn btn-outline-danger"
                            : "btn btn-primary"
                    }
                    type="submit"
                    loading={transferStatus === "loading" ? "true" : undefined}
                />
            </form>
        </div>
    );
};

export default Transfer;
