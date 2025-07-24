import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

import {
  FcAssistant,
  FcDataSheet,
  FcGraduationCap,
  FcHome,
  FcInvite,
} from "react-icons/fc";

function ReccomendedCandidateDetailsCard({ id, user, SetUser, setID }) {
  useEffect(() => {
    if (!id) return;

    const getCanidateDetails = () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/details/active/reccomended/details",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id },
      };

      axios(options)
        .then((response) => {
          if (response.status === 200 && response.data) {
            SetUser(response.data);
            setID(response.data._id);
          } else {
            console.error("Failed to fetch candidate details:", response);
          }
        })
        .catch((error) => {
          console.error("Error fetching candidate details:", error);
        });
    };

    getCanidateDetails();
  }, [id, SetUser, setID]);

  var educationLevelLastValue = user?.level.slice(-1)[0];

  const calculateFeebackPercentage = (feedback) => {
    let rating = 0;
    for (let i = 0; i < feedback?.length; i++) {
      if (feedback[i] == 0) {
        rating += 0;
      } else {
        rating += feedback[i] * 4;
      }
    }
    return rating;
  };
  const rating = calculateFeebackPercentage(user?.feedback_form);

  return (
    <div className="flex flex-col lg:flex-row bg-gray-50 rounded-xl shadow-lg overflow-hidden">
      {/* ****************************************************
        THIS IS 1ST DIV SHOWING PROFILE PICTURE AND RATING
        **************************************************** */}
      <div className="flex flex-col items-center w-full lg:w-2/6 p-6 lg:p-8 bg-white border-b-2 lg:border-b-0 lg:border-r-2 border-gray-100">
        {/* Profile Image Container */}
        <div className="relative mb-6">
          <img
            width={180}
            height={240}
            className="rounded-xl shadow-md object-cover border-2 border-gray-200 hover:shadow-lg transition-shadow duration-300"
            src={user?.ResumeURL}
            alt="Candidate Resume"
            srcSet=""
          />
        </div>

        {/* View Resume Button */}
        <label
          htmlFor="my-modal-3"
          className="btn bg-secondry border-none hover:bg-opacity-90 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:shadow-md cursor-pointer"
        >
          📄 View Resume
        </label>

        {/* Modal for Resume */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box relative max-w-6xl h-full bg-white rounded-xl">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-200 hover:bg-gray-300 border-none z-10"
            >
              ✕
            </label>
            <object
              className="rounded-lg mt-12"
              data={user?.profilePic}
              type="application/pdf"
              width="100%"
              height="100%"
            ></object>
          </div>
        </div>

        {/* Interview Rating Section */}
        <div className="mt-8 text-center">
          <h3 className="heading2b text-gray-800 mb-4 font-semibold">
            Interview Rating
          </h3>
          
          <div className="relative mb-4">
            <div className="bg-gradient-to-br from-gray-600 to-gray-700 p-6 w-24 h-24 flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="heading4 text-white font-bold">{rating}%</p>
            </div>
            {/* Rating indicator ring */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-300 opacity-20"></div>
          </div>
          
          <p className="heading3b italic text-gray-600 text-sm">
            Performance Score
          </p>
        </div>
      </div>

      {/* ****************************************************
        THIS IS 2nd DIV SHOWING CANDIDATE DETAILS
        **************************************************** */}
      <div className="w-full p-6 lg:p-8 bg-white">
        {/* Candidate Name Header */}
        <div className="mb-8 pb-4 border-b border-gray-200">
          <h2 className="heading2 text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            {user?.firstName + " " + user?.lastName}
          </h2>
          <div className="w-16 h-1 bg-secondry rounded-full"></div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 rounded-xl p-6">
          {/* City */}
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0">
              <FcHome className="text-3xl" />
            </div>
            <div className="flex-grow">
              <h4 className="heading4 font-semibold text-gray-700 mb-1">City</h4>
              <p className="heading4 text-gray-600">{user?.city || "Not specified"}</p>
            </div>
          </div>

          {/* Date of Birth */}
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0">
              <FcDataSheet className="text-3xl" />
            </div>
            <div className="flex-grow">
              <h4 className="heading4 font-semibold text-gray-700 mb-1">Date of Birth</h4>
              <p className="heading4 text-gray-600">{user?.dob || "Not specified"}</p>
            </div>
          </div>

          {/* Education */}
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0">
              <FcGraduationCap className="text-3xl" />
            </div>
            <div className="flex-grow">
              <h4 className="heading4 font-semibold text-gray-700 mb-1">Last Degree</h4>
              <p className="heading4 text-gray-600">{educationLevelLastValue || "Not specified"}</p>
            </div>
          </div>

          {/* Interview Date */}
          <div className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0">
              <FcAssistant className="text-3xl" />
            </div>
            <div className="flex-grow">
              <h4 className="heading4 font-semibold text-gray-700 mb-1">Interview Date</h4>
              <p className="heading4 text-gray-600">{user?.interviewDate || "Not scheduled"}</p>
            </div>
          </div>

          {/* Email - Full width on larger screens */}
          <div className="md:col-span-2 flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex-shrink-0">
              <FcInvite className="text-3xl" />
            </div>
            <div className="flex-grow">
              <h4 className="heading4 font-semibold text-gray-700 mb-1">Email Address</h4>
              <p className="heading4 text-gray-600 break-all">{user?.emailAddress || "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReccomendedCandidateDetailsCard;