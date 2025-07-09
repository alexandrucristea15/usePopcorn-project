import { useRef } from "react";
import { useKey } from "../../Hooks/useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  const enterSearchCallback = () => {
    if (inputEl.current === document.activeElement) return;
    inputEl.current.focus();
    setQuery("");
  };

  useKey("Enter", enterSearchCallback);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
};

export default Search;
