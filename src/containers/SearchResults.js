import { Fragment } from "react";
import MovieList from "../components/MovieList";
import PlayList from "../components/PlayList";

const SearchResults = () => {
  return (
    <Fragment>
      <MovieList />
      <PlayList />
    </Fragment>
  );
};
export default SearchResults;
