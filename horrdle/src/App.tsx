// /App.tsx
import  { useState, useEffect } from 'react';
import './App.css';
import MenuInterface from './components/MenuInterface';
import GameGrid from './components/GameGrid.tsx';
import Footer from './components/Footer.tsx';
import { Movie } from './dataTypes.ts';

const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjhjNmY1MWZjZTNiYWJlNWJhNzUyYjJmMDg3YzFkMyIsInN1YiI6IjY2NzVkMzU4MWViOTNiYzk1MzRlZWJhZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ._ggH2RLjnEIsvQqFaQ6bPiG-sUhAp2qVq54-awZHfuc'
    }
};



const getRandomPageNumber = () => {
    return Math.floor(Math.random() * 100) + 1;
};

const useRandomMovie = () => {
    const [movieData, setMovieData] = useState<Movie[]>([]);
    
    useEffect(() => {
        const fetchMovies = async () => {
            const pageNumber = getRandomPageNumber();
            const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${pageNumber}`, options);
            const data = await response.json();
            setMovieData(data.results);
        };
        fetchMovies();
    }, []);

    return movieData;
};



function App() {
    const randomMovieData = useRandomMovie();
const [guessedMovieData, setGuessedMovieData] = useState<Movie | undefined>(undefined);
    return (
        <div className='flex flex-col flex-wrap  min-h-screen bg-origin-border py-5 px-5 ' style={{
            backgroundImage: `url(https://wallpapers.com/images/featured/horror-movie-background-rcg5jqxgj4llhhvz.jpg)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundAttachment: 'fixed'
        
        }}>
                <h1 className=" flex flex-wrap flex-row justify-center mb-6 mt-3 text-white text-6xl">Horrordle</h1>
                <MenuInterface setGuessedMovieData={setGuessedMovieData} />
                <GameGrid movieData={randomMovieData} guessedMovieData={guessedMovieData} />
                <Footer />
        </div>
    );
}

export default App;