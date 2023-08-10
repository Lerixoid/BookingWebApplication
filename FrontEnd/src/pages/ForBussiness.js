import React from "react";
import "../sass/components/forbussiness.scss";
import "bootstrap/dist/css/bootstrap.css";
import { useForm } from "react-hook-form";
import { useState } from "react";

import globalUrls from "../components/Utility/Urls";

const ForBussiness = () => {
  const [isSubmited, setIsSubmited] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      email: "",
      name: "",
      surname: "",
      number: "",
      organization: "",
      organizationContact: "",
      organizationAdress: "",
      comment: "",
    },
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
      globalUrls.BASE_URL + "/api/Contact/application",
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
    const el = document.getElementById("submit_application");

    if (!isSubmited) {
      el.style.display = "block";
      setIsSubmited(true);
    } else {
      el.style.display = "none";
      setIsSubmited(false);
    }
  };

  return (
    <div className="container col-12">
      <div className="business_container col-12">
        <h1 className="business_headtitle">FOR BUSSINES</h1>
        <img
          className="business_footage col-9"
          src = {`${process.env.PUBLIC_URL}/business.png`} /> 
        
        <div className="application col-9">
          <h2 className="business_title col-5">APPLICATION FORM</h2>
          <div className="input_form col-11">
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="col-3 input_col">
                <p className="label">NAME</p>
                <p className="label">SURNAME</p>
                <p className="label">PHONE NUMBER</p>
                <p className="label">EMAIL</p>
              </div>

              <div className="col-3 input_col">
                <input
                  {...register("name", {
                    required: "Name is required",
                    maxLength: {
                      value: 20,
                      message: "Maximum allowed legth is 20",
                    },
                  })}
                  className="business_input"
                  type="text"
                />
                <div>{errors?.name && <p>{errors?.name?.message}</p>}</div>

                <input
                  {...register("surname", {
                    required: "Surname is required",
                    maxLength: {
                      value: 20,
                      message: "Maximum allowed legth is 20",
                    },
                  })}
                  className="business_input"
                  type="text"
                  required
                />
                <div>
                  {errors?.surname && <p>{errors?.surname?.message}</p>}
                </div>

                <input
                  {...register("number", {
                    required: "Phone number is required",
                    maxLength: {
                      value: 20,
                      message: "Maximum allowed legth is 20",
                    },
                    pattern: {
                      value:
                        /(?:(?:(?:\+|00)?48)|(?:\(\+?48\)))?(?:1[2-8]|2[2-69]|3[2-49]|4[1-8]|5[0-9]|6[0-35-9]|[7-8][1-9]|9[145])\d{7}/,
                      message: "Please enter a valid polish phone number",
                    },
                  })}
                  className="business_input"
                  type="text"
                  name="number"
                  required
                />
                <div>
                  {errors?.phoneNumber && <p>{errors?.phoneNumber?.message}</p>}
                </div>

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
                  className="business_input"
                  type="email"
                  required
                />
                <div>{errors?.email && <p>{errors?.email?.message}</p>}</div>
              </div>

              <div className="col-3 input_col">
                <p className="label">ORGANIZATION</p>
                <p className="label">ORGANIZATION CONTACT</p>
                <p className="label">ORGANIZATION ADRESS</p>
              </div>

              <div className="col-3 input_col">
                <input
                  {...register("organization", {
                    required: "Organization Name is required",
                    maxLength: {
                      value: 100,
                      message: "Maximum allowed legth is 100",
                    },
                  })}
                  className="business_input"
                  type="text"
                  required
                />
                <div>
                  {errors?.organization && (
                    <p>{errors?.organization?.message}</p>
                  )}
                </div>

                <input
                  {...register("organizationContact", {
                    required: "Contact number is required",
                    maxLength: {
                      value: 20,
                      message: "Maximum allowed legth is 20",
                    },
                  })}
                  className="business_input"
                  type="text"
                  required
                />
                <div>
                  {errors?.organizationContact && (
                    <p>{errors?.organizationContact?.message}</p>
                  )}
                </div>

                <input
                  {...register("organizationAdress", {
                    required: "Adress is required",
                    maxLength: {
                      value: 50,
                      message: "Maximum allowed legth is 50",
                    },
                  })}
                  className="business_input"
                  type="text"
                  required
                />
                <div>
                  {errors?.organizationAdress && (
                    <p>{errors?.organizationAdress?.comment}</p>
                  )}
                </div>
              </div>

              <div className="input_row col-12">
                <p className="commentary col-3">COMMENTARY</p>
                <textarea
                  rows="8"
                  className="business_textarea col-9"
                  type="text"
                  placeholder=""
                />
              </div>

              <div className="input_row col-12">
                <div className="col-9 checkbox_container">
                  <input className="business_input" type="checkbox" required />
                  <p className="checkbox_text">
                    Сhecking this box, you are agree on processing of personal
                    data
                  </p>
                </div>

                <button type="submit" className="col-3 application_button">
                  SEND APPLICATION
                </button>
              </div>
            </form>
            <p id="submit_application">
              Thank you for submiting your application!We will contact you as
              soon as possible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForBussiness;
