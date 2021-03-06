import React from "react";

import ButtonCheckIcon from "../Icons/Buttoncheck.js";

const AddButton = ({ id, title, year, onAdd, isAdded }) => (
  <button
    onClick={(event) => onAdd(id, title, year)}
    disabled={isAdded}
    aria-pressed={isAdded}
    type="button"
    className="btn"
  >
    <span className="btn__txt">Add to playlist</span>
    <span className="btn__check">
      <ButtonCheckIcon />
    </span>
  </button>
);

export default AddButton;
