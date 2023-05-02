export const getMovieRecommendations = async (movie) => {
  const response = await fetch(`http://localhost:8000/recommend/${movie}`);
  const data = await response.json();
  console.log(data);
  return data;
};
