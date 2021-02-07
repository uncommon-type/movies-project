import React from "react";

const Dialog = ({ closeDialog }) => (
  <div id="dialog">
    <div className="dialog__inner">
      <p id="dialog-content">🎉 Yay! You've selected 3 movies</p>
      <button onClick={closeDialog} id="dialog-content__close-button">
        Okay
      </button>
    </div>
  </div>
);

export default Dialog;
