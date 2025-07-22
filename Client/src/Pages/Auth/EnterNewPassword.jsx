import { Alert, AlertIcon } from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { object, string, ref } from "yup";

function EnterNewPassword() {
  const [error, SetError] = useState();
  const [success, SetSuccess] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();
  
  const dataSchema = object({
    password: string()
      .max(25, "*password is too long")
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=).{8,}$/,
        "Must contain  [A-Z], [a-z] , [0-1]"
      )
      .required("*Password is must"),
    confirmpwd: string()
      .required("*Password is must")
      .oneOf([ref("password"), null], "*Both password must match"),
  });
  
  const data = {
    password: "",
    confirmpwd: "",
  };
  
  const handleSubmission = (pass) => {
    const password = pass.confirmpwd;
    const options = {
      url: "http://localhost:8080/update-password",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { token, password },
    };
    axios(options)
      .then((response) => {
        if (response.status == 200) {
          SetSuccess(true);
          SetError(false);
          setTimeout(() => {
            navigate("/login");
          }, 1500);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          SetError("Token expired or invalid");
        } else {
          SetError("⚠️  Error processing password reset request try again");
        }
      });
  };
  
  const formik = useFormik({
    initialValues: data,
    validationSchema: dataSchema,
    onSubmit: (e) => {
      handleSubmission(e);
    },
  });
  
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      {/* Success alert - positioned at top */}
      {success && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          <Alert status="success" variant="solid" borderRadius="lg">
            <AlertIcon />
            🔑 Password Updated Successfully!
          </Alert>
        </div>
      )}

      {/* Main Card */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl px-8 py-10">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="mb-2">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="heading2 text-3xl font-bold text-gray-900 mb-2">
                Enter New Password
              </h1>
              <p className="text-gray-600 text-sm">
                Create a strong password to secure your account
              </p>
            </div>
          </div>

          {/* Form Section */}
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Password Field */}
            <div className="space-y-2">
              <label className="label line1 block text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  className="input input-bordered w-full h-12 pl-4 pr-4 text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 transition-colors duration-200"
                  id="password"
                  name="password"
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                />
              </div>
              {formik.errors.password && formik.touched.password && (
                <p className="text-blue-600 text-sm mt-1 ml-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label className="label line1 block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={formik.values.confirmpwd}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="input input-bordered w-full h-12 pl-4 pr-4 text-gray-900 placeholder-gray-400 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 transition-colors duration-200"
                  id="confirmpwd"
                  name="confirmpwd"
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                />
              </div>
              {formik.errors.confirmpwd && formik.touched.confirmpwd && (
                <p className="text-blue-600 text-sm mt-1 ml-1">
                  {formik.errors.confirmpwd}
                </p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-700 font-medium text-sm">
                    {error}
                  </p>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="btnfont btn btn-wide w-full h-12 bg-primary text-white font-semibold rounded-xl hover:bg-black transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-4 focus:ring-primary/20 border-none shadow-lg"
              >
                Update Password
              </button>
            </div>

            {/* Password Requirements */}
            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Contains uppercase letter (A-Z)
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Contains lowercase letter (a-z)
                </li>
                <li className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
                  Contains at least one number (0-9)
                </li>
              </ul>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EnterNewPassword;