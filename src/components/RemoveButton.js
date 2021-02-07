import React from "react";

const RemoveButton = ({ id, onRemove }) => (
  <button onClick={() => onRemove(id)} type="button" className="btn">
    <span className="btn__txt">Remove</span>
  </button>
);

export default RemoveButton;
