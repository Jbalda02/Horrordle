# Horrordle

Horrordle is a React-based application that allows users to search for horror movies using the TMDB API. The application provides an autocomplete feature for movie titles and displays relevant information about the selected movie.

## Features

- **Search Movies**: Search for horror movies by title.
- **Autocomplete**: Provides autocomplete suggestions as you type.
- **Movie Details**: Displays details about the selected movie.

## Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/yourusername/horrordle.git
    cd horrordle
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

3. **Set up API Key**:
    - Obtain an API key from [The Movie Database (TMDB)](https://www.themoviedb.org/documentation/api).
    - Create a `.env` file in the root directory and add your API key:
      ```env
      REACT_APP_TMDB_API_KEY=your_api_key_here
      ```

4. **Start the development server**:
    ```sh
    npm start
    ```

## Usage

- Open your browser and navigate to `http://localhost:3000`.
- Start typing a movie title in the search bar to see autocomplete suggestions.
- Click on a movie title to see more details about the movie.
## Dependencies

- **React**: A JavaScript library for building user interfaces.
- **Material-UI (MUI)**: A popular React UI framework.
- **TMDB API**: The Movie Database API for fetching movie data.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for providing the movie data API.
- [Material-UI (MUI)](https://mui.com/) for the UI components.
