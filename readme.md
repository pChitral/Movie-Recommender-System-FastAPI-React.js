# Movie Recommender System

This is a simple movie recommender system built using Python and the FastAPI web framework. The system is based on content-based filtering and recommends movies similar to the one provided by the user.

# Folder Structure

The project has the following folder structure:

```
.
├── backend
│   ├── README.md
│   ├── main.py
│   ├── movie_list.pkl
│   ├── similarity.pkl
│   ├── similarity.pkl.gz
│   └── requirements.txt
│   └── model.ipynb
│   └── data

├── frontend
│   ├── README.md
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── __pycache__
└── venv
```

- backend: Contains the backend code for the system.
- frontend: Contains the frontend code for the system.
- \***\*pycache\*\***: Contains cached bytecode files.
- venv: Contains the virtual environment for the project.

# Backend

The backend is built using Python and the FastAPI web framework. The following files are present in the backend directory:

- app.py: Contains the code to create and configure the FastAPI app.
- main.py: Contains the code for the movie recommender system.
- movie_list.pkl: Contains a pickled Pandas DataFrame containing information about movies.
- similarity.pkl: Contains a pickled NumPy array containing the similarity scores between movies.
- similarity.pkl.gz: Contains a compressed pickled NumPy array containing the similarity scores between movies.
- requirements.txt: Contains the list of Python packages required for the project.

## Dependencies

The following Python packages are required to run the backend:

- fastapi: A web framework for building APIs.
- uvicorn: A fast ASGI server for running web applications.
- pandas: A library for data manipulation and analysis.
- numpy: A library for scientific computing.
- scikit-learn: A library for machine learning.
  To install these dependencies, run the following command:

```python
pip install -r backend/requirements.txt
```

## Running the Backend

To run the backend, navigate to the backend directory and run the following command:

```python
uvicorn main:app --reload
```

This will start the server at `http://localhost:8000`.

## API Endpoints

The following API endpoints are available:

- GET /movies: Returns a list of all the movies in the system.
- GET /recommend/{movie}: Returns a list of 6 recommended movies based on the movie provided in the URL.

# Frontend

The frontend is built using Vue.js, a popular JavaScript framework for building user interfaces. The following files are present in the frontend directory:

- public/index.html: Contains the HTML markup for the web page.
- src/App.js: Contains the React.js component for the web page.
- src/index.js: Contains the JavaScript code to bootstrap the React.js app.
- MovieRecommendations.js: Contains the code to communicate with my frontend and deals with the logic of how components will be rendered.
- api/api.js: Contains the code to talk with my APIs created in FastAPI and helps my frontend communicate with the backend.
- package.json: Contains the list of dependencies and build scripts for the project.

## Dependencies

The following packages are required to run the frontend:

- vue: A JavaScript framework for building user interfaces.
- axios: A library for making HTTP requests.

To install these dependencies, run the following command:

```javascript
cd frontend
npm install
```

## Running the Frontend

To run the frontend, navigate to the frontend directory and run the following command:

```python
npm start
```

This will start the development server at `http://localhost:3000`.
