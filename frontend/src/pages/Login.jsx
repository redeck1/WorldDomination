import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuth } from "../features/ownCountrySlice";
import withLoader from "../extra/ButtonWithLoading";

function Login() {
    const dispatch = useDispatch();
    const authLoading =
        useSelector((state) => state.ownCountry.status) === "loading";
    const isAuth = useSelector((state) => state.ownCountry.isAuth);
    const [code, setCode] = useState("");

    const submitHandler = async (event) => {
        event.preventDefault();
        dispatch(checkAuth({ password: code }));
    };

    if (isAuth) {
        return <Navigate to="/home" replace />;
    }

    const ButtonWithLoader = withLoader((props) => {
        return <button {...props}>Подтвердить</button>;
    });

    return (
        <div className="d-flex justify-content-center h-100 w-100 position-fixed">
            <form onSubmit={(e) => submitHandler(e)} className="mt-5">
                <div className="mb-3">
                    <h3 className="form-label fw-bold">Введите код</h3>
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Ваш код"
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                    ></input>
                </div>
                <ButtonWithLoader
                    className="btn btn-outline-primary"
                    type="button"
                    loading={authLoading ? "true" : undefined}
                    onClick={submitHandler}
                />
            </form>
        </div>
    );
}

export default Login;
