import pickle
import requests
from fastapi import FastAPI

app = FastAPI()

def load_data():
    movies = pickle.load(open('movie_list.pkl', 'rb'))
    similarity = pickle.load(open('similarity.pkl', 'rb'))
    return movies, similarity

def fetch_poster(movie_id):
    url = "https://api.themoviedb.org/3/movie/{}?api_key=d07bdc3a6f9d0a18b637014e074af283&language=en-US".format(movie_id)
    data = requests.get(url)
    data = data.json()
    poster_path = data['poster_path']
    full_path = "https://image.tmdb.org/t/p/w500/" + poster_path
    return full_path

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/recommend/{movie}")
def recommend(movie: str):
    movies, similarity = load_data()
    index = movies[movies['title'] == movie].index[0]
    distances = sorted(
        list(enumerate(similarity[index])), reverse=True, key=lambda x: x[1])
    recommended_movie_names = []
    recommended_movie_posters = []
    for i in distances[1:6]:
        # fetch the movie poster
        movie_id = movies.iloc[i[0]].movie_id
        recommended_movie_posters.append(fetch_poster(movie_id))
        recommended_movie_names.append(movies.iloc[i[0]].title)

    return {"recommended_movie_names": recommended_movie_names, "recommended_movie_posters": recommended_movie_posters}
