import { useState } from "react";

import {
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

export const useSettingsFormValidator = (userData) => {
  const [errors, setErrors] = useState({
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

  const validateForm = ({
    userData,
    field,
    errors,
    forceTouchErrors = false,
  }) => {
    let isValid = true;

    let nextErrors = JSON.parse(JSON.stringify(errors));

    if (forceTouchErrors) {
      nextErrors = touchErrors(errors);
    }

    const { name, surname, phoneNumber, birthdate } = userData;

    if (nextErrors.name.dirty && (field ? field === "name" : true)) {
      const nameMessage = nameValidator(name, userData);
      nextErrors.name.error = !!nameMessage;
      nextErrors.name.message = nameMessage;

      if (!!nameMessage) {
        isValid = false;
      }
    }

    if (nextErrors.surname.dirty && (field ? field === "surname" : true)) {
      const surnameMessage = surnameValidator(surname, userData);
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
      const phoneMessage = phoneValidator(phoneNumber, userData);
      nextErrors.phoneNumber.error = !!phoneMessage;
      nextErrors.phoneNumber.message = phoneMessage;

      if (!!phoneMessage) {
        isValid = false;
      }
    }

    if (nextErrors.birthdate.dirty && (field ? field === "birthdate" : true)) {
      const birthdateMessage = dateOfBirthValidator(birthdate, userData);
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

    validateForm({ userData, field, errors: updatedErrors });
  };

  return {
    validateForm,
    onBlurField,
    errors,
  };
};
