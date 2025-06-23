import MoviesListItem from "./MoviesListItem";

const MoviesList = ({ movies, onSelectMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <MoviesListItem movie={movie} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

export default MoviesList;
