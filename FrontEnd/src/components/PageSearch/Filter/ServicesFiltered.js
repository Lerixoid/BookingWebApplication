import React, { useState, useEffect } from "react";

import style from "../../../sass/components/services.module.scss";
import FetchedServices from "./FetchedServices";

const ServicesFiltered = (props) => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 900px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 900px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  return (
    <div>
      {matches && (
        <div className={`grid--medium-gap grid--5-cols ${style.services}`}>
          <FetchedServices salons={props.salons} />
        </div>
      )}
      {!matches && (
        <div className={`grid--medium-gap grid--2-cols ${style.services}`}>
          <FetchedServices salons={props.salons} />
        </div>
      )}
    </div>
  );
};

export default ServicesFiltered;
