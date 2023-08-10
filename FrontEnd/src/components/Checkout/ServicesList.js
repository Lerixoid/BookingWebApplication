import React from "react";
import Service from "./Service";
import Image from "../Utility/Image";
import { useState, useRef } from "react";

import "../../sass/components/checkout.scss";

const ServicesList = ({ services, salon, request }) => {
  const [open, setOpen] = useState(false);
  const [servicesList, setServicesList] = useState(services);
  const [note, setNote] = useState("");
  const inputRef = useRef();

  const AddNote = (event) => {
    event.preventDefault();
    setNote(inputRef.current.value);
    request(inputRef.current.value);
  };

  return (
    <div className="service_list">
      <h1 className="service_list__maintitle">Checkout</h1>

      <div className="salon">
        <h1 className="salon__title">{salon.name}</h1>
        <div className="salon_container">
          <Image
            data={salon.salonPicture.bytes}
            className="salon_container__image"
          />
          <div className="services">
            <p className="services__subtitle">List of services:</p>

            {servicesList.map((service) => {
              return <Service service={service} />;
            })}
          </div>
        </div>
      </div>

      <div className="additional">
        <div class="note-title">
          <p className="note-title__link">Leave a note for salon</p>
        </div>

        <form className="note" onSubmit={AddNote}>
          <textarea
            className="note__input"
            type=""
            placeholder=""
            rows="5"
            ref={inputRef}
          ></textarea>
          <button className="note__button" type="submit">
            Add Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default ServicesList;
