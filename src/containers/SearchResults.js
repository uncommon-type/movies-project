import { Fragment, useState, useEffect, useCallback } from "react";
import MovieList from "../components/MovieList";
import PlayList from "../components/PlayList";

const SearchResults = ({ searchTerm, playList, onAdd, onRemove }) => {
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getMovies = async (searchTerm, searchType = "text") => {
      if (searchTerm.length <= 2) {
        return;
      }
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

  const checkIfAdded = useCallback(
    (id) => {
      return !!playList.find((entry) => entry.id === id);
    },
    [playList]
  );

  return (
    <Fragment>
      <MovieList
        searchTerm={searchTerm}
        searchResults={searchResults}
        onAdd={onAdd}
        checkIfAdded={checkIfAdded}
        onRemove={onRemove}
      />
      <PlayList playList={playList} onRemove={onRemove} />
    </Fragment>
  );
};
export default SearchResults;
