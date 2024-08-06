import type { Movie } from "../dataTypes.ts";
import GuessCell from "./GuessCell.tsx";

export default function GameGrid({ movieData, guessedMovieData }: { movieData: Movie[]; guessedMovieData: Movie}) {
    const randomMovieNumber = getRandomMovieNumber(movieData.length);
    
    if (randomMovieNumber === null) {
        return <p>No movie data available</p>;
    }

    const movie = movieData[randomMovieNumber];
    const answerMovie = {
        id: movie.id,
        title: movie.title,
        original_title: movie.original_title,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        popularity: movie.popularity,
        original_language: movie.original_language
    }
    const guessedMovies: Movie[] = [];
        guessedMovies.push(guessedMovieData);
    
    return (
        <>
        <h1 className="flex flex-wrap flex-row justify-center">Game</h1>

        <div className="flex flex-row justify-center items-center">
            <div className="grid grid-cols-5 gap-1 justify-center  items-center ">
                <div className='py-16 px-3 text-center text-white bg-black bg-opacity-45  border-spacing-0 rounded border-4 border-red-700'> Title </div>
                <div className='py-16 px-3 text-center text-white bg-black bg-opacity-45  border-spacing-0 rounded border-4 border-red-700'> Release Year </div>
                <div className='py-16 px-3 text-center text-white bg-black bg-opacity-45  border-spacing-0 rounded border-4 border-red-700'> Rating </div>
                <div className='py-16 px-3 text-center text-white bg-black bg-opacity-45  border-spacing-0 rounded border-4 border-red-700'> Popularity </div>
                <div className='py-16 px-3 text-center text-white bg-black bg-opacity-45  border-spacing-0 rounded border-4 border-red-700'> Original Language </div>
               {}
           
           
            </div>
        </div>
        </>
    )

}

function render() {
    return (
      <div>
        {this.state.guesses.map((guess, index) => (
          <GuessCell key={index} guessedMovieData={guess} answerMovieData={this.answerMovieData} />
        ))}
      </div>
    );
  }

 function addGuess(newGuess) {
    this.setState(prevState => ({
      guesses: [...prevState.guesses, newGuess]
    }));
  }

const getRandomMovieNumber = (max: number) => {
    if (max === 0) return null;
    return Math.floor(Math.random() * max);
};
