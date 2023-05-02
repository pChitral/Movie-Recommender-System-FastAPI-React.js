import React, { useState, useEffect } from "react";
import { getMovieRecommendations } from "./api/api";
import axios from "axios";

function MovieRecommendations() {
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/movies");
        console.log(response.data)
        setMovieList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (movieName) {
      const data = await getMovieRecommendations(movieName);
      const recommendedMovies = data.recommended_movie_names.map(
        (name, index) => {
          return { name, posterUrl: data.recommended_movie_posters[index] };
        }
      );
      setRecommendedMovies(recommendedMovies);
    }
  };

  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };

  const handleSelectChange = (event) => {
    setMovieName(event.target.value);
  };

  return (
    <div>
      <h1>Recommended Movies</h1>
      <form onSubmit={handleFormSubmit}>
        <label>
          Movie name:
          <input type="text" value={movieName} onChange={handleInputChange} />
        </label>
        <select value={movieName} onChange={handleSelectChange}>
          <option value="">--Select a movie--</option>
          {movieList.map((movie, index) => (
            <option value={movie} key={index}>
              {movie}
            </option>
          ))}
        </select>
        <button type="submit">Submit</button>
      </form>
      {recommendedMovies.length > 0 ? (
        <ul>
          {recommendedMovies.map((movie, index) => (
            <li key={index}>
              <img src={movie.posterUrl} alt={movie.name} />
              <p>{movie.name}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommended movies to display.</p>
      )}
    </div>
  );
}

export default MovieRecommendations;
