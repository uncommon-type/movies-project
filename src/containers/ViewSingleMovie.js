import React, { useEffect, useContext } from "react";

import { useParams, useHistory } from "react-router-dom";

import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

const ViewSingleMovie = () => {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const { id } = useParams();
  const history = useHistory();

  const handleBackNavigation = () => {
    history.goBack();
  };

  useEffect(() => {
    if (!/\b[a-z]{2}[0-9]/.test(id)) {
      const error = new Error("Not found");
      appDispatch({ type: "UPDATE_ERROR", payload: { error: error } });
      appDispatch({
        type: "UPDATE_STATUS",
        payload: { status: "rejected" },
      });
      return;
    }

    const getMovieDetails = async (id, searchType) => {
      appDispatch({ type: "UPDATE_STATUS", payload: { status: "pending" } });
      try {
        const res = await fetch(
          `/.netlify/functions/search?searchTerm=${id}&searchType=${searchType}`
        );

        const data = await res.json();

        if (data.Response === "False") {
          const error = new Error(data.Error);
          appDispatch({ type: "UPDATE_ERROR", payload: { error: error } });
          appDispatch({
            type: "UPDATE_STATUS",
            payload: { status: "rejected" },
          });
        } else {
          appDispatch({
            type: "UPDATE_MOVIE_RESULTS",
            payload: { movieDetails: data },
          });
          appDispatch({
            type: "UPDATE_STATUS",
            payload: { status: "resolved" },
          });
        }
      } catch (error) {
        console.error(error);
        appDispatch({ type: "UPDATE_ERROR", payload: { error: error } });
        appDispatch({ type: "UPDATE_STATUS", payload: { status: "rejected" } });
      }
    };

    getMovieDetails(id, "id");
  }, [id, appDispatch]);

  if (appState.status === "idle") {
    return null;
  }

  if (appState.status === "pending") {
    return (
      <div id="spinner-container">
        <Spinner />
      </div>
    );
  }

  if (appState.status === "rejected") {
    return <ErrorMessage error={appState.error} />;
  }

  if (appState.status === "resolved") {
    return (
      <article className="wrapper">
        <div className="wrapper__inner splitter gap-top-600">
          <div className="movie-image-group">
            <div className="movie-image-group__inner">
              <figure className="movie-image-container flow aspect-ratio-square">
                <div className="movie-image frame" data-frame="primary">
                  <img
                    src={
                      appState.movieDetails.Poster === "N/A"
                        ? "https://placehold.it/370x370"
                        : appState.movieDetails.Poster
                    }
                    alt={appState.movieDetails.Title}
                  />
                </div>
                <figcaption className="movie-details">
                  <span className="movie__title font-sans weight-bold">
                    {appState.movieDetails.Title}
                  </span>
                  <span className="movie__year">
                    {appState.movieDetails.Year}
                  </span>
                </figcaption>
              </figure>
            </div>

            <div className="flow">
              <span className="plot text-400 lg:text-800">
                {appState.movieDetails.Plot}
              </span>
            </div>
          </div>

          <div className="movie-summary-group">
            <h3 className="movie-summary__title text-700">Key Details</h3>
            <ol className="movie-summary__key-facts__list auto-grid">
              <li className="flow">
                <span className="text-700 lg:text-800">
                  {appState.movieDetails.BoxOffice || "N/A"}
                </span>
                <span className="text-600 lg:text-700">BoxOffice</span>
              </li>
              <li className="flow">
                <span className="text-700 lg:text-800">
                  {appState.movieDetails.IMDBRating || "N/A"}
                </span>
                <span className="text-600 lg:text-700">IMDB Rating</span>
              </li>
              <li className="flow">
                <span className="text-700 lg:text-800">
                  {appState.movieDetails.Awards}
                </span>
                <span className="text-600 lg:text-700">Awards</span>
              </li>
              <li className="flow">
                <span className="text-700 lg:text-800">
                  {appState.movieDetails.Director}
                </span>
                <span className="text-600 lg:text-700">Director</span>
              </li>
              <li className="flow">
                <span className="text-700 lg:text-800">
                  {appState.movieDetails.Actors}
                </span>
                <span className="text-600 lg:text-700">Actors</span>
              </li>
            </ol>

            <div className="movie-summary__button-container">
              <button onClick={handleBackNavigation} className="btn button">
                Back
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }
};

export default ViewSingleMovie;
