import modal from "../../sass/components/modal.module.scss";

const ServiceSelected = (props) => {
  // functionality for removing selected service

  return (
    <div className={modal.item}>
      <p className={modal.item__name}>{props.service.name}</p>
      <div className={modal.item__cost_container}>
        <p className={modal.item__cost}>{props.service.price} zł</p>
        <button
          className={modal.modal__button_close}
          onClick={() => props.onDeleteSelectedService(props.service)}
        >
          <ion-icon name="close-outline" class={modal.modal__icon}></ion-icon>
        </button>
      </div>
    </div>
  );
};

export default ServiceSelected;
