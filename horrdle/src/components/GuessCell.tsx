import type { Movie } from "../dataTypes.ts";


export default function GuessCell({guessedMovieData , answerMovieData, key}:{guessedMovieData:Movie[] ; answerMovieData:Movie; key:number}) {
    
  const  correctStyle = 'py-16 px-3 text-center text-white bg-green bg-opacity-45  border-spacing-0 rounded border-4 border-red-700';
  const  incorrectStyle = 'py-16 px-3 text-center text-white bg-red bg-opacity-45  border-spacing-0 rounded border-4 border-red-700';
 // const  closeStyle = 'py-16 px-3 text-center text-white bg-black bg-opacity-45  border-spacing-0 rounded border-4 border-red-700';
    let lowerOrHigher = ''


    const answerProps = {
        id:answerMovieData.id, 
        title:answerMovieData.original_title,
        Year:answerMovieData.release_date?.split("-")[0] ?? 'Unknown Year',
        Vote:answerMovieData.vote_average,
        Popularity:answerMovieData.popularity,
        Language:answerMovieData.original_language
    };

    const guessProps = {
        id:guessedMovieData[guessedMovieData.length].id, 
        title:guessedMovieData[guessedMovieData.length].original_title,
        Year:guessedMovieData[guessedMovieData.length].release_date?.split("-")[0] ?? 'Unknown Year',
        Vote:guessedMovieData[guessedMovieData.length].vote_average,
        Popularity:guessedMovieData[guessedMovieData.length].popularity,
        Language:guessedMovieData[guessedMovieData.length].original_language
    };
    const compareMovies = (prop1:string | undefined, prop2:string | undefined) => {
       
       if(prop1 === undefined || prop2 === undefined){
              return incorrectStyle;
       }
       
       
        if (prop1 === prop2) {
            return correctStyle;
        }
        else {
            return incorrectStyle;
        }
    }
        const compareMoviesNumber = (prop1:number | undefined, prop2:number | undefined) =>{
            if(prop1 === undefined || prop2 === undefined){ 
                return incorrectStyle;
            }
            const difference = prop1 - prop2;
            if (difference == 0 ){
                return correctStyle;
            }
            if(difference < -1){
                
                lowerOrHigher = 'Higher';
                return incorrectStyle;

            }
            if(difference > 1){
                lowerOrHigher = 'Lower';
                return incorrectStyle;
            }


        }
    return (

        <div className="flex flex-row justify-center items-center">
            <div className="grid grid-cols-5 gap-1 justify-center  items-center ">
                <div className={compareMovies(answerProps.title, guessProps.title)}> {guessProps.title} </div>
                <div className={compareMovies(answerProps.Year, guessProps.Year)}> {guessProps.Year } Year </div>
                <div className={compareMoviesNumber(answerProps.Vote, guessProps.Vote )}> {guessProps.Vote + lowerOrHigher} </div>
                <div className={compareMoviesNumber(answerProps.Popularity, guessProps.Popularity)}> {guessProps.Popularity} </div>
                <div className={compareMovies(answerProps.Language, guessProps.Language)}> {guessProps.Language} </div>
            </div>
        </div>
    )
}