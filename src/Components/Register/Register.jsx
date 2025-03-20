import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bars } from 'react-loader-spinner';
import image from '../../Assets/images/signup-g-Dtp6-wtD.svg';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  let navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function registerSubmit(values) {
    setIsLoading(true);
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(err.response.data.message);
        setIsLoading(false);
      });

    if (data?.message === "success") {
      navigate("/login");
      setIsLoading(false);
    }
  }

  let validationSchema = Yup.object({
    name: Yup.string().min(3, "Name must be at least 3 characters").max(10, "Name must not exceed 10 characters").required("Name is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    phone: Yup.string().matches(/^(010|011|012|015)\d{8}$/, "Invalid phone number").required("Phone number is required"),
    password: Yup.string().matches(/^[A-Za-z][a-zA-Z0-9]{5,10}$/, "Password must start with a letter and be 6-11 characters long").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref("password")], "Passwords do not match").required("Password confirmation is required"),
  });

  let formik = useFormik({
    initialValues: { name: "", phone: "", email: "", password: "", rePassword: "" },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <div className="container pt-5">
      <div className="row align-content-center justify-content-center gap-4 g-3 ">
        <div className="col-md-5 pt-5  ">
          <img src={image} alt="Register" className="w-100 pt-5 mt-3 " />
        </div>
        <div className="col-md-5">
          <div className="mx-auto py-5">
            <h3 className="pt-5 text-gray-900 fw-bolder">Create an Account</h3>
            <p className="text-gray-900p fw-bolder">Join FreshCart today! Fill in your details to sign up.</p>
            {error ? <div className="alert alert-danger p-2 mt-2">{error}</div> : null}
            <form onSubmit={formik.handleSubmit}>
              <label  className="text-gray-900p fw-bolder py-2" htmlFor="name">Name</label>
              <input type="text" name="name" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} className="form-control mb-2" id="name" />
              {formik.errors.name && formik.touched.name ? <div className="alert alert-danger p-2 mt-2">{formik.errors.name}</div> : null}

              <label  className="text-gray-900p fw-bolder py-2" htmlFor="email">Email</label>
              <input type="email" name="email" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className="form-control mb-2" id="email" />
              {formik.errors.email && formik.touched.email ? <div className="alert alert-danger p-2 mt-2">{formik.errors.email}</div> : null}

              <label  className="text-gray-900p fw-bolder py-2" htmlFor="phone">Phone</label>
              <input type="tel" name="phone" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} className="form-control mb-2" id="phone" />
              {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger p-2 mt-2">{formik.errors.phone}</div> : null}

              <label  className="text-gray-900p fw-bolder py-2" htmlFor="password">Password</label>
              <div className="input-group mb-2">
                <input type={showPassword ? "text" : "password"} name="password" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className="form-control border-end-0" id="password" />
                <button type="button" className="btn border-0 border-end border-bottom border-top" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {formik.errors.password && formik.touched.password ? <div className="alert alert-danger p-2 mt-2">{formik.errors.password}</div> : null}

              <label  className="text-gray-900p fw-bolder py-2" htmlFor="rePassword">Confirm Password</label>
              <div className="input-group mb-2">
                <input type={showRePassword ? "text" : "password"} name="rePassword" onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} className="form-control border-end-0" id="rePassword" />
                <button type="button" className="btn border-0 border-end border-bottom border-top" onClick={() => setShowRePassword(!showRePassword)}>
                  {showRePassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
              {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger p-2 mt-2">{formik.errors.rePassword}</div> : null}

              {isLoading ? (
                <button className="btn bg-main text-white w-100 mt-4">
                  <Bars height="30" width="80" color="#fff" ariaLabel="bars-loading" visible={true} />
                </button>
              ) : (
                <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white w-100">Register</button>
              )}

              <div className="mt-3 align-content-center">
                <p className="text-gray-900p fw-bolder py-2">
                  Already have an account?
                  <button type="button" className="btn bg-transparent text-main fw-bold px-1" onClick={() => navigate("/login")}>
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
