import React from "react";
import { Link } from "react-router-dom";

import AddButton from "./AddButton";
import StarIcon from "../Icons/Star.js";

const MovieListItem = ({ id, title, year, onAdd, isAdded }) => (
  <li className="movie-item">
    <div className="movie-item__body">
      <Link to={`/movie/${id}`}>
        <div className="movie-item__body__inner">
          <StarIcon id="star" />
          <p className="movie-item__title">
            {title} ({year})
          </p>
        </div>
      </Link>
      <AddButton
        id={id}
        title={title}
        year={year}
        onAdd={onAdd}
        isAdded={isAdded}
      />
    </div>
  </li>
);

export default MovieListItem;
