import { useState } from "react";
import PlacesTitle from "./PlacesTitle";
import PlacesList from "./PlacesList";

const PLACES_DUMMY = [
  { id: 0, name: "Warszawa", source: `${process.env.PUBLIC_URL}/warsaw.jpg` },
  { id: 1, name: "Kraków", source: `${process.env.PUBLIC_URL}/krakow.jpg` },
  { id: 2, name: "Łódź", source: `${process.env.PUBLIC_URL}/lodz.jpg` },
  { id: 3, name: "Wrocław", source: `${process.env.PUBLIC_URL}/wroclaw.jpg` },
  { id: 4, name: "Poznań", source: `${process.env.PUBLIC_URL}/poznan.jpg` },
  { id: 5, name: "Gdańsk", source: `${process.env.PUBLIC_URL}/gdansk.jpg` },
  { id: 6, name: "Szczecin", source: `${process.env.PUBLIC_URL}/szczecin.jpg` },
  { id: 7, name: "Lublin", source: `${process.env.PUBLIC_URL}/lublin.jpg` },
  { id: 8, name: "Katowice", source: `${process.env.PUBLIC_URL}/katowice.jpg` },
  { id: 9, name: "Gdynia", source: `${process.env.PUBLIC_URL}/gdynia.jpg` },
];

const Places = () => {
  const [places, setPlaces] = useState(PLACES_DUMMY);

  return (
    <section className="places margin-bottom-big">
      <div>
        <PlacesTitle />
        <PlacesList items={places} />
      </div>
    </section>
  );
};

export default Places;
