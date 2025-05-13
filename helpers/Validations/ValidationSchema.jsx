import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});
export const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  // mobile: yup
  //   .string()
  //   .required("Mobile number is required")
  //   .matches(
  //     /^[6-9]\d{9}$/,
  //     "Mobile number must be 10 digits and start with 6-9"
  //   ),

  mobile: yup
    .string()
    .required("Mobile number is required")
    .min(7, "Mobile number must be at least 7 digits")
    .max(10, "Mobile number must be at most 10 digits")
    .matches(/^[0-9]+$/, "Mobile number must contain only digits"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),

  gender: yup.string().required("Gender is required"),
});

export const resetPasswordSchema = yup.object().shape({
  newPassword: yup
    .string()
    .required("New password is required")
    .min(5, "Must be at least 5 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const profileValidationsSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 digits")
    .max(10, "Phone number must be at most 10 digits")
    .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  gender: yup.string().required("Gender is required"),
});
export const contactUsFormValidationSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name must be at most 30 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup
    .string()
    .required("Phone number is required")
    .min(7, "Phone number must be at least 7 digits")
    .max(10, "Phone number must be at most 10 digits")
    .matches(/^[0-9]+$/, "Phone number must contain only digits"),
  message: yup.string().required("Message is required"),
});

export const ChangePasswordSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Current password is required")
    .min(5, "Must be at least 5 characters"),
  newPassword: yup
    .string()
    .required("New password is required")
    .min(5, "Must be at least 5 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm password is required"),
});

export const ContactInfoSchema = yup.array().of(
  yup.object().shape({
    title: yup.string().required("Title is required"),
    number: yup
      .string()
      .required("Mobile number is required")
      .min(7, "Mobile number must be at least 7 digits")
      .max(15, "Mobile number must be at most 15 digits"),
  })
);
