import { useNavigate } from "react-router-dom";

import style from "../../../sass/components/services.module.scss";
import Image from "../../Utility/Image";
const Service = (props) => {
  const navigate = useNavigate();
  const toService = () => {
    navigate("/service/" + props.service.salonID, { state: props.service });
  };
  return (
    <a
      onClick={() => {
        toService();
      }}
    >
      <div className={style.service}>
        <Image
          data={props.service.salonPicture.bytes}
          className={style.service__img}
        />
        <div className={style.service__info}>
          <div>
            <p className={style.service__title}>{props.service.name}</p>
            <p className={style.service__address}>
              {props.service.address.city},{props.service.address.street}{" "}
              {props.service.address.houseNumber},{" "}
              {props.service.address.postalCode}
            </p>
            <p className={style.service__address}>{props.service.salonType}</p>
          </div>
          <div className={style.service__rate}>
            <ion-icon
              name="star-outline"
              class={style.service__icon}
            ></ion-icon>
            <p className={style.service__value}>
              {props.service.averageRating.toString().slice(0, 3)}
            </p>
          </div>
        </div>
      </div>
    </a>
    // </Link>
  );
};

export default Service;
