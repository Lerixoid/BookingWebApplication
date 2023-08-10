import { useNavigate } from "react-router-dom";
import { useState } from "react";
const HeroSearch = ({ request }) => {
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const toServices = () => {
    navigate("/services", {
      state: { search: search },
    });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // const onHandleSubmit = (event) => {
  //   //prevent form from making a http request
  //   event.preventDefault();
  //   request(search);
  // };

  return (
    <div className="hero__search">
      <div className="hero__container">
        <form
          onSubmit={() => {
            toServices();
          }}
          className="hero__form"
        >
          <input
            type="text"
            placeholder="What do you want to find?"
            className="hero__input"
            value={search}
            onChange={handleChange}
          />
          <button className="hero__button">Search</button>
        </form>
        {/* <Link to="services" className="hero__button">
          Search
        </Link> */}
        <ion-icon name="search-outline" class="hero__icon"></ion-icon>
      </div>
    </div>
  );
};

export default HeroSearch;
