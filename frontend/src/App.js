import React from 'react';
import MovieRecommendations from './MovieRecommendations';
import { Title } from '@mantine/core';

function App() {
  return (
    <div className="App">
      <Title align='center'>Movie Recommendation App</Title>
      <br></br>
      <MovieRecommendations />
    </div>
  );
}

export default App;
