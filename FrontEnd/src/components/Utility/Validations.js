export const emailValidator = (email) => {
  if (!email) {
    return "Email is required";
  } else if (!new RegExp(/\S+@\S+\.\S+/).test(email)) {
    return "Incorrect email format";
  }
  return "";
};

export const passwordValidator = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must have a minimum 8 characters";
  }
  return "";
};

export const confirmPasswordValidator = (confirmPassword, form) => {
  if (!confirmPassword) {
    return "Confirm password is required";
  } else if (confirmPassword.length < 8) {
    return "Confirm password must have a minimum 8 characters";
  } else if (confirmPassword !== form.password) {
    return "Passwords do not match";
  }
  return "";
};

export const nameValidator = (name) => {
  if (!name) {
    return "Name is required";
  } else if (
    !new RegExp(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    ).test(name)
  ) {
    return "Incorrent name format";
  }

  return "";
};

export const surnameValidator = (surname) => {
  if (!surname) {
    return "Surname is required";
  } else if (
    !new RegExp(
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u
    ).test(surname)
  ) {
    return "Incorrent surname format";
  }

  return "";
};

export const phoneValidator = (phone) => {
  if (!phone) {
    return "Phone number is required";
  } else if (
    !new RegExp(
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    ).test(phone)
  ) {
    return "Incorrent phone number format";
  }

  return "";
};

export const dateOfBirthValidator = (date) => {
  if (!date) {
    return "Date of birth is required";
  }

  const year = new Date(date).getFullYear();
  const age = new Date().getFullYear() - year;

  if (age < 16) {
    return "You must be over 16 years old";
  }

  return "";
};
