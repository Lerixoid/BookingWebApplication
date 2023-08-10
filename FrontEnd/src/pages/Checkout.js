import React from "react";
import Summary from "../components/Checkout/Summary";
import ServicesList from "../components/Checkout/ServicesList";
import { useLocation } from "react-router-dom";
import { useState } from "react";

import "../sass/components/checkout.scss";

const Checkout = () => {
  const [note, setNote] = useState("");

  const requestNote = (request) => {
    setNote(request);
  };

  const serviceData = useLocation();

  return (
    <div className="checkout_container">
      <ServicesList
        services={serviceData.state.services}
        salon={serviceData.state.salon}
        request={requestNote}
      />
      <Summary
        services={serviceData.state.services}
        note={note}
        date={serviceData.state.date}
      />
    </div>
  );
};

export default Checkout;
