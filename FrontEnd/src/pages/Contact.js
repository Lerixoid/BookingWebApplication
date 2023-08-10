import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import globalUrls from "../components/Utility/Urls";

import "../sass/components/contact.scss";

const Contact = () => {
  const [isSubmited, setIsSubmited] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const submitForm = (data, event) => {
    event.preventDefault();

    let jsonData = JSON.stringify(data);
    fetchPost(data);

    event.target.reset();
  };

  const fetchPost = async (data) => {
    const request = fetchPostRequest(data);

    const response = await fetch(
      globalUrls.BASE_URL + "/api/Contact/contact",
      request
    );

    const dataValue = await response.text();
    if (response.status === 200) {
      showMessage();
    }
  };
  const fetchPostRequest = (data) => {
    return {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    };
  };

  const showMessage = () => {
    const el = document.getElementById("submit_message");

    if (!isSubmited) {
      el.style.display = "block";
      setIsSubmited(true);
    } else {
      el.style.display = "none";
      setIsSubmited(false);
    }
  };

  return (
    <div className="contact_container">
      <h1 class="contact__title">Contact Us</h1>

      <form class="contact__form" onSubmit={handleSubmit(submitForm)}>
        <div className="input__fullname">
          <div class="input_name">
            <label for="name" className="input_label">
              Name
            </label>
            <input
              {...register("name", {
                required: "Name is required",
                maxLength: {
                  value: 20,
                  message: "Maximum allowed legth is 20",
                },
              })}
              className="contact_input"
              type="name"
              name="name"
              placeholder=""
            />
            <div>{errors?.name && <p>{errors?.name?.message}</p>}</div>
          </div>

          <div class="input_name">
            <label for="surname" className="input_label">
              Surname
            </label>
            <input
              {...register("surname", {
                required: "Surname is required",
                maxLength: {
                  value: 20,
                  message: "Maximum allowed legth is 20",
                },
              })}
              className="contact_input"
              type="text"
              name="surname"
              placeholder=""
              required
            />
            <div>{errors?.surname && <p>{errors?.surname?.message}</p>}</div>
          </div>
        </div>
        <div className="input__message">
          <label for="email" className="input_label">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              maxLength: {
                value: 200,
                message: "Maximum allowed legth is 200",
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Please enter a valid email",
              },
            })}
            className="contact_input"
            type="email"
            name="email"
            placeholder=""
            required
          />
          <div>{errors?.email && <p>{errors?.email?.message}</p>}</div>

          <label for="message" className="input_label">
            Message
          </label>
          <textarea
            {...register("message", {
              required: "Message is required",
              maxLength: {
                value: 5000,
                message: "Maximum allowed legth is 5000",
              },
            })}
            rows="10"
            cols="25"
            className="textarea_input"
            type="text"
            name="message"
            placeholder=""
          />
          <div>{errors?.message && <p>{errors?.message?.message}</p>}</div>

          <button className="contact_button" type="submit">
            Send
          </button>

          <p id="submit_message">
            Thank you for submiting your message!We will contact you as soon as
            possible
          </p>
        </div>
      </form>
    </div>
  );
};

export default Contact;
