import React, { useState, useEffect } from "react";
import { getMovieRecommendations } from "./api/api";

function MovieRecommendations() {
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    async function fetchRecommendedMovies() {
      const data = await getMovieRecommendations("Avatar");
      const recommendedMovies = data.recommended_movie_names.map(
        (name, index) => {
          return { name, posterUrl: data.recommended_movie_posters[index] };
        }
      );
      setRecommendedMovies(recommendedMovies);
    }

    fetchRecommendedMovies();
  }, []);

  return (
    <div>
      <h1>Recommended Movies</h1>
      <ul>
        {recommendedMovies.map((movie, index) => (
          <li key={index}>
            <img src={movie.posterUrl} alt={movie.name} />
            <p>{movie.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieRecommendations;
