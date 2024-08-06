import React from "react";
import GameBoard from "./GameBoard";
import MovieHint from "./MovieHint";
import Footer from "./Footer";
import { Autocomplete, TextField } from "@mui/material";

class AppRemake extends React.Component {
  state = {
    currentInput: "",
    correctMovie: {
      adult: false,
      backdrop_path: "/iwkWvcXcP8M4r9HLglhVEhgGyVu.jpg",
      genre_ids: [28, 18, 27, 53],
      id: 1001311,
      original_language: "fr",
      original_title: "Sous la Seine",
      overview:
        "In order to save Paris from an international bloodbath, a grieving scientist is forced to face her tragic past when a giant shark appears in the Seine.",
      popularity: 528.56,
      poster_path: "/qZPLK5ktRKa3CL4sKRZtj8UlPYc.jpg",
      release_date: "2024-06-04",
      title: "Under Paris",
      video: false,
      vote_average: 6.086,
      vote_count: 992,
    },
    guesses: [],
    movieTitles: [],
    currentGuess: {
      adult: false,
      backdrop_path: "/fw7NiOxIHq1FWGQCpSW5ZJcbGZR.jpg",
      genre_ids: [27, 53],
      id: 1026819,
      original_language: "en",
      original_title: "The Hunted",
      overview:
        "After their boat capsizes in the Mediterranean Sea, a group of refugees are rescued by rich Europeans who offer them shelter on an idyllic island. But the miracle soon becomes a nightmare when the saviors turn into ruthless manhunters.",
      popularity: 297.123,
      poster_path: "/zgx7I0JfmHbGcbveNk4EK3jFuMk.jpg",
      release_date: "2024-01-18",
      title: "The Hunted",
      video: false,
      vote_average: 7.069,
      vote_count: 51,
    },
    stylesForGuesss: [0, 0, 0, 0],
    status: "Playing",
  };

  async componentDidMount() {
    await this.fetchHorrorMovie();
    await this.fetchMovieTitles();
    console.log(this.state.correctMovie);
    console.log(this.state.currentGuess);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentInput !== this.state.currentInput) {
      this.fetchHorrorMovieByTitle().then((movie) => {
        if (movie) {
          this.setState({ currentGuess: movie });
        }
      });
    }
  }
  fetchMovieTitles = async (input: string) => {
    const head = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjhjNmY1MWZjZTNiYWJlNWJhNzUyYjJmMDg3YzFkMyIsIm5iZiI6MTcyMTA3MTc5NC43MTE4MzgsInN1YiI6IjY2NzVkMzU4MWViOTNiYzk1MzRlZWJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TaP6qdVhiYCa56lfGFK4NLKyZL83mfaTnxtlIAnn2Mo",
      },
    };
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
      input
    )}&include_adult=false&language=en-US&page=1`;
    try {
      const response = await fetch(url, head);
      const data = await response.json();
      const movieTitles = data.results.map((movie) => movie.title);
      this.setState({movieTitles: movieTitles });
    } catch (error) {
      console.error("Failed to fetch movie titles:", error);
    }
  };

  handleInputChange = (event) => {
    const newInput = event.target.value;
    this.setState({ currentInput: newInput }, () => {
      if (newInput.length > 2) { // Fetch options if input length is greater than 2
        this.fetchMovieTitles(newInput);
      } else {
        this.setState({ autocompleteOptions: [] });
      }
    });
  };
handleGuess = async () => {
  const { currentInput, correctMovie, guesses } = this.state;
  if (currentInput === correctMovie.title) {
    // Handle correct guess
    this.setState({ status: "Won" });
    const currentGuess = await this.fetchHorrorMovieByTitle();
    this.setState({ currentGuess });
    console.log(currentGuess);
  } else {
    // Handle incorrect guess
    const currentGuess = await this.fetchHorrorMovieByTitle();
    this.setState({ currentGuess });
    console.log(currentGuess);
  }
  this.setState({ guesses: [...guesses, currentInput] });
};

  fetchHorrorMovieByTitle = async () => {
    const head = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjhjNmY1MWZjZTNiYWJlNWJhNzUyYjJmMDg3YzFkMyIsIm5iZiI6MTcyMTA3MTc5NC43MTE4MzgsInN1YiI6IjY2NzVkMzU4MWViOTNiYzk1MzRlZWJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TaP6qdVhiYCa56lfGFK4NLKyZL83mfaTnxtlIAnn2Mo",
      },
    };
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURI(
      this.state.currentInput
    )}&include_adult=false&language=en-US&page=1`;
  
    try {
      const response = await fetch(url, head);
      const data = await response.json();
      return data.results[0]; // Assuming you want the first result
    } catch (error) {
      console.error("Error fetching movie:", error);
      return null;
    }
  };

  fetchHorrorMovie = async () => {
    const head = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjhjNmY1MWZjZTNiYWJlNWJhNzUyYjJmMDg3YzFkMyIsIm5iZiI6MTcyMTA3MTc5NC43MTE4MzgsInN1YiI6IjY2NzVkMzU4MWViOTNiYzk1MzRlZWJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TaP6qdVhiYCa56lfGFK4NLKyZL83mfaTnxtlIAnn2Mo",
      },
    };
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=27'
`;
    try {
      const response = await fetch(url, head);
      const data = await response.json();
      const movies = data.results;
      const randomIndex = Math.floor(Math.random() * movies.length);
      this.setState({ correctMovie: movies[randomIndex] });
      console.log(movies.toString());
    } catch (error) {
      console.error("Failed to fetch movies:", error);
    }
  };

  render() {
    // const { currentInput, movieTitles } = this.state;
    return (
      <div>
        <h1>Horrordle</h1>
        <MovieHint movie={this.state.correctMovie}></MovieHint>
        <Autocomplete
          freeSolo
          value={this.state.currentInput}
          //onChange={this.handleInputChange}
          options={
            this.state.movieTitles.filter((option, index, self) => self.indexOf(option) === index).map((option) => option)}
          style={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              onChange={this.handleInputChange}
              label="Search and Guess!!"
              variant="outlined"
            />
          )}
        />
        <button onClick={this.handleGuess}>Make Guess</button>
        <GameBoard
          guesses={this.state.currentGuess}
          correctMovie={this.state.correctMovie}
        ></GameBoard>
        <Footer />
      </div>
    );
  }
}
export default AppRemake;
