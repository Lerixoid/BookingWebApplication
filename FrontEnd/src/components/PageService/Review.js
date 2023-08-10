import React from "react";
import "../../sass/components/review.scss";

const Review = (props) => {
  function getDateReview(time) {
    var date = new Date(Date.parse(time));

    return date.toDateString();
  }

  return (
    <>
      <div className="review">
        <div className="profile">
          <ion-icon
            name="person-circle-outline"
            class="profile__icon"
          ></ion-icon>
          <p className="profile__name">{props.review.user.name}</p>
        </div>
        <div className="comment">
          <p className="comment__date">
            {getDateReview(props.review.postedTimestamp)}
          </p>
          <p className="comment__text">{props.review.comment}</p>
        </div>
        <div className="rate">
          <ion-icon name="star-outline" class="rate__icon"></ion-icon>
          <p className="rate__value">{props.review.rating}</p>
        </div>
      </div>
    </>
  );
};

export default Review;
