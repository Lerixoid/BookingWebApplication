import React from "react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import useAuth from "../hooks/useAuth";

import globalUrls from "../Utility/Urls";

import "../../sass/components/checkout.scss";

const Summary = ({ services, note, date }) => {
  const { auth } = useAuth();

  const [userFullname, setUserFullname] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const navigate = useNavigate();

  const toConfirmation = (user) => {
    navigate("/checkout/confirmation", { state: { user: user } });
  };

  const options = {
    "client-id":
      "ASFTn3LxmSWsYAiZQsryH2w-KQuTRk2GFQM8xkaRFiNVJRMcRfm8lokjKfUkuHQUDZkadtpUpUl_L4qE",
    currency: "PLN",
  };
  const [totalPrice, setTotalPrice] = useState([]);
  const [totalTime, setTotalTime] = useState([]);
  const [subtotalPrice, setSubtotalPrice] = useState(0);
  const [promoValue, setPromoValue] = useState(0);
  const array = [];

  //for posting
  const userId = auth?.user;
  const appointementDate = date.toJSON();
  const [postRequest, setPostRequest] = useState([]);
  const [req, setReq] = useState([]);
  const [salonNote, setSalonNote] = useState("");
  const requestRef = useRef();
  requestRef.current = req;

  useEffect(() => {
    if (note.length !== 0) {
      setSalonNote(note);
    }
    setReq(postRequest);
  });

  useEffect(() => {
    services.map((service) => {
      let id = service.appointmentTypeID;
      let postModel = {
        appointmentTypeID: id,
        userID: userId,
        date: appointementDate,
        noteForSalon: salonNote,
      };
      array.push(postModel);
    });
    const fetchPostRequest = () => {
      return {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(array),
      };
    };

    let postRequestValue = fetchPostRequest();
    setPostRequest(postRequestValue);
  }, [salonNote]);

  async function fetchPost(fullname) {
    const response = await fetch(
      globalUrls.BASE_URL + "/api/Appointments/list",
      requestRef.current
    );

    const data = await response.text();

    if (response.status === 200) {
      toConfirmation(fullname);
    }
  }

  useEffect(() => {
    const calculatePromotionPrice = () => {
      let temp = [];
      services.forEach((service) => {
        if (service.promotion !== null && service.promotion !== undefined) {
          let value =
            service.price -
            (service.price * service.promotion.discountInPercent) / 100;
          temp.push(value);
        } else {
          temp.push(service.price);
        }
      });

      let sum = temp.reduce((a, v) => (a = a + v), 0);
      return sum;
    };

    const calculateTime = () => {
      let timeSum = services.reduce((a, v) => (a = a + v.lengthMinutes), 0);
      return timeSum;
    };

    let summary = calculatePromotionPrice();
    let time = calculateTime();

    setTotalPrice(summary);
    setTotalTime(time);
  }, []);

  return (
    <div className="summary">
      <h1 className="summary__maintitle">Order summary</h1>
      <div className="summary_container">
        <p className="summary_container__title">Subtotal:{totalPrice}zl</p>

        <hr class="summary_container__divider" />
        <p className="summary_container__title">Total time:{totalTime}min</p>
        <hr class="summary_container__divider" />
        <div className="total">
          <h2 className="total__value">Total: </h2>
          <h2 className="total__price">{totalPrice}zl</h2>
        </div>
      </div>
      <div className="payment_options">
        <PayPalScriptProvider options={options}>
          <PayPalButtons
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: "PLN",
                      value: `${totalPrice}`,
                    },
                  },
                ],
              });
            }}
            onApprove={async (data, actions) => {
              const details = await actions.order.capture();
              const name = details.payer.name.given_name;
              const surname = details.payer.name.surname;
              const email = details.payer.email_address;
              setUserEmail(email);
              //alert("Transaction completed by " + name);
              const fullname = name + " " + surname;
              setUserFullname(fullname);

              fetchPost(fullname);
            }}
          />
        </PayPalScriptProvider>
      </div>
    </div>
  );
};

export default Summary;
