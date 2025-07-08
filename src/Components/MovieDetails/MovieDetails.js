import { useEffect, useState, useRef } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../UI/Loader";

const KEY = "628dda5";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const countRef = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    if (userRating) {
      countRef.current++;
    }
  }, [userRating]);

  const currentMovieWatched = watched.find(
    (movie) => movie.imdbID === selectedId
  );

  const handleAdd = () => {
    const watchedMovie = {
      imdbID: selectedId,
      title,
      poster,
      imdbRating: Number(movie.imdbRating),
      userRating,
      runtime: Number(movie.Runtime.split(" ").at(0)),
      countRatingDecisions: countRef.current,
    };

    onAddWatched(watchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    const escapeCloseCallback = (e) => {
      if (e.code === "Escape") {
        onCloseMovie();
      }
    };

    document.addEventListener("keydown", escapeCloseCallback);

    return () => {
      document.removeEventListener("keydown", escapeCloseCallback);
    };
  }, [onCloseMovie]);

  useEffect(() => {
    if (!title) return;
    document.title = `MOVIE: ${title}`;
    return () => (document.title = "usePopcorn");
  }, [title]);

  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?&apikey=${KEY}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    };

    getMovieDetails();
  }, [selectedId]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className="details">
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              ←
            </button>
            <img src={poster} alt={`Poster of ${title}`} />
            <div className="details-overview ">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime} &bull; {year}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐️</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {currentMovieWatched && (
                <p>
                  You rated this movie a {currentMovieWatched.userRating}/10{" "}
                  <span>⭐️</span>
                </p>
              )}
              {!currentMovieWatched && (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={(rating) => setUserRating(rating)}
                  />
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to the watched list{" "}
                  </button>
                </>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </div>
      )}
    </>
  );
};

export default MovieDetails;
