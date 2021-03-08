import React, { useContext } from "react";

import DispatchContext from "../DispatchContext";

import RemoveButton from "./RemoveButton";
import StarIcon from "../Icons/Star.js";

const PlayListItem = ({ id, title, year, onRemove }) => {
  const appDispatch = useContext(DispatchContext);

  return (
    <li className="playlist__item">
      <div className="playlist__item__body">
        <div className="playlist-item__body__inner">
          <StarIcon id="star" />
          <p className="playlist__item__text" data-movie-title="">
            {title} ({year})
          </p>
        </div>
        <RemoveButton id={id} onRemove={onRemove} />
      </div>
    </li>
  );
};

export default PlayListItem;
