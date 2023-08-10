import modal from "../../sass/components/modal.module.scss";

import Service from "./Service";

const ModalService = (props) => {
  if (!props.open) {
    return null;
  }

  let component = null;

  if (!props.services.length) {
    component = (
      <div className={modal.service}>
        <button className={modal.service__button_close} onClick={props.onClose}>
          <ion-icon name="close-outline" class={modal.service__icon}></ion-icon>
        </button>
        <p className={modal.service__empty}>All services selected!</p>
      </div>
    );
  } else {
    component = (
      <div className={modal.service}>
        <button className={modal.service__button_close} onClick={props.onClose}>
          <ion-icon name="close-outline" class={modal.service__icon}></ion-icon>
        </button>
        {props.services.map((service) => (
          <Service
            key={service.appointmentTypeID}
            service={service}
            onAddService={props.onAddService}
          />
        ))}
      </div>
    );
  }

  return component;
};

export default ModalService;
