import { commonContent } from "../../constants/CommonContent/CommonContent";

export const validateLoginForm = (formState, setFormErrors) => {
  let errors = {};
  let isValid = true;

  if (!formState.mobile.trim()) {
    errors.mobile = commonContent.phoneNumberRequired;
    isValid = false;
  } else if (!/^\d{10}$/.test(formState.mobile)) {
    errors.mobile = commonContent.validDigitPhoneNumber;
    isValid = false;
  }

  if (!formState.password.trim()) {
    errors.password = commonContent.passwordRequired;
    isValid = false;
  } else if (
    formState?.password?.length < 6 ||
    formState?.password?.length > 10
  ) {
    errors.password = commonContent.validPassword;
    isValid = false;
  }

  setFormErrors(errors);
  return isValid;
};
