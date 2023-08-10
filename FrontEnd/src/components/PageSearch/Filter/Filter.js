const Filter = ({ onChange }) => {
  const filters = [
    { value: ["$", "$$", "$$$"], name: "Price" },
    { value: ["5 stars", "4 stars", "3 and less"], name: "Rating" },
    {
      value: [
        "Warszawa",
        "Kraków ",
        "Łódż",
        " Wrocław",
        "Poznań",
        "Gdańsk",
        "Szczecin",
        "Lublin",
        "Katowice",
        "Gdynia",
      ],
      name: "City",
    },
  ];

  return (
    <div className="filter">
      <h3 className="filter__title">Filter</h3>
      <form>
        {filters.map((filter) => {
          return (
            <div className="filter__category_price">
              <p className="filter__category-title">{filter.name}</p>
              {filter.value.map((filterValue) => {
                return (
                  <div className="checkbox">
                    <input
                      onChange={onChange}
                      id="checkbox__input--home"
                      className="checkbox__input"
                      type="checkbox"
                      value={filterValue}
                    ></input>

                    <label
                      for="checkbox__input--home"
                      className="checkbox__label"
                    >
                      {filterValue}
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </form>
    </div>
  );
};

export default Filter;
