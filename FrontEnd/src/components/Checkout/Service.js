import React, { useState, useEffect } from "react";

const Service = (props) => {
  const [promotionPrice, setPromotionPrice] = useState(0);
  const [promotion, setPromotion] = useState([]);

  useEffect(() => {
    if (
      props.service.promotion !== null &&
      props.service.promotion !== undefined
    ) {
      let value =
        props.service.price -
        (props.service.promotion.discountInPercent * props.service.price) / 100;
      setPromotion(props.service.promotion);
      setPromotionPrice(value);
    }
  }, []);

  return (
    <div class="service">
      <p>{props.service.name} </p>

      {promotion.length !== 0 && (
        <>
          <p>
            <s>{props.service.price} zł</s>
          </p>
          <p>{promotionPrice} zł</p>
        </>
      )}
      {promotion.length === 0 && (
        <>
          <p>{props.service.price} zł</p>
        </>
      )}

      <p>{props.service.lengthMinutes}min </p>
    </div>
  );
};

export default Service;
