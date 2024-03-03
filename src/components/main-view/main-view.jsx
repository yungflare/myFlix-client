import { useSate } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useSate([
        {
           id: 1,
           title: "The Godfather Part II",
           genre: "Crime",
           director: "Francis Ford Coppola",
           description:"The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son Michael expands and tightens his grip on the family crime syndicate.",
           image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTyk_H2WxvMp5bq4tIgaABNVfl9JVOSVE0Y6TcchuZpLtNMmFF_",  
        },
        {
            id: 2,
            title: "Avatar: The Way of Water",
            genre: "Adventure",
            director: "James Cameron",
            description:"A paraplegic Marine dispatched to the moon Pandora on a unique mission becomes torn between following his orders and protecting the world he feels is his home.",
            image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSGQUTaBL19fLf8caYxcyNt0mYl9HgpiKPAaGgQxCuz3ZTvAWVI",  
         },
         {
            id: 3,
            title: "The Dark Knight",
            genre: "Action",
            director: "Christopher Nolan",
            description:"When the menace known as The Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTdkJNhyQgUH-VQBVaeczyvAMEi78DeTFRMexMdUxpapinKBf1h",   
         },
    ]);

    const [selectedMovie, setSelectedMovie] = useSate(null);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        );
    }

    if (movies.length === 0) {
        return <div> Empty! </div>
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                key={movie.id} 
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                    setSelectedMovie(newSelectedMovie);
                }}
                />
            ))}
        </div>
    );
};