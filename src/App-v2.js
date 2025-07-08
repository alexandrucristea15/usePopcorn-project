import { useEffect, useState } from "react";
import NavBar from "./Components/NavBar/NavBar";
import Main from "./Main";
import NumResults from "./Components/NavBar/NumResults";
import Search from "./Components/NavBar/Search";
import MoviesList from "./Components/Movies/MoviesList";
import Box from "./Components/UI/Box";
import WatchBoxSummary from "./Components/Watched/WatchBoxSummary";
import WatchBoxList from "./Components/Watched/WatchBoxList";
import Loader from "./Components/UI/Loader";
import ErrorMessage from "./Components/UI/ErrorMessage";
import MovieDetails from "./Components/MovieDetails/MovieDetails";

const KEY = "628dda5";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null); //"tt0120737");

  const handelSelectMovie = (movieId) => {
    selectedId === movieId ? setSelectedId(null) : setSelectedId(movieId);
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleRemoveWatched = (watchedMovie) => {
    const newWatchedMovies = watched.filter(
      (movie) => movie.imdbID !== watchedMovie.imdbID
    );
    setWatched(newWatchedMovies);
  };

  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchMovies = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?&apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching the movies");
        }
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }

      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }
    };
    handleCloseMovie();
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MoviesList movies={movies} onSelectMovie={handelSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              onAddWatched={handleAddWatched}
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
            />
          ) : (
            <>
              <WatchBoxSummary watched={watched} />
              <WatchBoxList
                watched={watched}
                onRemoveWatched={handleRemoveWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
