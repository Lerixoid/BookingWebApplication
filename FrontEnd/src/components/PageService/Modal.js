import Calendar from "react-calendar";
import { useState, useEffect } from "react";
import ModalService from "./ModalService";
import ServicesSelected from "./ServicesSelected";
import { useOutletContext, useParams, useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TimeSlider from "../../pages/TimeSlider";
import modal from "../../sass/components/modal.module.scss";
import "react-calendar/dist/Calendar.css";
import { render } from "@testing-library/react";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

let totalPrice = 0;

const Modal = ({ services, salon, initialService, ...props }) => {
  const navigate = useNavigate();

  const [servicesList, setServicesList] = useState(services);
  const [date, setDate] = useState(new Date());
  const [servicesSelected, setServices] = useState([]);
  const [price, setPerice] = useState([]);
  const [requestedTime, setRequestedTime] = useState("");

  const toCheckout = () => {
    if (servicesSelected === null || servicesSelected.length === 0) {
      alert("You need to choose services before checkout");
    } else if (requestedTime === null || requestedTime.length === 0) {
      alert("You need to choose time of appointment before checkout");
    } else {
      navigate("/checkout", {
        state: {
          services: servicesSelected,
          salon: salon,
          date: chosenDate,
        },
      });
    }
  };

  const requestTime = (request) => {
    setRequestedTime(request);
  };
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  let todayDate = new Date(Date.now());

  let chosenDate = new Date();
  chosenDate.setMonth(month - 1);
  chosenDate.setFullYear(year);
  chosenDate.setDate(day);
  chosenDate.setHours(requestedTime?.toString().slice(0, 2), 0, 0);

  let timeDate = {
    time: [
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
    ],
  };

  const dateChange = (event) => {
    setDate(event.target.value);
  };

  const addServiceHandle = (service) => {
    if (!servicesSelected.includes(service)) {
      const arr = [service];

      if (service.promotion !== null) {
        let promotionPrice =
          service.price -
          (service.promotion.discountInPercent * service.price) / 100;
        totalPrice += promotionPrice;
      } else {
        totalPrice += service.price;
      }
      //
      const id = servicesList.findIndex(
        (o) => o.appointmentTypeID === service.appointmentTypeID
      );
      servicesList.splice(id, 1);

      setServices([...servicesSelected, ...arr]);
    }
  };

  if (!props.open) {
    return null;
  }

  const deleteSelectedServiceHandle = (service) => {
    const id = servicesSelected.findIndex(
      (o) => o.appointmentTypeID === service.appointmentTypeID
    );

    if (id > -1) {
      const arr = servicesSelected;

      arr.splice(id, 1);

      totalPrice -= service.price;

      servicesList.push(service);

      setServices([...arr]);
    }
  };

  return (
    <div className={modal.overlay} onClick={props.onClose}>
      <div
        className={modal.modal_container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={modal.modal}>
          <button className={modal.modal__button_close} onClick={props.onClose}>
            <ion-icon name="close-outline" class={modal.modal__icon}></ion-icon>
          </button>

          <h2 className={`${modal.modal__title} ${modal.modal__title_primary}`}>
            Booking options
          </h2>

          <h3 className={modal.modal__date}>{currentDate}</h3>

          <Calendar
            onChange={setDate}
            value={date}
            className={modal.modal__calendar}
            minDate={todayDate}
          />

          <TimeSlider time={timeDate.time} request={requestTime} />

          <ServicesSelected
            onOpen={() => props.setOpenServices(true)}
            services={servicesSelected}
            onDeleteSelectedService={deleteSelectedServiceHandle}
          />

          <p className={modal.modal__cost}>
            Total price:{" "}
            <b className={modal.modal__cost_value}>{totalPrice} zł</b>
          </p>

          <button
            className={modal.modal__button_book}
            onClick={() => {
              toCheckout();
            }}
          >
            Submit
          </button>
        </div>

        <ModalService
          open={props.openServices}
          services={services}
          onClose={() => props.setOpenServices(false)}
          onAddService={addServiceHandle}
        ></ModalService>
      </div>
    </div>
  );
};

export default Modal;
