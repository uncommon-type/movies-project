import React from "react";
import MovieListItem from "./MovieListItem";

const MovieList = ({ searchTerm, searchResults, onAdd }) => (
  <section className="movie-list-group">
    <div className="movie-list-group__inner">
      <h3 className="movie-list__title text-700">Results for: {searchTerm}</h3>
      <ul id="movie-list">
        {searchResults.map(({ imdbID: id, Title, Year }) => (
          <MovieListItem
            key={id}
            className="movie-item"
            id={id}
            title={Title}
            year={Year}
            onAdd={onAdd}
          />
        ))}
      </ul>
    </div>
  </section>
);

export default MovieList;
