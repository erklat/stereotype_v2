import * as yup from "yup";

export const schema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long"),
  // .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  // .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .matches(/[0-9]/, "Password must contain at least one number")
  // .matches(/[\W_]/, "Password must contain at least one special character"),
});
