import React from "react";

const NuclerTech = () => {
  return (
    <div className="bg-body-tertiary rounded-4 p-3 mt-3">
      <h2 className="fw-bold">ЯДЕРНОЕ ОРУЖИЕ</h2>
      <form>
        <div className="mb-2 form-check">
          <input type="checkbox" className="form-check-input" id="tech"></input>
          <label className="form-check-label text-center" htmlFor="tech">
            Разработать ядерное оружие <span className="opacity-50">(500$)</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default NuclerTech;
