import { useEffect, useState } from "react";
import StarRating from "../StarRating/StarRating";
import Loader from "../UI/Loader";

const KEY = "628dda5";

const MovieDetails = ({ selectedId, onCloseMovie }) => {
  const [movie, setMovie] = useState({});

  const [isLoading, setIsLoading] = useState(false);

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
                {released} &bull; {runtime}
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
              <StarRating maxRating={10} size={24} />
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
