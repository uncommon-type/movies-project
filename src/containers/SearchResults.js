import { Fragment, useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import PlayList from "../components/PlayList";

const SearchResults = ({ searchTerm }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getMovies = async (searchTerm, searchType = "text") => {
      try {
        const res = await fetch(
          `/.netlify/functions/movies?searchTerm=${searchTerm}&searchType=${searchType}`
        );

        const data = await res.json();
        setSearchResults(data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovies(searchTerm);
  }, [searchTerm, setSearchResults]);

  return (
    <Fragment>
      <MovieList />
      <PlayList />
    </Fragment>
  );
};
export default SearchResults;
