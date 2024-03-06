export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src = {movie.Image} style = {{width: "400px", height: "400px"}}  />
            </div>
            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
        
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <button onClick = {onBackClick}>Go Back</button>
        </div>
    );
};