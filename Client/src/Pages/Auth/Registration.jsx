import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { object, string, ref } from "yup";
import MainButton from "../../Components/Common/MainButton";
import ErrorLogo from "../../assets/icons/error.png";

function Registration() {
  const [error, Seterror] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const navigate = useNavigate();
  let userSchema = object({
    f_name: string().max(10, "*Keep it short").required("*Name is required"),
    username: string().max(10, "*Keep it short").required("*Name is required"),
    email: string()
      .email("*Follow abc@domain.com format")
      .required("*Email is must"),
    company_name: string()
      .max(30, "*Name is too long")
      .required("*Company name is must"),
    password: string()
      .max(25, "*password is too long")
      .matches(
        /^(?=.*?[0-9])(?=.*?[A-Z])(?=).{8,}$/,
        "Must contain  [A-Z], [a-z] , [0-1] and length >=8"
      )
      .required("*Password is must"),
    confirm_password: string()
      .required("*Password is must")
      .oneOf([ref("password"), null], "*Both password must match"),
  });

  const values = {
    f_name: "",
    username: "",
    email: "",
    company_name: "",
    password: "",
    confirm_password: "",
  };

  const handleRegitser = async (inputData) => {
    const options = {
      url: "http://localhost:8080/register",
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
          console.log(200);
          localStorage.setItem("email", inputData.email);
          onOpen();
        }
      })
      .catch(function (error) {
        if (error.response.status == 409) {
          console.log("alredy exsists");
          Seterror("Username or email already taken");
        } else if (error.response.status == 400) {
          Seterror(
            "Enter Email in format OR Password greater than 8 character"
          );
        } else {
          Seterror("An error occurred while saving the user.");
        }
      });
  };
  const formik = useFormik({
    initialValues: values,
    validationSchema: userSchema,
    onSubmit: (values) => {
      handleRegitser(values);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[500px]">
          {/* Left Panel - Image */}
          <div className="lg:w-2/5 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 z-10"></div>
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1486175060817-5663aacc6655?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTV8fGJ1aWxkaW5nc3xlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Smart Hire"
            />
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center text-white p-6">
                <h3 className="text-3xl font-bold mb-4">Welcome to Smart Hire</h3>
                <p className="text-lg opacity-90">Join thousands of companies finding their perfect candidates</p>
              </div>
            </div>
          </div>

          {/* Right Panel - Form */}
          <div className="lg:w-3/5 p-4 lg:p-8 flex flex-col justify-center">
            <div className="mb-6 text-center">
              <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-600">Start your recruitment journey today</p>
            </div>

            {/* Success Modal */}
            <Modal
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
              size={"xl"}
            >
              <ModalOverlay bg="blackAlpha.600" />
              <ModalContent borderRadius="xl" p={4}>
                <ModalHeader fontSize="2xl" fontWeight="bold" color="green.600">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    Account Created Successfully!
                  </div>
                  <hr className="mt-4 border-gray-200" />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody py={6}>
                  <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      ✅ User Registration Successful
                    </h3>
                    <p className="text-gray-700">
                      Your account has been created successfully for{" "}
                      <span className="font-bold text-blue-600">{formik.values.email}</span>
                    </p>
                    <p className="text-gray-600 mt-2 text-sm">
                      You can now proceed to login and start using Smart Hire.
                    </p>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => navigate("/login")}
                    colorScheme="blue"
                    size="lg"
                    borderRadius="lg"
                    px={8}
                  >
                    Go to Login
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
              {/* Name and Username Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="f_name">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={formik.values.f_name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="f_name"
                    id="f_name"
                    placeholder="Enter your first name"
                    autoComplete="given-name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                  {formik.errors.f_name && formik.touched.f_name && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.f_name}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="username">
                    Username
                  </label>
                  <input
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="username"
                    id="username"
                    type="text"
                    placeholder="Choose a username"
                    autoComplete="username"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                  {formik.errors.username && formik.touched.username && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.username}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="email">
                  Email Address
                </label>
                <input
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                />
                {formik.errors.email && formik.touched.email && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Company Name */}
              <div className="space-y-1">
                <label className="block text-sm font-semibold text-gray-700" htmlFor="company_name">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. META Inc"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={formik.values.company_name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="company_name"
                  id="company_name"
                  autoComplete="organization"
                />
                {formik.errors.company_name && formik.touched.company_name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formik.errors.company_name}
                  </p>
                )}
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="Create a strong password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="password"
                    id="password"
                    autoComplete="new-password"
                  />
                  {formik.errors.password && formik.touched.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-start gap-1">
                      <svg className="w-3 h-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span>{formik.errors.password}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-semibold text-gray-700" htmlFor="confirm_password">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    value={formik.values.confirm_password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="confirm_password"
                    id="confirm_password"
                  />
                  {formik.errors.confirm_password && formik.touched.confirm_password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {formik.errors.confirm_password}
                    </p>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-red-800 font-medium text-sm">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl"
                >
                  Create Account
                </button>
              </div>

              {/* Login Link */}
              <div className="text-center pt-2">
                <p className="text-gray-600 text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200 hover:underline"
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;