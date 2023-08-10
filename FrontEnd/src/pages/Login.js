import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useLoginFormValidator } from "../components/PageLogin/hooks/useLoginFormValidator";
import useAuth from "../components/hooks/useAuth.js";

import globalUrls from "../components/Utility/Urls";

import "../sass/components/login.scss";

const Login = () => {
  const [form, setForm] = useState({
    login: "",
    password: "",
  });

  const { auth, setAuth, persist, setPersist } = useAuth();
  const { errors, validateForm, onBlurField } = useLoginFormValidator(form);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

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

  const loginHandle = (event) => {
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
      }),
    };

    const fetchPost = async () => {
      const response = await fetch(
        globalUrls.BASE_URL + "/api/Accounts/login",
        requestOptions
      );
      const data = await response.json();
      if (response.status === 200) {
        const accessToken = data?.accessToken;
        const role = data?.userRole;
        const user = data?.userID;
        const refreshToken = data?.refreshToken;
        const login = data?.login;

        setAuth({ user, login, role, accessToken, refreshToken });

        navigate(from, { replace: true });
      }
    };

    fetchPost();
  };

  return (
    <div>
      <form className="login" onSubmit={loginHandle}>
        <p className="login__title">Log in</p>

        <div>
          {errors.login.dirty && errors.login.error ? (
            <p className="login__error">{errors.login.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="email"
              placeholder="Login"
              className={
                errors.login.dirty && errors.login.error
                  ? "login__input--error"
                  : "login__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="login"
              required
            ></input>
            <ion-icon name="person-outline" class="login__icon"></ion-icon>
          </div>
        </div>

        <div>
          {errors.password.dirty && errors.password.error ? (
            <p className="login__error">{errors.password.message}</p>
          ) : null}
          <div className="input__container">
            <input
              type="password"
              placeholder="Password"
              className={
                errors.password.dirty && errors.password.error
                  ? "login__input--error"
                  : "login__input"
              }
              onChange={onUpdateField}
              onBlur={onBlurField}
              name="password"
              required
            ></input>
            <ion-icon name="lock-closed-outline" class="login__icon"></ion-icon>
          </div>
        </div>

        <button type="submit" className="login__button">
          Login
        </button>

        <Link to="/register" className="login__link login__link--sign-up">
          Sign up
        </Link>

        <Link to="" className="login__link login__link--forgot">
          Forgot password?
        </Link>
      </form>
    </div>
  );
};

export default Login;
