import gzip
import pickle
import heapq
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer
import pandas as pd
import numpy as np
import ast
pd.options.mode.chained_assignment = None


# Importing Data
df_movies = pd.read_csv('data/tmdb_5000_movies.csv')
df_credits = pd.read_csv('data/tmdb_5000_credits.csv')
df_movies.head(1)
df_movies.shape
df_credits.head(1)
df_credits.shape
# Merging data from both the dfs into one giant dataframe
df_movies = df_movies.merge(df_credits, on='title')
df_movies.shape
movies = df_movies[['movie_id', 'title', 'overview',
                    'genres', 'keywords', 'cast', 'crew']]


movies.head(1)

movies['genres'][0]
movies.dropna(inplace=True)
# movies['genres'] = movies['genres'].apply(convert)

movies['genres'] = movies['genres'].apply(
    lambda text: [i['name'] for i in ast.literal_eval(text)])

movies.genres[0]
movies['keywords'] = movies['keywords'].apply(
    lambda x: [i['name'] for i in ast.literal_eval(x)])
movies.keywords[0]
movies['cast'] = movies['cast'].apply(
    lambda text: [i['name'] for idx, i in enumerate(ast.literal_eval(text)) if idx < 3])
movies.cast[0]
movies['crew'] = movies['crew'].apply(
    lambda text: [i['name'] for i in ast.literal_eval(text) if i['job'] == 'Director'])
movies.head(1)
movies['cast'] = [list(map(lambda y: y.replace(' ', ''), x))
                  for x in movies['cast']]
movies['crew'] = [list(map(lambda y: y.replace(' ', ''), x))
                  for x in movies['crew']]
movies['genres'] = [list(map(lambda y: y.replace(' ', ''), x))
                    for x in movies['genres']]
movies['keywords'] = [list(map(lambda y: y.replace(' ', ''), x))
                      for x in movies['keywords']]

movies.head(1)
movies['overview'] = movies['overview'].apply(lambda x: x.split())
movies['tags'] = movies['overview'] + movies['genres'] + \
    movies['keywords'] + movies['cast'] + movies['crew']
updated_movies = movies.drop(
    columns=['overview', 'genres', 'keywords', 'cast', 'crew'])
updated_movies['tags'] = updated_movies['tags'].apply(lambda x: " ".join(x))
updated_movies.head()
# Model
cv = CountVectorizer(max_features=5000, stop_words='english')
vector = cv.fit_transform(updated_movies['tags']).toarray()
vector.shape

similarity = cosine_similarity(vector)
similarity

updated_movies[updated_movies['title'] == 'The Lego Movie'].index[0]


def recommend(movie):
    index = updated_movies.loc[updated_movies['title'] == movie].index.item()
    distances = list(enumerate(similarity[index]))
    top_k = heapq.nlargest(6, distances, key=lambda x: x[1])[1:]
    return [updated_movies.iloc[i[0]].title for i in top_k]


recommend('Gandhi')
pickle.dump(updated_movies, open('movie_list.pkl', 'wb'))
pickle.dump(similarity, open('similarity.pkl', 'wb'))

with open('similarity.pkl', 'rb') as f_in:
    with gzip.open('similarity.pkl.gz', 'wb') as f_out:
        f_out.write(f_in.read())
