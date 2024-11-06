import MoviesListItem from "./MoviesListItem";

const MoviesList = ({ movies }) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <MoviesListItem movie={movie} />
      ))}
    </ul>
  );
};

export default MoviesList;
