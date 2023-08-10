import React from "react";

import { useState } from "react";
import { useSettingsFormValidator } from "./hooks/useSettingsFormValidator";

import globalUrls from "../Utility/Urls";

const Settings = (props) => {
  let birthdateFormatted = props.user.birthdate;
  birthdateFormatted = birthdateFormatted.toString().split("T")[0];

  const [userData, setUserData] = useState({
    name: props.user.name,
    surname: props.user.surname,
    phoneNumber: props.user.phoneNumber,
    birthdate: birthdateFormatted,
    profilePicture: props.user.profilePicture,
  });

  const { errors, validateForm, onBlurField } =
    useSettingsFormValidator(userData);

  const submitHandle = (event) => {
    event.preventDefault();

    const { isValid } = validateForm({
      userData,
      errors,
      forceTouchErrors: true,
    });

    if (!isValid) {
      return;
    }

    const requestOptions = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userData),
    };

    const fetchPost = async () => {
      const response = await fetch(
        globalUrls.BASE_URL + "/api/Accounts/" + props.user.userID,
        requestOptions
      );
      const data = await response.json();

      console.log(response);
      console.log(data);

      if (response.status === 200) {
        setUserData(userData);
        window.location.reload(true);
      }
    };

    fetchPost();
  };

  const onUpdateField = (event) => {
    const field = event.target.name;
    const nextFormState = {
      ...userData,
      [field]: event.target.value,
    };

    setUserData(nextFormState);

    if (errors[field].dirty) {
      validateForm({
        userData: nextFormState,
        errors,
        field,
      });
    }
  };

  return (
    <div>
      <form className="settings" onSubmit={submitHandle}>
        <p className="settings__title">Settings</p>

        <p className="settings__title--secondary">Update your information</p>

        <div className="settings__container">
          {errors.name.dirty && errors.name.error ? (
            <p className="settings__error">{errors.name.message}</p>
          ) : null}
          <div className="settings__field">
            <label className="settings__label" htmlFor="settings__name">
              Name:
            </label>
            <input
              id="settings__name"
              type="text"
              value={userData.name}
              className={
                errors.name.dirty && errors.name.error
                  ? "settings__input--error"
                  : "settings__input"
              }
              name="name"
              onChange={onUpdateField}
              onBlur={onBlurField}
              required
            ></input>
          </div>
        </div>

        <div className="settings__container">
          {errors.surname.dirty && errors.surname.error ? (
            <p className="settings__error">{errors.surname.message}</p>
          ) : null}
          <div className="settings__field">
            <label className="settings__label" htmlFor="settings__surname">
              Surname:
            </label>
            <input
              id="settings__surname"
              type="text"
              value={userData.surname}
              className={
                errors.surname.dirty && errors.surname.error
                  ? "settings__input--error"
                  : "settings__input"
              }
              name="surname"
              onChange={onUpdateField}
              onBlur={onBlurField}
              required
            ></input>
          </div>
        </div>

        <div className="settings__container">
          {errors.phoneNumber.dirty && errors.phoneNumber.error ? (
            <p className="settings__error">{errors.phoneNumber.message}</p>
          ) : null}
          <div className="settings__field">
            <label className="settings__label" htmlFor="settings__phoneNumber">
              Phone number:
            </label>
            <input
              id="settings__phoneNumber"
              type="text"
              value={userData.phoneNumber}
              className={
                errors.phoneNumber.dirty && errors.phoneNumber.error
                  ? "settings__input--error"
                  : "settings__input"
              }
              name="phoneNumber"
              onChange={onUpdateField}
              onBlur={onBlurField}
              required
            ></input>
          </div>
        </div>

        <div className="settings__container">
          {errors.birthdate.dirty && errors.birthdate.error ? (
            <p className="settings__error">{errors.birthdate.message}</p>
          ) : null}
          <div className="settings__field">
            <label className="settings__label" htmlFor="settings__birthdate">
              Birthdate:
            </label>
            <input
              id="settings__birthdate"
              type="date"
              value={userData.birthdate}
              className={
                errors.birthdate.dirty && errors.birthdate.error
                  ? "settings__input--error"
                  : "settings__input"
              }
              name="birthdate"
              onChange={onUpdateField}
              onBlur={onBlurField}
              required
            ></input>
          </div>
        </div>

        <button
          className="settings__button settings__button--register"
          type="submit"
        >
          Confirm
        </button>
      </form>
    </div>
  );
};

export default Settings;
