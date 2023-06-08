import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Login.css";
import { useFormik } from "formik";
import * as yup from "yup";
import GroupForm from "../GroupDetailForm/GroupForm";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

const Login = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: FormValues) => {
      setIsSubmitted(true);
      const maths = Math.floor(Math.random() * 10000);
      localStorage.setItem("token", maths.toString());
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsSubmitted(false);
  };

  return isSubmitted ? (
    <GroupForm />
  ) : (
    <div className="login">
      <form onSubmit={formik.handleSubmit}>
        <div className="loginform">
          <h1>Login Page</h1>

          <TextField
            id="email"
            label="Enter Email"
            className="inputemail"
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
            className="inputpassword"
            sx={{ marginTop: 2 }}
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />

          <Button variant="contained" className="loginbtn" sx={{ marginTop: 3 }} type="submit">
            Login
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
