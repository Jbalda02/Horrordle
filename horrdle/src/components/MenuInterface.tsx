import { useState, useEffect } from "react";
import { Movie, MovieData } from "../dataTypes";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from "@mui/material";
import * as R from 'ramda';
//import GuessCell from "./GuessCell";
const MenuInterface = ({setGuessedMovieData}) => {
  // State to store the user's input
  const [userInput, setUserInput] = useState('');
  // State to store the search results
  const [searchMovies, setSearchMovies] = useState<Movie[]>([]);

  // Function to handle the change in the input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  // Function to fetch movies based on the search keywords
  const fetchMovies = async (keywords: string[]) => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjhjNmY1MWZjZTNiYWJlNWJhNzUyYjJmMDg3YzFkMyIsIm5iZiI6MTcxOTk1NzE3Ny4yMzY0NzYsInN1YiI6IjY2NzVkMzU4MWViOTNiYzk1MzRlZWJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vptFdga1T_S0CNx7dKSGxEoDsxFAlNw_lQ5ORt9Agiw'
      }
    };

    // Clear previous search results
    setSearchMovies([]);

    for (const keyword of keywords) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=en-US&page=1`,
        options
      );
      const data: MovieData = await response.json();
      const movies = data.results.map((movie) => ({ title: movie.title, id: movie.id }));
      const uniqueMovies = R.uniqBy(R.prop('id'), movies);
      setSearchMovies((prevMovies) => [...prevMovies, ...uniqueMovies]);
    }
  };

  // Effect to trigger the search operation when the userInput changes
  useEffect(() => {
    const keywords = userInput.split(' ');
    if (keywords.length > 0) {
      fetchMovies(keywords);
    }
  }, [userInput]);

  // Function to handle button click
  const handleAddGuessClick = () => {
    addGuess();
  };

  return (
    <div className='flex flex-wrap flex-row gap-10 justify-center'>
      <button
        className="bg-black hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded"
        onClick={handleAddGuessClick}
      >
        Add Guess
      </button>
      <Autocomplete
        style={{ width: 500 }}
        freeSolo
        autoComplete
        autoHighlight
        options={searchMovies.map((option) => option.title)}
        renderInput={(params) => (
          <TextField
            onChange={handleInputChange}
            value={userInput}
            {...params}
            label="Search Movies"
            margin="normal"
            variant="outlined"
            InputProps={{ ...params.InputProps, type: 'search' }}
          />
        )}
      ></Autocomplete>
    </div>
  );
};
export default MenuInterface;