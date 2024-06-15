import React from "react";

const Ecology = () => {
  return (
    <div className="bg-body-tertiary rounded-4 p-3 mt-3">
      <h2 className="fw-bold">ЭКОЛОГИЯ</h2>
      <form>
        <div className="mb-2 form-check">
          <input type="checkbox" className="form-check-input" id="tech"></input>
          <label className="form-check-label text-center" htmlFor="tech">
            Улучшить экологию <span className="opacity-50">(150$)</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Ecology;
