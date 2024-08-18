import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { checkAuth } from "../features/ownCountrySlice";
import withLoader from "../extra/ButtonWithLoading";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const countries = useSelector((state) => state.countries.items);
  const authLoading = useSelector((state) => state.ownCountry.status) === "loading";
  const countriesLoading = useSelector((state) => state.countries.status) === "loading";
  const auth = useSelector((state) => state.ownCountry.auth);
  const [login, setLogin] = useState(countries[0].name);
  const [password, setPassword] = useState("");

  const submitHandler = async (event) => {
    event.preventDefault();
    dispatch(checkAuth({ login, password }));
  };

  if (auth) {
    navigate("/home");
  }

  if (countriesLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center h-100 w-100 position-fixed">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </div>
      </div>
    );
  }

  const ButtonWithLoader = withLoader((props) => {
    return <button {...props}>Подтвердить</button>;
  });

  return (
    <div className="d-flex justify-content-center h-100 w-100 position-fixed">
      <form onSubmit={(e) => submitHandler(e)} className="mt-5">
        <div className="mb-3">
          <h3 className="form-label fw-bold">Выберите страну</h3>
          <select
            className="form-select"
            type="text"
            onChange={(e) => setLogin(e.target.value)}
            value={login}
          >
            {countries.map((c) => (
              <option value={c.name} key={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <input
            className="form-control"
            type="text"
            placeholder="Пароль"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
        </div>
        <ButtonWithLoader
          className="btn btn-outline-primary"
          type="button"
          loading={authLoading}
          onClick={submitHandler}
        />
      </form>
    </div>
  );
}

export default Login;
