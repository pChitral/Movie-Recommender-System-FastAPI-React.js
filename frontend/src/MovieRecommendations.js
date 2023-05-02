import React, { useState, useEffect } from "react";
import { getMovieRecommendations } from "./api/api";
import axios from "axios";
import {
  Button,
  Select,
  Card,
  Text,
  Image,
  SimpleGrid,
  Title,
  Loader,
  Box,
  Divider,
} from "@mantine/core";

function MovieRecommendations() {
  const [movieName, setMovieName] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [showTitle, setShowTitle] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/movies");
        const movieList = JSON.parse(response.data);
        setMovieList(movieList);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (movieName !== "") {
      const data = await getMovieRecommendations(movieName);
      const recommendedMovies = data.recommended_movie_names.map(
        (name, index) => ({
          name,
          posterUrl: data.recommended_movie_posters[index],
        })
      );
      setRecommendedMovies(recommendedMovies);
      setShowTitle(true);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const handleSelectChange = (value) => {
    setMovieName(value);
  };
  const handleInputChange = (event) => {
    setMovieName(event.target.value);
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        textAlign: "center",
        padding: theme.spacing.xl,
        borderRadius: theme.radius.md,
        cursor: "pointer",

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[5]
              : theme.colors.gray[1],
        },
      })}
    >
      <div>
        <form onSubmit={handleFormSubmit}>
          <Select
            value={movieName}
            searchable
            onChange={handleSelectChange}
            label="Select a Movie Name"
            placeholder="Select a movie"
            data={movieList.map((movie) => ({ label: movie, value: movie }))}
            invalid={movieName === ""}
            error={movieName === "" ? "Please select a movie" : null}
          />
          <br></br>
          <Button
            type="submit"
            variant="outline"
            color="blue"
            disabled={loading}
            padding={10}
          >
            Submit
          </Button>
        </form>
        {showTitle && (
          <Title
            order={3}
            weight={700}
            align="center"
            style={{ marginTop: "2rem" }}
          >
            Recommended Movies
          </Title>
        )}
        {loading ? (
          <Loader size="lg" style={{ marginTop: "2rem" }} />
        ) : recommendedMovies.length > 0 ? (
          <SimpleGrid cols={3} spacing={20} style={{ marginTop: "2rem" }}>
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
                  <Image
                    src={movie.posterUrl}
                    alt={movie.name}
                    height={400}
                    style={{ borderRadius: "8px" }}
                  />
                </Card.Section>
                <Text
                  size="lg"
                  weight={700}
                  align="center"
                  style={{ marginTop: "1rem" }}
                >
                  {movie.name}
                </Text>
              </Card>
            ))}
          </SimpleGrid>
        ) : (
          <Text align="center" mt={20} size="md" color="gray">
            No recommended movies to display.
          </Text>
        )}
      </div>
    </Box>
  );
}

export default MovieRecommendations;
