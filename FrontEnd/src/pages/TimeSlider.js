import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../sass/base/slider.scss";
import React from "react";
import modal from "../sass/components/modal.module.scss";

const TimeSlider = ({ time, request }) => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
  };
  const CustomRightArrow = ({ onClick }) => {
    // onMove means if dragging or swiping in progress.
    return (
      <a onClick={() => onClick()}>
        <ion-icon
          name="chevron-forward-outline"
          class={modal.radio__icon}
        ></ion-icon>
      </a>
    );
  };

  const getTime = (event) => {
    request(event.target.value);
  };

  <Carousel customRightArrow={<CustomRightArrow />} />;

  return (
    <div className={modal.radio__cont}>
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={true} // means to render carousel on server-side.
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        itemClass="carousel-item-padding-10-px"
      >
        {time.map((time) => {
          return (
            <div>
              <input
                type="radio"
                name="radio_time"
                id={`radio_time-${time}`}
                className={modal.modal__radio}
                value={time}
                onClick={getTime}
              />
              <label for={`radio_time-${time}`} className={modal.modal__label}>
                {time}
              </label>
            </div>
          );
        })}
      </Carousel>
      ;
    </div>
  );
};

export default TimeSlider;
