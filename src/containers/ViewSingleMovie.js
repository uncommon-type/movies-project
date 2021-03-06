import React, { useEffect, useState } from "react";

import { useParams, useHistory } from "react-router-dom";

const ViewSingleMovie = () => {
  const [movie, setMovie] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    const getMovies = async (id, searchType) => {
      try {
        const res = await fetch(
          `/.netlify/functions/search?searchTerm=${id}&searchType=${searchType}`
        );

        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    getMovies(id, "id");
  }, [id, setMovie]);

  return (
    <article className="wrapper">
      <div className="wrapper__inner splitter gap-top-600">
        <div className="movie-image-group">
          <div className="movie-image-group__inner">
            <figure className="movie-image-container flow aspect-ratio-square">
              <div className="movie-image frame" data-frame="primary">
                <img
                  src={
                    movie.Poster === "N/A"
                      ? "https://placehold.it/370x370"
                      : movie.Poster
                  }
                  alt={movie.Title}
                />
              </div>
              <figcaption className="movie-details leading-tight">
                <span className="movie__title font-sans weight-bold">
                  {movie.Title}
                </span>
                <span className="movie__year">{movie.Year}</span>
              </figcaption>
            </figure>
          </div>

          <div className="flow flow-space-300">
            <span className="plot text-400 lg:text-800 color-secondary-glare">
              {movie.Plot}
            </span>
          </div>
        </div>

        <div className="movie-summary-group">
          <h3 className="movie-summary-group__title text-700">Key Details</h3>
          <ol className="key-facts__list auto-grid">
            <li className="flow flow-space-300">
              <span className="text-700 lg:text-800 color-secondary-glare">
                {movie.BoxOffice || "N/A"}
              </span>
              <span className="text-600 lg:text-700">BoxOffice</span>
            </li>
            <li className="flow flow-space-300">
              <span className="text-700 lg:text-800 color-secondary-glare">
                {movie.IMDBRating || "N/A"}
              </span>
              <span className="text-600 lg:text-700">IMDB Rating</span>
            </li>
            <li className="flow flow-space-300">
              <span className="text-700 lg:text-800 color-secondary-glare">
                {movie.Awards}
              </span>
              <span className="text-600 lg:text-700">Awards</span>
            </li>
            <li className="flow flow-space-300">
              <span className="text-700 lg:text-800 color-secondary-glare">
                {movie.Director}
              </span>
              <span className="text-600 lg:text-700">Director</span>
            </li>
            <li className="flow flow-space-300">
              <span className="text-700 lg:text-800 color-secondary-glare">
                {movie.Actors}
              </span>
              <span className="text-600 lg:text-700">Actors</span>
            </li>
          </ol>

          <div className="stack">
            <button className="btn button">Back</button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default ViewSingleMovie;
