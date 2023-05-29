import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import GroupForm from "../GroupDetailForm/GroupForm";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsSubmitted(true);
      localStorage.setItem("token", true);
    },
  });

  return isSubmitted ? (
    <GroupForm />
  ) : (
    <div className="login">
      <form onSubmit={formik.handleSubmit}>
        <div className="loginForm">
          <h1>Login Page</h1>

          <TextField
            id="email"
            label="Enter Email"
            className="inputEmail"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ marginTop: 4 }}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            autoComplete="current-password"
            className="inputPassword"
            sx={{ marginTop: 2 }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button
            variant="contained"
            className="loginBtn"
            sx={{ marginTop: 3 }}
            type="submit"
          >
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
