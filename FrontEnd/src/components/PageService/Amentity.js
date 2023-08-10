import React from "react";
import style from "../../sass/components/service.module.scss";
import Image from "../Utility/Image";

const Amentity = (props) => {
  const data = props.amentity.icon.bytes;
  return (
    <div className={style.bonus}>
      <div className={style.amentity_container}>
        <Image data={data} className={style.amentity}></Image>
      </div>
      {/* <ion-icon name="wifi-outline" class={style.bonus__icon} /> */}
      <p className={style.bonus__text}>{props.amentity.name}</p>
    </div>
  );
};

export default Amentity;
