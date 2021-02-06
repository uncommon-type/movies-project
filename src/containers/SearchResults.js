import { Fragment } from "react";
import MovieList from "../components/MovieList";
import PlayList from "../components/PlayList";

const SearchResults = ({ searchTerm }) => {
  const getMovies = async (searchTerm, searchType = "text") => {
    try {
      const res = await fetch(
        `/.netlify/functions/movies?searchTerm=${searchTerm}&searchType=${searchType}`
      );
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Fragment>
      <MovieList />
      <PlayList />
    </Fragment>
  );
};
export default SearchResults;
