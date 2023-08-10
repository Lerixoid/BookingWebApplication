import modal from "../../sass/components/modal.module.scss";

import ServiceSelected from "./ServiceSelected";

const ServicesSelected = (props) => {
  return (
    <div>
      <h3 className={` ${modal.modal__title}  ${modal.modal__title_secondary}`}>
        Selected services
      </h3>

      {props.services.map((service) => (
        <ServiceSelected
          service={service}
          onDeleteSelectedService={props.onDeleteSelectedService}
        />
      ))}

      <div>
        <button
          className={modal.modal__button_add_service}
          onClick={props.onOpen}
        >
          <ion-icon
            name="add-outline"
            class={modal.button_add_service__icon}
          ></ion-icon>
          <p className={modal.button_add_service__text}>Add service</p>
        </button>
      </div>
    </div>
  );
};

export default ServicesSelected;
