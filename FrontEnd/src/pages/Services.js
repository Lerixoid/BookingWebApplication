import Search from "../components/PageSearch/Search/Search";
import Categories from "../components/PageSearch/Categories/Categories";
import FilterButton from "../components/PageSearch/Search/FilterButton";
import Filter from "../components/PageSearch/Filter/Filter";
import ServicesFiltered from "../components/PageSearch/Filter/ServicesFiltered";

import { useEffect, useMemo, useState, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPrivate from "../components/hooks/useAxiosPrivate";

import "../sass/components/categories.scss";
import "../sass/components/search.scss";
import "../sass/components/filterButton.scss";
import "../sass/components/filter.scss";
import style from "../sass/components/services.module.scss";

const Services = (props) => {
  //itinialization
  const [searchParameter, setSearchParameter] = useState([]);
  const [categoryParameter, setCategoryParameter] = useState("");
  const [cityParameter, setCityParameter] = useState("");

  const [salons, setSalons] = useState([]);
  const [salonsByType, setSalonsByType] = useState([]);
  const [salonsFiltered, setSalonsFiltered] = useState([]);

  const [selectedSort, setSelectedSort] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("");
  const [selectedFilterType, setSelectedFilterType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const serviceData = useLocation();
  const axiosPrivate = useAxiosPrivate();

  const cities = [
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
  ];

  const [state, setState] = useState({
    filters: new Set(),
    salonsFiltered: salons,
  });

  const sortSalons = (sort) => {
    setSelectedSort(sort);

    if (sort === "name") {
      setSalonsByType(
        [...salons].sort((a, b) => a[sort].localeCompare(b[sort]))
      );
    }
    if (sort === "averageRating") {
      setSalonsByType([...salons].sort((a, b) => a[sort] - b[sort]));
    }
  };

  const CallBackFilter = useCallback(
    (event) => {
      setState((previousState) => {
        let filters = new Set(previousState.filters);
        let salonsFiltered = salonsByType;

        if (event.target.checked) {
          filters.add(event.target.value);
        } else {
          filters.delete(event.target.value);
        }

        return {
          filters,
          salonsFiltered,
        };
      });
    },
    [setState]
  );

  useEffect(() => {
    if (state.filters.size !== 0) {
      let temp = [];

      if (
        state.filters.has("$") ||
        state.filters.has("$$") ||
        state.filters.has("$$$")
      ) {
        state.filters.forEach((filter) => {
          switch (filter) {
            case "$":
              salons
                .filter(
                  (salon) =>
                    salon.averageCheck >= 50 && salon.averageCheck < 200
                )
                .map((salon) => temp.push(salon));
              break;

            case "$$":
              salons
                .filter(
                  (salon) =>
                    salon.averageCheck >= 200 && salon.averageCheck < 400
                )
                .map((salon) => temp.push(salon));
              break;

            case "$$$":
              salons
                .filter(
                  (salon) =>
                    salon.averageCheck >= 200 && salon.averageCheck > 400
                )
                .map((salon) => temp.push(salon));
              break;
          }
        });
      }

      cities.map((city) => {
        if (state.filters.has(city)) {
          salons
            .filter((salon) => salon.address.city.includes(city))
            .map((salon) => temp.push(salon));
        }
      });

      if (
        state.filters.has("5 stars") ||
        state.filters.has("4 stars") ||
        state.filters.has("3 and less")
      ) {
        state.filters.forEach((filter) => {
          switch (filter) {
            case "5 stars":
              salons
                .filter((salon) => salon.averageRating == 5)
                .map((salon) => temp.push(salon));
              break;

            case "4 stars":
              salons
                .filter(
                  (salon) => salon.averageRating >= 4 && salon.averageRating < 5
                )
                .map((salon) => temp.push(salon));
              break;

            case "3 and less":
              salons
                .filter((salon) => salon.averageRating < 4)
                .map((salon) => temp.push(salon));
              break;
          }
        });
      }

      setSalonsByType([]);
      setSalonsByType(temp);
    }
  }, [state]);

  useEffect(() => {
    if (searchParameter !== null) {
    }
  }, [searchParameter]);

  const filterByTypeSalons = (filterType) => {
    if (filterType !== "All") {
      setSelectedFilterType(filterType);
      setSalonsByType(
        salons.filter((salon) => filterType.includes(salon.salonType))
      );
    } else {
      setSalonsByType(salons);
    }
  };

  const filterByCitySalons = (filterType) => {
    setSalonsByType(
      salons.filter((salon) => filterType.includes(salon.address.city))
    );
  };

  const requestSearchQuery = (request) => {
    setSearchQuery(request);
  };

  const sortedAndSearchedPosts = useMemo(() => {
    if (searchQuery !== null) {
      return salonsByType.filter((salon) =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      return salonsByType;
    }
  }, [searchQuery, salons, salonsByType]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    let isMounted = true;
    const controller = new AbortController();

    const fetchPost = async () => {
      try {
        const response = await axiosPrivate.get("/api/Salons", {
          signal: controller.signal,
        });
        
        const data = await response.data;
        console.log(data);
        isMounted && setSalons(data);
        isMounted && setSalonsByType(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();

    if (serviceData.state !== null) {
      if (
        serviceData.state.search !== null &&
        serviceData.state.search !== undefined
      ) {
        setSearchParameter(serviceData.state.search);
      }
      if (serviceData.state.category !== null) {
        setCategoryParameter(serviceData.state.category);
      }
      if (serviceData.state.city !== null) {
        setCityParameter(serviceData.state.city);
      }
    }
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);
  useEffect(() => {
    if (
      categoryParameter !== undefined &&
      categoryParameter !== null &&
      categoryParameter.length !== 0
    ) {
      filterByTypeSalons(categoryParameter);
    }
  }, [categoryParameter, salons]);

  useEffect(() => {
    if (
      cityParameter !== undefined &&
      cityParameter !== null &&
      cityParameter.length !== 0
    ) {
      filterByCitySalons(cityParameter);
    }
  }, [cityParameter, salons]);

  return (
    <main className="main-services margin-top-big margin-bottom-big">
      <Categories onClick={filterByTypeSalons} />

      <div className="search__container">
        <Search request={requestSearchQuery} initialSearch={searchParameter} />

        <FilterButton
          value={selectedSort}
          onChange={sortSalons}
          defaultValue="Sort By"
          options={[
            { value: "name", name: "Name" },
            { value: "averageRating", name: "Rating" },
          ]}
        />
      </div>

      <div className={style.filtered_container}>
        <Filter onChange={CallBackFilter} />

        {salons.length !== 0 ? (
          <ServicesFiltered salons={sortedAndSearchedPosts} />
        ) : (
          <img
            src={`${process.env.PUBLIC_URL}/loading.gif`}
            alt="loading animation"
            className={style.loading_img}
          ></img>
        )}
      </div>
    </main>
  );
};

export default Services;
