import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import { useRegisterFormValidator } from "../components/PageRegister/hooks/useRegisterFormValidator";

import globalUrls from "../components/Utility/Urls";

import "../sass/components/register.scss";

const Register = () => {
  const [form, setForm] = useState({
    login: "",
    password: "",
    confirmPassword: "",
    name: "",
    surname: "",
    phoneNumber: "",
    birthdate: "",
    userRole: "User",
  });

  const { errors, validateForm, onBlurField } = useRegisterFormValidator(form);

  const navigate = useNavigate();

  const ref = useRef();

  const registerHandle = (event) => {
    event.preventDefault();

    const { isValid } = validateForm({ form, errors, forceTouchErrors: true });

    if (!isValid) {
      return;
    }

    const requestOptions = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        login: form.login,
        password: form.password,
        name: form.name,
        surname: form.surname,
        phoneNumber: form.phoneNumber,
        birthdate: form.birthdate,
        userRole: form.userRole,
      }),
    };

    const fetchPost = async () => {
      const response = await fetch(
        globalUrls.BASE_URL + "/api/Accounts/register",
        requestOptions
      );
      const data = await response.json();

      if (response.status === 200) {
        navigate("/");
      }
    };

    fetchPost();
  };

  const onUpdateField = (event) => {
    const field = event.target.name;
    const nextFormState = {
      ...form,
      [field]: event.target.value,
    };

    setForm(nextFormState);

    if (errors[field].dirty) {
      validateForm({
        form: nextFormState,
        errors,
        field,
      });
    }
  };

  return (
    <div>
      <form className="register" onSubmit={registerHandle}>
        <p className="register__title">Register</p>

        <div>
          {errors.login.dirty && errors.login.error ? (
            <p className="register__error">{errors.login.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="email"
              placeholder="Email"
              className={
                errors.login.dirty && errors.login.error
                  ? "register__input--error"
                  : "register__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="login"
              required
            ></input>
            <ion-icon name="mail-outline" class="register__icon"></ion-icon>
          </div>
        </div>

        <div>
          {errors.password.dirty && errors.password.error ? (
            <p className="register__error">{errors.password.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="password"
              placeholder="Password"
              className={
                errors.password.dirty && errors.password.error
                  ? "register__input--error"
                  : "register__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="password"
              required
            ></input>
            <ion-icon
              name="lock-closed-outline"
              class="register__icon"
            ></ion-icon>
          </div>
        </div>

        <div>
          {errors.confirmPassword.dirty && errors.confirmPassword.error ? (
            <p className="register__error">{errors.confirmPassword.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="password"
              placeholder="Repeat your password"
              className={
                errors.confirmPassword.dirty && errors.confirmPassword.error
                  ? "register__input--error"
                  : "register__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="confirmPassword"
              required
            ></input>
            <ion-icon
              name="lock-closed-outline"
              class="register__icon"
            ></ion-icon>
          </div>
        </div>

        <div>
          {errors.name.dirty && errors.name.error ? (
            <p className="register__error">{errors.name.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="text"
              placeholder="Name"
              className={
                errors.name.dirty && errors.name.error
                  ? "register__input--error"
                  : "register__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="name"
              required
            ></input>
            <ion-icon name="person-outline" class="register__icon"></ion-icon>
          </div>
        </div>

        <div>
          {errors.surname.dirty && errors.surname.error ? (
            <p className="register__error">{errors.surname.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="text"
              placeholder="Surname"
              className={
                errors.surname.dirty && errors.surname.error
                  ? "register__input--error"
                  : "register__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="surname"
              required
            ></input>
            <ion-icon name="person-outline" class="register__icon"></ion-icon>
          </div>
        </div>

        <div>
          {errors.phoneNumber.dirty && errors.phoneNumber.error ? (
            <p className="register__error">{errors.phoneNumber.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="tel"
              placeholder="Phone"
              className={
                errors.phoneNumber.dirty && errors.phoneNumber.error
                  ? "register__input--error"
                  : "register__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="phoneNumber"
              required
            ></input>
            <ion-icon name="call-outline" class="register__icon"></ion-icon>
          </div>
        </div>

        <div>
          {errors.birthdate.dirty && errors.birthdate.error ? (
            <p className="register__error">{errors.birthdate.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="text"
              placeholder="Date of birth"
              className={
                errors.birthdate.dirty && errors.birthdate.error
                  ? "register__input--error"
                  : "register__input"
              }
              name="birthdate"
              ref={ref}
              onFocus={() => (ref.current.type = "date")}
              onChange={onUpdateField}
              onBlur={onBlurField}
            />
            <ion-icon name="today-outline" class="register__icon"></ion-icon>
          </div>
        </div>

        <div className="input__radio">
          <div className="radio__container">
            <input
              type="radio"
              value="User"
              name="userRole"
              id="radio_register_role--1"
              checked
              onChange={onUpdateField}
            ></input>
            <label htmlFor="radio_register_role--1">User</label>
          </div>

          <div className="radio__container">
            <input
              type="radio"
              value="Owner"
              name="userRole"
              id="radio_register_role--2"
              onChange={onUpdateField}
            ></input>
            <label htmlFor="radio_register_role--2">Service owner</label>
          </div>
        </div>

        <button
          type="submit"
          className="register__button register__button--register"
        >
          Register
        </button>

        <Link to="/login" className="register__button--link">
          Return
        </Link>
      </form>
    </div>
  );
};

export default Register;
