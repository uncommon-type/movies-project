import React from "react";

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
      <svg fill="#fff" viewBox="0 0 100 100" aria-hidden="true">
        <g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M39.363,79L16,55.49l11.347-11.419L39.694,56.49L72.983,23L84,34.085L39.363,79z"
          ></path>
        </g>
      </svg>
    </span>
  </button>
);

export default AddButton;
