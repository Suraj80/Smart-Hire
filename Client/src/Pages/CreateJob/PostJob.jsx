import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";

import Confetti from "react-confetti";

function PostJob() {
  const navigate = useNavigate();
  const [apiFetched, setAPIFetched] = useState(false);
  const [description, setDescription] = useState("");

  const [formData, setFormData] = useState({
    postition: "",
    office_location: "",
    department: "",
    job_type: "",
    no_of_seats: "",
    salary_range_from: "",
    salary_range_upto: "",
  });
  const [department, setDepartments] = useState([]);
  const [officeLocation, setOfficeLocation] = useState();
  const count = useSelector(
    (state) => state.OrganizationDetailsReducer.apiData
  );
  
  var org_data = [];
  org_data.push(count?.[8][1]);
  org_data.push(count?.[9][1]);
  org_data.push(count?.[2][1]);
  org_data.push(count?.[0][1]);

  const imgFilehandler = (e) => {
    if (e.target.files.length !== 0) {
      uploadimg((imgfile) => [
        ...imgfile,
        URL.createObjectURL(e.target.files[0]),
      ]);
    }
  };

  const handleSubmit = async () => {
    const options = {
      url: "http://localhost:8080/job/post",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        form: formData,
        description: description,
        org_details: org_data,
      },
    };

    axios(options).then((response) => {
      if (response.status == 200) {
        setAPIFetched(true);
      } else {
        alert("something went wrong try again");
      }
    });
  };

  console.log(formData);
  
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="hidden sm:block w-2/12 bg-white shadow-sm">
        <LeftMenuBar />
      </div>
      
      {/* Main Content */}
      <div className="w-full">
        {/* Top Navigation */}
        <div className="bg-white shadow-sm">
          <TopNavigationBar title={"Jobs"} />
        </div>

        {/* Success Modal */}
        {apiFetched && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Confetti 
              width={window.innerWidth} 
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
            />
            
            <div className="bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full transform animate-pulse">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12,0A12,12,0,1,0,24,12,12,12,0,0,0,12,0ZM11.52,17L6,12.79l1.83-2.37L11.14,13l4.51-5.08,2.24,2Z" />
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold text-gray-900 mb-3">
                  Congratulations! 🎉
                </h2>
                <p className="text-gray-600 mb-8">
                  Your job posting has been created successfully and is now live.
                </p>
                
                <button
                  onClick={() => navigate("/jobs")}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-105"
                >
                  View All Jobs
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Form Container */}
        <div className="max-w-4xl mx-auto p-6">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-700 px-8 py-12 text-center">
              <h1 className="text-3xl font-bold text-white mb-3">
                Create New Job Opening
              </h1>
              <p className="text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Post a new position to attract top talent. Fill out the details below to create 
                your job listing and start receiving applications from qualified candidates.
              </p>
            </div>

            {/* Form Content */}
            <div className="p-8">
              <div className="space-y-8">
                {/* Basic Information Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Position Input */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.postition}
                        onChange={(e) => {
                          setFormData((oldValue) => ({
                            ...oldValue,
                            postition: e.target.value,
                          }));
                        }}
                        placeholder="e.g. Senior Software Engineer"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    {/* Office Location */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Office Location <span className="text-red-500">*</span>
                      </label>
                      <select
                        onClick={(e) => {
                          setFormData((old) => ({
                            ...old,
                            office_location: e.target.value,
                          }));
                        }}
                        value={formData.office_location}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                      >
                        <option disabled value="">
                          Select office location
                        </option>
                        <option value={count?.[8][1]}>{count?.[8][1]}</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Job Details Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                    Job Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Department */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <select
                        onChange={(e) => {
                          setFormData((old) => ({
                            ...old,
                            department: e.target.value,
                          }));
                        }}
                        value={formData.department}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                      >
                        <option disabled value="">
                          Select Department
                        </option>
                        {count?.[6][1].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Job Type */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Job Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        onChange={(e) => {
                          setFormData((old) => ({
                            ...old,
                            job_type: e.target.value,
                          }));
                        }}
                        value={formData.job_type}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white"
                      >
                        <option disabled value="">
                          Select Job Type
                        </option>
                        <option value="Full Time">Full Time</option>
                        <option value="Part Time">Part Time</option>
                        <option value="Remote Based">Remote</option>
                        <option value="Project Based">Project Based</option>
                        <option value="Hourly">Hourly</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Position Details Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                    Position Details
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Number of Seats */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Number of Positions
                      </label>
                      <input
                        type="number"
                        min={1}
                        placeholder="1"
                        value={formData.no_of_seats}
                        onChange={(e) => {
                          setFormData((old) => ({
                            ...old,
                            no_of_seats: e.target.value,
                          }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    {/* Salary Range From */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Salary From ($)
                      </label>
                      <input
                        type="number"
                        min={1}
                        placeholder="60,000"
                        value={formData.salary_range_from}
                        onChange={(e) => {
                          setFormData((old) => ({
                            ...old,
                            salary_range_from: e.target.value,
                          }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>

                    {/* Salary Range To */}
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Salary To ($)
                      </label>
                      <input
                        type="number"
                        min={1}
                        placeholder="120,000"
                        value={formData.salary_range_upto}
                        onChange={(e) => {
                          setFormData((old) => ({
                            ...old,
                            salary_range_upto: e.target.value,
                          }));
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* Job Description Section */}
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                    Job Description
                  </h3>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Detailed Description <span className="text-red-500">*</span>
                    </label>
                    <div className="border border-gray-300 rounded-lg overflow-hidden">
                      <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        placeholder="Describe the role, responsibilities, requirements, and what makes this position exciting..."
                        className="bg-white"
                        style={{ minHeight: '200px' }}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      Provide a comprehensive description including responsibilities, requirements, and benefits.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-gray-200">
                  <div className="flex justify-end">
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-700 hover:to-purple-800 text-white font-semibold py-4 px-8 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg"
                    >
                      <span className="flex items-center">
                        Post Job Opening
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostJob;