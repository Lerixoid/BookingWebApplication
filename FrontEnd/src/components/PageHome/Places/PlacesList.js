import Place from "./Place";
import React, { useState, useEffect } from "react";

const PlacesList = (props) => {
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <div>
      {matches && (
        <div className="grid--small-gap grid--5-cols">
          {props.items.map((place) => (
            <Place name={place.name} source={place.source} key={place.id} />
          ))}
        </div>
      )}
      {!matches && (
        <>
          <div className="places_blocks grid--small-gap grid--2-cols">
            {props.items.slice(0, 4).map((place) => (
              <Place name={place.name} source={place.source} />
            ))}
          </div>
          <button class="mob_load_places">Load more</button>
        </>
      )}
    </div>
  );
};

export default PlacesList;
