import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const round = useSelector((state) => state.ownCountry.round);

  return (
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
          <Link to="/" className="btn btn-primary">
            Выйти
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
