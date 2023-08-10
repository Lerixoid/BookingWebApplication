import { useState } from "react";

import { emailValidator, passwordValidator } from "../../Utility/Validations";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };

    return acc;
  }, {});
};

export const useLoginFormValidator = (form) => {
  const [errors, setErrors] = useState({
    login: {
      dirty: false,
      error: false,
      message: "",
    },
    password: {
      dirty: false,
      error: false,
      message: "",
    },
  });

  const validateForm = ({ form, field, errors, forceTouchErrors = false }) => {
    let isValid = true;

    let nextErrors = JSON.parse(JSON.stringify(errors));

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { login, password } = form;

    if (nextErrors.login.dirty && (field ? field === "login" : true)) {
      const loginMessage = emailValidator(login, form);
      nextErrors.login.error = !!loginMessage;
      nextErrors.login.message = loginMessage;

      if (!!loginMessage) {
        isValid = false;
      }
    }

    if (nextErrors.password.dirty && (field ? field === "password" : true)) {
      const passwordMessage = passwordValidator(password, form);
      nextErrors.password.error = !!passwordMessage;
      nextErrors.password.message = passwordMessage;

      if (!!passwordMessage) {
        isValid = false;
      }
    }

    setErrors(nextErrors);

    return {
      isValid,
      errors: nextErrors,
    };
  };

  const onBlurField = (event) => {
    const field = event.target.name;
    const fieldError = errors[field];

    if (fieldError.dirty) {
      return;
    }

    const updatedErrors = {
      ...errors,
      [field]: {
        ...errors[field],
        dirty: true,
      },
    };

    validateForm({ form, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
