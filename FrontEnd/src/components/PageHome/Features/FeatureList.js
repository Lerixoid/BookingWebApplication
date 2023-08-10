import Feature from "./Feature";
import React, { useState, useEffect } from "react";

const FeatureList = (props) => {
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
        <div className="features__container grid grid--4-cols">
          {props.items.map((feature) => (
            <Feature
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
              key={feature.id}
            />
          ))}
        </div>
      )}
      {!matches && (
        <div className="features__container grid grid--2-cols">
          {props.items.map((feature) => (
            <Feature
              iconName={feature.iconName}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureList;
