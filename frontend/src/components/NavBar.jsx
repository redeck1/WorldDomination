import React from "react";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark navbar-expand bg-primary py-0">
      <div className="container-fluid">
        <div className="d-flex">
          <a className="navbar-brand fw-bold" href="#">
            Мировое господство
          </a>
          <ul className="navbar-nav align-items-center">
            <li className="nav-item">
              <div className="badge text-bg-light text-wrap py-2 fs-5">1</div>
            </li>
            <li className="nav-item">
              <a className="nav-link active fs-5 fw-bold">Раунд</a>
            </li>
          </ul>
        </div>
        <div>
          <a href="home" className="btn btn-primary">
            Страна
          </a>
          <a href="statistics" className="btn btn-primary">
            Общая статистика
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
