import { useEffect, useState } from "react";

const Search = ({ request, initialSearch }) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (initialSearch !== null && initialSearch.length !== 0) {
      setSearch(initialSearch);
      request(initialSearch);
    }
  }, [initialSearch]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onHandleSubmit = (event) => {
    //prevent form from making a http request
    event.preventDefault();
    request(search);
  };
  return (
    <div className="search">
      <form onSubmit={onHandleSubmit} className="search__form">
        <input
          type="text"
          placeholder="What do you want to find?"
          className="search__input"
          defaultValue={initialSearch}
          //value = {search}
          onChange={handleChange}
        />

        <button type="submit" className="search__button">
          Search
        </button>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="search__icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
      </form>
    </div>
  );
};

export default Search;
