import modal from "../../sass/components/modal.module.scss";
import React, { useCallback, useState, useEffect } from "react";

const Service = (props) => {
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [promotion, setPromotion] = useState([]);

  useEffect(() => {
    if (
      (props.service.promotion !== null) &
      (props.service.promotion !== undefined)
    ) {
      let value =
        props.service.price -
        (props.service.promotion.discountInPercent * props.service.price) / 100;
      setPromotion(props.service.promotion);
      setPromotionPrice(value);
    }
  }, []);

  return (
    <button
      className={modal.service__item}
      onClick={() => props.onAddService(props.service)}
    >
      <p className={modal.service__title}>{props.service.name}</p>
      {promotion.length !== 0 && (
        <>
          <p className={modal.service__cost}>
            <s>{props.service.price} zł</s>
          </p>
          <p className={modal.service__cost}>{promotionPrice} zł</p>
        </>
      )}
      {promotion.length == 0 && (
        <>
          <p className={modal.service__cost}>{props.service.price} zł</p>
        </>
      )}
    </button>
  );
};

export default Service;
