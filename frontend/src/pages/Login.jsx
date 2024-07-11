import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const countries = useSelector((state) => state.countries);
  const [value, setValue] = useState(countries[0].name);
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    navigate("/home");
  };

  return (
    <div className="d-flex justify-content-center h-100 w-100 position-fixed">
      <form onSubmit={(e) => submitHandler(e)} className="mt-5">
        <div className="mb-3">
          <h3 className="form-label fw-bold">Выберите страну</h3>
          <select
            className="form-select"
            type="text"
            id="loginInput"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          >
            {countries.map((c) => (
              <option value={c.name} key={c.name}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Подтвердить
        </button>
      </form>
    </div>
  );
}

export default Login;
