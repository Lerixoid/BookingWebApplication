import { useState } from "react";

import {
  emailValidator,
  passwordValidator,
  confirmPasswordValidator,
  nameValidator,
  surnameValidator,
  phoneValidator,
  dateOfBirthValidator,
} from "../../Utility/Validations";

const touchErrors = (errors) => {
  return Object.entries(errors).reduce((acc, [field, fieldError]) => {
    acc[field] = {
      ...fieldError,
      dirty: true,
    };

    return acc;
  }, {});
};

export const useRegisterFormValidator = (form) => {
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
    confirmPassword: {
      dirty: false,
      error: false,
      message: "",
    },
    name: {
      dirty: false,
      error: false,
      message: "",
    },
    surname: {
      dirty: false,
      error: false,
      message: "",
    },
    phoneNumber: {
      dirty: false,
      error: false,
      message: "",
    },
    birthdate: {
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

    const {
      login,
      password,
      confirmPassword,
      name,
      surname,
      phoneNumber,
      birthdate,
    } = form;

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

    if (
      nextErrors.confirmPassword.dirty &&
      (field ? field === "confirmPassword" : true)
    ) {
      const confirmPasswordMessage = confirmPasswordValidator(
        confirmPassword,
        form
      );
      nextErrors.confirmPassword.error = !!confirmPasswordMessage;
      nextErrors.confirmPassword.message = confirmPasswordMessage;

      if (!!confirmPasswordMessage) {
        isValid = false;
      }
    }

    if (nextErrors.name.dirty && (field ? field === "name" : true)) {
      const nameMessage = nameValidator(name, form);
      nextErrors.name.error = !!nameMessage;
      nextErrors.name.message = nameMessage;

      if (!!nameMessage) {
        isValid = false;
      }
    }

    if (nextErrors.surname.dirty && (field ? field === "surname" : true)) {
      const surnameMessage = surnameValidator(surname, form);
      nextErrors.surname.error = !!surnameMessage;
      nextErrors.surname.message = surnameMessage;

      if (!!surnameMessage) {
        isValid = false;
      }
    }

    if (
      nextErrors.phoneNumber.dirty &&
      (field ? field === "phoneNumber" : true)
    ) {
      const phoneMessage = phoneValidator(phoneNumber, form);
      nextErrors.phoneNumber.error = !!phoneMessage;
      nextErrors.phoneNumber.message = phoneMessage;

      if (!!phoneMessage) {
        isValid = false;
      }
    }

    if (nextErrors.birthdate.dirty && (field ? field === "birthdate" : true)) {
      const birthdateMessage = dateOfBirthValidator(birthdate, form);
      nextErrors.birthdate.error = !!birthdateMessage;
      nextErrors.birthdate.message = birthdateMessage;

      if (!!birthdateMessage) {
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
