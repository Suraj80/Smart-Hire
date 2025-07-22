import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import MainButton from "../../Components/Common/MainButton";

function ForgetPassword() {
  const [error, Seterror] = useState();

  const navigate = useNavigate();
  const emailValue = {
    email: "",
  };
  const emailSchema = object({
    email: string().email("*Follow format").required("*Email is must"),
  });

  // -> handle login api call
  const handleLogin = async (inputData) => {
    console.log(" i am going to run");
    const options = {
      url: "http://localhost:8080/forget-password",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: inputData,
    };

    axios(options)
      .then((response) => {
        if (response.status == 200) {
          // Expect backend to return token (if needed for navigation)
          // For now, show success and instruct user to check email for link
          alert('Check your email for the OTP and reset link.');
        }
      })
      .catch(function (error) {
        if (error.response.status == 400) {
          Seterror("Email address is required");
        } else if (error.response.status == 404) {
          Seterror("Email address not found");
        } else if (error.response.status == 401) {
          Seterror("Email address is not activated");
        } else {
          Seterror("Error processing password reset request");
        }
      });
  };
  const formik = useFormik({
    initialValues: emailValue,
    validationSchema: emailSchema,
    onSubmit: (e) => {
      handleLogin(e);
      // e.preventDefault();
      // console.log(e);
    },
  });
  // console.log(error);
  return (
    <div className="flex min-h-screen bg-background">
      <div className="m-auto shadows w-full max-w-md mx-4 sm:mx-auto p-4 sm:p-6">
        {/* Lock Icon with improved spacing and visual hierarchy */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-50 flex items-center justify-center shadow-sm">
            <img
              className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
              src="https://img.freepik.com/premium-vector/bronze-lock-icon-white-background-flat-design-illustration-stock-vector-graphics_668389-92.jpg?w=2000"
              alt="Lock icon"
            />
          </div>
        </div>

        {/* Header section with better typography hierarchy */}
        <div className="text-center mb-6">
          <h1 className="heading2 text-black mb-3 font-semibold">
            Trouble Logging In?
          </h1>
          <p className="heading3 text-gray-600 leading-relaxed max-w-sm mx-auto">
            Enter your email and we'll send you a link to get back into your account.
          </p>
        </div>

        {/* Error message display with better styling */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Form with improved spacing and visual design */}
        <form className="space-y-4" onSubmit={formik.handleSubmit}>
          <div className="space-y-2">
            <label className="label line1 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <input
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="email"
                id="email"
                type="email"
                placeholder="Enter your email address"
                className="h-12 input input-bordered w-full px-4 text-base rounded-lg border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
              />
            </div>
            {/* Error message with improved styling */}
            {formik.errors.email && formik.touched.email && (
              <div className="flex items-center space-x-1 mt-2">
                <svg className="w-4 h-4 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="text-blue-600 text-sm">{formik.errors.email}</span>
              </div>
            )}
          </div>

          {/* Submit button with improved spacing */}
          <div className="pt-2">
            <MainButton value={"Send Reset Link"} />
          </div>
        </form>

        {/* Navigation link with better styling */}
        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="heading4 text-blue-600 hover:text-blue-800 transition-colors duration-200 font-medium inline-flex items-center space-x-1 group"
          >
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Return to Login</span>
          </Link>
        </div>

        {/* Optional: Help text for additional context */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center leading-relaxed">
            If you're still having trouble, please contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;