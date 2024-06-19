import React from "react";
import PanelHeader from "./PanelHeader";

const Ecology = () => {
  return (
    <div className="bg-body-tertiary rounded-4 p-3 mt-3">
      <PanelHeader>Экология</PanelHeader>
      <form>
        <div className="mb-2 form-check">
          <input type="checkbox" className="form-check-input" id="eco"></input>
          <label className="form-check-label text-center" htmlFor="eco">
            Улучшить экологию <span className="opacity-50">(150$)</span>
          </label>
        </div>
      </form>
    </div>
  );
};

export default Ecology;
