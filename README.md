# 🎬 usePopcorn

**usePopcorn** is a movie search and watchlist app built with React. This project is a showcase of my learning and practice with modern React concepts, custom hooks, and component-driven development. It demonstrates how to fetch data from APIs, manage state, persist data with local storage, and create a responsive, interactive UI.

---

## 🚀 Features

- **Search Movies:** Search for movies using the OMDb API.
- **Movie Details:** View detailed information about each movie.
- **Star Rating:** Rate movies with a custom star rating component.
- **Watchlist:** Add movies to your watched list and see summaries.
- **Persistent State:** Watched movies are saved in local storage.
- **Keyboard Shortcuts:** Quickly focus the search bar with the Enter key.
- **Responsive UI:** Built with custom CSS for a clean, modern look.

---

## 🛠️ Technologies & Concepts Used

- **React (Functional Components & Hooks)**
- **Custom Hooks** (`useMovies`, `useLocalStorageState`, `useKey`)
- **Component Composition**
- **API Fetching & Error Handling**
- **Local Storage Persistence**
- **PropTypes for Type Checking**
- **CSS Styling**

---

## 📦 Project Structure

```
src/
  Components/
    MovieDetails/
    Movies/
    NavBar/
    StarRating/
    UI/
    Watched/
  Hooks/
  App.js
  Main.js
  index.js
  index.css
```

---

## 💡 Example: Custom Hook for Fetching Movies

```js
// useMovies.js
import { useEffect, useState } from "react";

const KEY = "628dda5";

export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
        if (!res.ok)
          throw new Error("Something went wrong with fetching the movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setIsLoading(false);
      }
      if (!query.length) {
        setMovies([]);
        setError("");
        return;
      }
    };
    fetchMovies();
    return () => controller.abort();
  }, [query]);

  return { movies, error, isLoading };
};
```

---

## 💡 Example: Star Rating Component

```js
// StarRating.js
export default function StarRating({ maxRating = 5, color = "#fcc419", ... }) {
  // ...state and handlers...
  return (
    <div>
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          full={hoverRating ? hoverRating >= i + 1 : rating >= i + 1}
          // ...
        />
      ))}
      {/* ... */}
    </div>
  );
}
```

---

## 📷 Screenshots

> _Add screenshots here to showcase the UI!_

---

## 📝 Getting Started

1. **Install dependencies:**
   ```sh
   npm install
   ```
2. **Start the development server:**
   ```sh
   npm start
   ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📚 What I Learned

- Building reusable and composable React components
- Managing state with hooks and custom hooks
- Handling asynchronous API calls and errors
- Persisting data with local storage
- Improving UX with keyboard shortcuts and responsive design

---

## 🌟 Inspiration

This project was inspired by the [usePopcorn course project](https://www.udemy.com/course/the-ultimate-react-course/) and adapted to demonstrate my own understanding and skills.

---

## 📄 License
