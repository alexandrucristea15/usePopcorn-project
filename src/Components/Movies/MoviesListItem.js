const MoviesListItem = ({ movie, onSelectMovie }) => {
  const handleMovieClick = () => {
    onSelectMovie(movie.imdbID);
  };

  return (
    <li onClick={handleMovieClick}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

export default MoviesListItem;
