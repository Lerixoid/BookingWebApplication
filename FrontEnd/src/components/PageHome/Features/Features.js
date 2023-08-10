import { useState, useEffect } from "react";
import FeatureList from "./FeatureList";
import ButtonArrowLeftIcon from "./ButtonArrowLeftIcon";
import ButtonArrowRightIcon from "./ButtonArrowRightIcon";
import FeatureTitle from "./FeatureTitle";

const FEATURES_DUMMY = [
  {
    id: 0,
    iconName: "bed-outline",
    title: "Hotels",
    description:
      "Make your stay in any of  city comfortable and get the best experience !",
  },

  {
    id: 1,
    iconName: "restaurant-outline",
    title: "Restaurants",
    description:
      "Book table easily in every restaurant or cafe located near to you",
  },

  {
    id: 2,
    iconName: "cut-outline",
    title: "Salons",
    description:
      "Have you always dreamed of a perfect haircut or an original and unusual color? We are happy to help you with this!",
  },

  {
    id: 3,
    iconName: "heart-outline",
    title: "Hospitals",
    description:
      "If you don't want to stand in line at the hospital to see a doctor, we will help you to save time",
  },

  {
    id: 4,
    iconName: "barbell-outline",
    title: "Fitness",
    description:
      "Have you wanted to start playing sports for a long time, but you never got around to it? It's time to start right now",
  },

  {
    id: 5,
    iconName: "build-outline",
    title: "Tech masters",
    description:
      "Looking for a good service master, but do not know who to turn to-" +
      "we are always happy to help you in this difficult matter",
  },

  {
    id: 6,
    iconName: "language-outline",
    title: "Lectures",
    description:
      "We are always happy to help you find language courses that are ideal for your level of language proficiency.",
  },

  {
    id: 7,
    iconName: "earth-outline",
    title: "Travels",
    description:
      "Do you want to quickly book an excursion or tour - we will be happy to help you with this",
  },
];

const featuresSelected = [
  FEATURES_DUMMY[0],
  FEATURES_DUMMY[1],
  FEATURES_DUMMY[2],
  FEATURES_DUMMY[3],
];

const featuresList1 = [
  FEATURES_DUMMY[0],
  FEATURES_DUMMY[1],
  FEATURES_DUMMY[2],
  FEATURES_DUMMY[3],
];

const featuresList2 = [
  FEATURES_DUMMY[4],
  FEATURES_DUMMY[5],
  FEATURES_DUMMY[6],
  FEATURES_DUMMY[7],
];
const mobFeaturesSelected = [FEATURES_DUMMY[0], FEATURES_DUMMY[1]];
const mobFeaturesList1 = [FEATURES_DUMMY[0], FEATURES_DUMMY[1]];
const mobFeaturesList2 = [FEATURES_DUMMY[2], FEATURES_DUMMY[3]];
const mobFeaturesList3 = [FEATURES_DUMMY[4], FEATURES_DUMMY[5]];
const mobFeaturesList4 = [FEATURES_DUMMY[6], FEATURES_DUMMY[7]];

const featuresList = [featuresList1, featuresList2];
let nrList = 1;

const mobFeaturesList = [
  mobFeaturesList1,
  mobFeaturesList2,
  mobFeaturesList3,
  mobFeaturesList4,
];
let mobNrList = 1;

const Features = (props) => {
  const [features, setFeaturesSelected] = useState(featuresSelected);
  const [mobFeatures, setMobFeaturesSelected] = useState(mobFeaturesSelected);
  const [matches, setMatches] = useState(
    window.matchMedia("(min-width: 768px)").matches
  );
  useEffect(() => {
    window
      .matchMedia("(min-width: 768px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  const clickHandleForward = () => {
    if (nrList === 1) {
      setFeaturesSelected(featuresList[1]);
      nrList = 2;
      document
        .getElementById("slider-selector-1")
        .classList.remove("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.add("selectors__dot--selected");
    } else if (nrList === 2) {
      setFeaturesSelected(featuresList[0]);
      nrList = 1;
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
    }
  };

  const clickHandleBack = () => {
    if (nrList === 1) {
      setFeaturesSelected(featuresList[1]);
      nrList = 2;
      document
        .getElementById("slider-selector-1")
        .classList.remove("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.add("selectors__dot--selected");
    } else if (nrList === 2) {
      setFeaturesSelected(featuresList[0]);
      nrList = 1;
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
    }
  };

  const clickDotHandle = (event) => {
    const el = event.currentTarget.id;
    if (el === "slider-selector-1" && nrList === 1) {
      event.preventDefault();
    } else if (el === "slider-selector-2" && nrList === 1) {
      setFeaturesSelected(featuresList[1]);
      nrList = 2;
      document
        .getElementById("slider-selector-1")
        .classList.remove("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.add("selectors__dot--selected");
    } else if (el === "slider-selector-1" && nrList === 2) {
      setFeaturesSelected(featuresList[0]);
      nrList = 1;
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
    } else if (el === "slider-selector-2" && nrList === 2) {
      event.preventDefault();
    }
  };

  const mobClickHandleForward = () => {
    if (mobNrList === 1) {
      setMobFeaturesSelected(mobFeaturesList[1]);
      mobNrList = 2;
      document
        .getElementById("slider-selector-1")
        .classList.remove("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.add("selectors__dot--selected");
    } else if (mobNrList === 2) {
      setMobFeaturesSelected(mobFeaturesList[2]);
      mobNrList = 3;
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
    } else if (mobNrList === 3) {
      setMobFeaturesSelected(mobFeaturesList[3]);
      mobNrList = 4;
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
    } else if (mobNrList === 4) {
      setMobFeaturesSelected(mobFeaturesList[0]);
      mobNrList = 1;
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
    }
  };

  const mobClickHandleBack = () => {
    if (mobNrList === 4) {
      setMobFeaturesSelected(mobFeaturesList[3]);
      mobNrList = 3;
      document
        .getElementById("slider-selector-1")
        .classList.remove("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.add("selectors__dot--selected");
    } else if (mobNrList === 3) {
      setMobFeaturesSelected(mobFeaturesList[2]);
      mobNrList = 2;
      document
        .getElementById("slider-selector-1")
        .classList.remove("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.add("selectors__dot--selected");
    } else if (mobNrList === 2) {
      setMobFeaturesSelected(mobFeaturesList[1]);
      mobNrList = 1;
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
    } else if (mobNrList === 1) {
      setMobFeaturesSelected(mobFeaturesList[0]);
      mobNrList = 4;
      document
        .getElementById("slider-selector-1")
        .classList.add("selectors__dot--selected");
      document
        .getElementById("slider-selector-2")
        .classList.remove("selectors__dot--selected");
    }
  };

  return (
    <section className="features margin-bottom-big">
      {matches && (
        <div className="features-container">
          <FeatureTitle />

          <div className="features__box">
            <ButtonArrowLeftIcon onClickIcon={clickHandleBack} />

            <FeatureList items={features} id="features" />

            <ButtonArrowRightIcon onClickIcon={clickHandleForward} />
          </div>

          <div className="selectors">
            <button
              className="selectors__dot selectors__dot--1 selectors__dot--selected"
              id="slider-selector-1"
              onClick={clickDotHandle}
            ></button>
            <button
              className="selectors__dot selectors__dot--2"
              id="slider-selector-2"
              onClick={clickDotHandle}
            ></button>
          </div>
        </div>
      )}

      {!matches && (
        <div className="features-container">
          <FeatureTitle />

          <div className="features__box">
            <ButtonArrowLeftIcon onClickIcon={mobClickHandleBack} />

            <FeatureList items={mobFeatures} id="features" />

            <ButtonArrowRightIcon onClickIcon={mobClickHandleForward} />
          </div>
        </div>
      )}
    </section>
  );
};

export default Features;
