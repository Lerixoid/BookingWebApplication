import React, { useState, useEffect } from "react";
import style from "../../sass/components/service.module.scss";

const Facility = ({ facility, request }) => {
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [promotion, setPromotion] = useState([]);

  const onFacilityClick = (event) => {
    request(facility);
  };

  useEffect(() => {
    if (facility.promotion !== null && facility.promotion !== undefined) {
      let value =
        facility.price -
        (facility.promotion.discountInPercent * facility.price) / 100;
      setPromotion(facility.promotion);
      setPromotionPrice(value);
    }
  }, []);

  return (
    <div className={style.facility}>
      <p className={style.facility__title}>{facility.name}</p>
      <div className={style.facility__box}>
        {promotion.length !== 0 && (
          <>
            <p className={style.facility__cost}>
              <s>{facility.price} zł</s>
            </p>
            <p className={style.facility__cost}>{promotionPrice} zł</p>
          </>
        )}
        {promotion.length === 0 && (
          <>
            <p className={style.facility__cost}>{facility.price} zł</p>
          </>
        )}

        <button className={style.facility__button} onClick={onFacilityClick}>
          Book
        </button>
      </div>
    </div>
  );
};

export default Facility;
