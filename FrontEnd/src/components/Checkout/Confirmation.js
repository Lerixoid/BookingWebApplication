import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../../sass/components/confirmation.scss";

const Confirmation = () => {
  const serviceData = useLocation();

  const navigate = useNavigate();

  const toMainPage = (user) => {
    navigate("/");
  };

  return (
    <div className="confirmation">
      <div className="confirmation__container">
        <p className="confirmation__container__fullname">
          Thank you {serviceData.state.user} for booking appointment
        </p>
        <p className="confirmation__container__message">
          You will get confirmation message from salon as soon as possible
        </p>

        <img
          src={`${process.env.PUBLIC_URL}/confirm.png`}
          className="confirmation__container__image"
          alt="confirmation"
        />
        <button
          className="confirmation__container__button"
          onClick={toMainPage}
        >
          Main Page
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
