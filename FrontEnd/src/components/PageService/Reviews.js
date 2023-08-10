// rate, comment, date
import { useActionData } from "react-router-dom";
import "../../sass/components/review.scss";
import { useState, useEffect } from "react";

import Review from "./Review";

const Reviews = (props) => {
  const [property, setProperty] = useState("");

  useEffect(() => {
    setProperty(props.item);
  }, [props]);

  return (
    <>
      <div className="reviews">
        <h3 className="reviews__title">Reviews</h3>
        <div className="reviews__container margin-bottom-big">
          {props.item.reviews.map((review) => {
            return <Review key={review.reviewID} review={review} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Reviews;
