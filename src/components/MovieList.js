import React from "react";
import MovieListItem from "./MovieListItem";

const MovieList = ({ searchTerm, searchResults }) => (
  <section className="movie-list-group">
    <div className="movie-list-group__inner">
      <h3 className="movie-list__title text-700">Results for: {searchTerm}</h3>
      <ul id="movie-list">
        <MovieListItem className="movie-item" />
        <MovieListItem className="movie-item" />
        <MovieListItem className="movie-item" />
      </ul>
    </div>
  </section>
);

export default MovieList;
