import React from "react";

import FireworkIcon from "../Icons/Firework.js";

const Dialog = ({ closeDialog }) => (
  <div id="dialog">
    <div className="dialog__inner">
      <FireworkIcon className="firework" />
      <p id="dialog-content">You've selected 5 movies</p>
      <button onClick={closeDialog} id="dialog-content__close-button">
        Okay
      </button>
    </div>
  </div>
);

export default Dialog;
