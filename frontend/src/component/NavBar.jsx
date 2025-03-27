import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { reset } from "../features/ownCountrySlice";

const Navbar = () => {
  const round = useSelector((state) => state.ownCountry.round);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const signOut = () => {
    navigate("/");
    dispatch(reset());
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand bg-primary py-0">
        <div className="container-fluid">
          <div className="d-flex">
            <a className="navbar-brand fw-bold" href="#">
              Мировое господство
            </a>
            <ul className="navbar-nav align-items-center">
              <li className="nav-item">
                <div className="badge text-bg-light text-wrap py-2 fs-5">{round}</div>
              </li>
              <li className="nav-item">
                <a className="nav-link active fs-5 fw-bold">Раунд</a>
              </li>
            </ul>
          </div>
          <div>
            <Link to="/home" className="btn btn-primary">
              Страна
            </Link>
            <Link to="/statistics" className="btn btn-primary">
              Общая статистика
            </Link>
            <button className="btn btn-primary" onClick={signOut}>
              Выйти
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
