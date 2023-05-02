import React from "react";
import MovieRecommendations from "./MovieRecommendations";
import { Title, Box, Divider } from "@mantine/core";

function App() {
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
      <div className="App">
        <Title align="center">Movie Recommendation App</Title>
        <Divider my="sm" />
        <MovieRecommendations />
      </div>
    </Box>
  );
}

export default App;
