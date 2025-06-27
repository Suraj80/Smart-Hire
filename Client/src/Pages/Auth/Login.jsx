import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { object, string } from "yup";
import MainButton from "../../Components/Common/MainButton";
import ErrorLogo from "../../assets/icons/error.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  // -> To handle error's
  const [error, SetError] = useState();

  const navigate = useNavigate();
  // -> Form schema using yup
  const formSchema = object({
    email: string()
      .email("*Follow email @ format")
      .required("*Enter email address"),
    password: string()
      .min(8, "Mimumum 8 character")
      .required("*Password is must"),
  });
  // - > intial user data
  const user_data = {
    email: "",
    password: "",
  };
  // -> handle login api call
  const handleLogin = async (inputData) => {
    const options = {
      url: "http://localhost:8080/login",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: inputData,
    };

    axios(options)
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          localStorage.setItem("email", inputData.email);
          navigate("/dashboard");
        }
      })
      .catch(function (error) {
        console.log(error);
        if (error.response) {
          if (error.response.status == 404) {
            SetError("No user found");
          } else if (error.response.status == 403) {
            SetError(
              "Email isn't verified, kindly first verify your email address."
            );
          } else if (error.response.status == 401) {
            SetError("Incorrect password.");
          } else if (error.response.status == 400) {
            SetError("All fields are required.");
          } else {
            SetError("Something went wrong.");
          }
        } else {
          SetError("No response from server. Please check your network or try again later.");
        }
      });
  };

  const formik = useFormik({
    initialValues: user_data,
    validationSchema: formSchema,
    onSubmit: (e) => {
      handleLogin(e);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          {/* Left Panel - Form */}
          <div className="flex-1 p-6 lg:p-8">
            <div className="max-w-sm mx-auto">
              {/* Header */}
              <div className="text-center mb-6">
                <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  Smart Hire
                </h1>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                    <img
                      className="w-10 h-10 object-contain filter brightness-0 invert"
                      src="https://1000logos.net/wp-content/uploads/2022/07/Logo-ATT.png"
                      alt="Logo"
                    />
                  </div>
                </div>
                <p className="text-gray-600 text-base">Welcome back! Please sign in to your account</p>
              </div>

              {/* Form */}
              <form className="space-y-4" onSubmit={formik.handleSubmit}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      className={`w-full px-3 py-2.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                        formik.errors.email && formik.touched.email
                          ? 'border-red-300 focus:border-red-500 bg-red-50'
                          : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300'
                      }`}
                      id="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      placeholder="Enter your email address"
                      autoComplete="on"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                  {formik.errors.email && formik.touched.email && (
                    <p className="text-red-500 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.email}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      className={`w-full px-3 py-2.5 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-0 ${
                        formik.errors.password && formik.touched.password
                          ? 'border-red-300 focus:border-red-500 bg-red-50'
                          : 'border-gray-200 focus:border-blue-500 bg-white hover:border-gray-300'
                      }`}
                      id="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      autoComplete="on"
                      placeholder="Enter your password"
                    />
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                  </div>
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-red-500 text-sm font-medium flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forget Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                    />
                    <label className="ml-2 text-sm text-gray-600 font-medium">
                      Keep me logged in
                    </label>
                  </div>
                  <Link 
                    to="/forgetpwd" 
                    className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
                    <div className="flex items-center">
                      <img
                        width={20}
                        src={ErrorLogo}
                        alt="Error"
                        className="mr-3 flex-shrink-0"
                      />
                      <p className="text-red-700 font-medium">{error}</p>
                    </div>
                  </div>
                )}

                {/* Login Button */}
                <div className="pt-2">
                  <MainButton value={"Sign In"} />
                </div>
              </form>

              {/* Divider */}
              <div className="my-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500 font-medium">Or continue with</span>
                  </div>
                </div>
              </div>

              {/* Sign Up & Explore Links */}
              <div className="space-y-3 text-center">
                <p className="text-gray-600 text-sm">
                  Don't have an account yet?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                  >
                    Sign up here
                  </Link>
                </p>
                <p className="text-gray-600 text-sm">
                  Want to explore jobs?{" "}
                  <Link
                    to="/portal/job"
                    className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-800 hover:bg-gray-900 text-white text-sm font-medium transition-colors duration-200"
                  >
                    View Jobs
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Panel - Image */}
          <div className="hidden lg:block lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
            <img
              className="h-full w-full object-cover"
              src="https://images.pexels.com/photos/290275/pexels-photo-290275.jpeg?_gl=1*1ghx0td*_ga*MTg3NTA5MDIyMS4xNzQ5NjE4MTA5*_ga_8JE65Q40S6*czE3NTA5Mzc0MjMkbzIkZzAkdDE3NTA5Mzc0MjMkajYwJGwwJGgw"
              alt="Login Background"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-3xl font-bold mb-4">Welcome to Smart Hire</h2>
                <p className="text-xl opacity-90">Your gateway to finding the perfect career opportunity</p>
                <div className="mt-8 flex justify-center space-x-2">
                  <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="w-2 h-2 bg-white rounded-full opacity-50"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;