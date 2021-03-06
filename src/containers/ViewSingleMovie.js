import React, { useEffect, useState } from "react";

const ViewSingleMovie = () => {
  const [movie, setMovie] = useState([]);

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

export default ViewSingleMovie;
