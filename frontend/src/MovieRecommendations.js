import React, { useState, useEffect } from "react";
import { getMovieRecommendations } from "./api/api";
import axios from "axios";
import {
  TextInput,
  Button,
  Select,
  Card,
  Text,
  Image,
  Grid,
  SimpleGrid,
} from "@mantine/core";

function MovieRecommendations() {
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/movies");
        const movieList = JSON.parse(response.data);
        console.log(movieList);
        setMovieList(movieList);
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

  const handleSelectChange = (value) => {
    setMovieName(value);
  };

  return (
    <div>
      <h1>Recommended Movies</h1>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          type="text"
          value={movieName}
          onChange={handleInputChange}
          label="Movie Name"
          placeholder="Avatar"
        />

        <Select
          value={movieName}
          onChange={handleSelectChange}
          label="Movie Name"
          placeholder="Select a movie"
          data={movieList.map((movie) => ({ label: movie, value: movie }))}
        />
        <Button type="submit">Submit</Button>
      </form>
      {recommendedMovies.length > 0 ? (
        <SimpleGrid cols={3} spacing={20}>
          {recommendedMovies.map((movie, index) => (
            <Card
              key={index}
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              w={300}
            >
              <Card.Section>
                <Image src={movie.posterUrl} alt={movie.name} height={400} />
              </Card.Section>

              <Text size="sm" color="orange" fw={500}>
                {movie.name}
              </Text>
            </Card>
          ))}
        </SimpleGrid>
      ) : (
        <p>No recommended movies to display.</p>
      )}
    </div>
  );
}

export default MovieRecommendations;

{
  /* <li key={index}>
              <img src={movie.posterUrl} alt={movie.name} />
              <p>{movie.name}</p>
            </li> */
}
