import { useState, useEffect } from "react";

import style from "../../sass/components/service.module.scss";
import globalUrls from "../Utility/Urls";
import Modal from "./Modal";
import Image from "../Utility/Image";
import useAuth from "../hooks/useAuth";

function getTime(time) {
  var date = new Date(Date.parse(time));
  if (date.getMinutes() === 0) {
    return date.getHours() + ":" + date.getMinutes() + 0;
  }
  return date.getHours() + ":" + date.getMinutes();
}

function getWorkingTime(time1, time2) {
  return getTime(time1) + "-" + getTime(time2);
}

const Information = (props) => {
  const [isLiked, setIsLiked] = useState(false);

  const { auth } = useAuth();

  const userId = auth?.user;

  const [openModal, setOpenModal] = useState(false);
  const [openServices, setOpenServices] = useState(false);

  useEffect(() => {
    getUser(userId);
  }, []);

  const addToWishlist = () => {
    if (!isLiked) {
      postToWishlist();
    } else {
      deleteFromWishlist();
    }
  };

  async function postToWishlist() {
    const wishlistPostrequest = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: "",
    };

    const response = await fetch(
      globalUrls.BASE_URL +
        "/api/Accounts/favourites/" +
        userId +
        "/" +
        props.item.salonID,
      wishlistPostrequest
    );

    const data = await response.text();

    if (response.status === 200) {
      setIsLiked(true);
    }
  }
  async function postToWishlist() {
    const wishlistPostrequest = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: "",
    };

    const response = await fetch(
      globalUrls.BASE_URL +
        "/api/Accounts/favourites/" +
        userId +
        "/" +
        props.item.salonID,
      wishlistPostrequest
    );

    const data = await response.text();

    if (response.status === 200) {
      setIsLiked(true);
    } else if (response.status === 409) {
      setIsLiked(false);
    }
  }

  async function deleteFromWishlist() {
    const wishlistDeleteRequest = {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: "",
    };

    const response = await fetch(
      globalUrls.BASE_URL +
        "/api/Accounts/favourites/" +
        userId +
        "/" +
        props.item.salonID,
      wishlistDeleteRequest
    );

    const data = await response.text();

    if (response.status === 200) {
      setIsLiked(false);
    }
  }

  async function getUser(userId) {
    const userGetRequest = {
      method: "GET",
      headers: { "Content-type": "application/json" },
    };

    const response = await fetch(
      globalUrls.BASE_URL + "/api/Accounts/" + userId + "/favourites"
    );

    const data = await response.json();

    if (response.status === 200) {
      data.map((salon) => {
        if (props.item.salonID === salon.salonID) {
          setIsLiked(true);
        }
      });
    }
  }

  return (
    <div className={style.service}>
      <Image
        data={props.item.salonPicture.bytes}
        className={style.service__img}
      />
      <div className={style.service__info}>
        <div className={style.service__header}>
          <h2 className={style.service__title}>{props.item.name}</h2>
          <p className={style.wishlist__title}>Add to wishlist</p>
          <a className={style.wishlist__icon} onClick={addToWishlist}>
            <ion-icon
              name={isLiked ? "heart" : "heart-outline"}
              class="heart"
              id="heart"
            ></ion-icon>
          </a>

          <div className={style.service__contacts}>
            <div className={style.contact}>
              <ion-icon
                name="location-outline"
                class={style.contact__icon}
              ></ion-icon>
              <h2 className={style.contact__title}>
                {props.item.address.city}
              </h2>
            </div>

            <div className={style.contact}>
              <ion-icon
                name="call-outline"
                class={style.contact__icon}
              ></ion-icon>
              <a
                href={`tel: ${props.item.ownerPhoneNumber}`}
                className={style.contact__title}
              >
                {props.item.ownerPhoneNumber}
              </a>
            </div>
          </div>
        </div>
        <div className={style.plan}>
          <h2 className={style.plan__title}>Opening hours:</h2>
          <div className={style.plan__item}>
            <p>Monday - Friday: </p>
            <p className={style.plan__time}>
              {getWorkingTime(
                props.item.openHours[0].openTime,
                props.item.openHours[0].closeTime
              )}
            </p>
          </div>
          <div className={style.plan__item}>
            <p>Saturday: </p>
            <p className={style.plan__time}>
              {getWorkingTime(
                props.item.openHours[5].openTime,
                props.item.openHours[5].closeTime
              )}
            </p>
          </div>
          <div className={style.plan__item}>
            <p>Sunday: </p>
            <p className={style.plan__time}>Day off</p>
          </div>
        </div>

        <button
          className={style.service__button}
          onClick={() => setOpenModal(true)}
        >
          Book
        </button>
      </div>

      <Modal
        services={props.item.appointmentTypes}
        salon={props.item}
        initialService={null}
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setOpenServices(false);
        }}
        openServices={openServices}
        setOpenServices={setOpenServices}
      />
    </div>
  );
};

export default Information;
