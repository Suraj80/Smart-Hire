import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PostedJobDescription() {
  const { id } = useParams();
  const [details, setDetails] = useState();
  
  const fetchJobDescription = () => {
    // axios POST request
    const options = {
      url: "http://localhost:8080/job/get-jobs/details",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { id: id },
    };

    axios(options).then((response) => {
      setDetails(response.data.jobs[0]);
    });
  };
  
  useEffect(() => {
    fetchJobDescription();
  }, []);
  
  console.log(details);
  const navigate = useNavigate();
  
  const handle = () => {
    const { org_id, _id } = details;
    navigate(`/portal/job/apply/${_id}`, {
      state: { orgID: org_id },
    });
  };

  // Loading state
  if (!details) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading job details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white bg-opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-purple-300 bg-opacity-20 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 bg-opacity-10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {details?.jobPosition}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-4 mt-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-medium">
                <span className="text-blue-200">Company:</span> {details?.org_name}
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-2 text-white font-medium">
                <span className="text-green-200">Positions:</span> {details?.numberOfSeats}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          
          {/* Salary & Quick Info */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-8 border-b border-gray-100">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-emerald-100">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-800">Salary Range</h3>
                </div>
                <p className="text-2xl font-bold text-emerald-600">
                  ₹{details?.salaryRangeFrom?.toLocaleString()} - ₹{details?.salaryRangeUpto?.toLocaleString()}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-800">Open Positions</h3>
                </div>
                <p className="text-2xl font-bold text-blue-600">
                  {details?.numberOfSeats} {details?.numberOfSeats === 1 ? 'Position' : 'Positions'}
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-purple-100">
                <div className="flex items-center mb-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-800">Company</h3>
                </div>
                <p className="text-xl font-bold text-purple-600 truncate" title={details?.org_name}>
                  {details?.org_name}
                </p>
              </div>
            </div>
          </div>

          {/* Job Description */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Job Description</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-700 leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: details?.job_description }}
              ></div>
            </div>

            {/* Apply Button */}
            <div className="mt-12 text-center">
              <button 
                className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                onClick={handle}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                <span className="relative flex items-center">
                  Apply Now
                  <svg className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
              
              <p className="mt-4 text-gray-500 text-sm">
                Ready to take the next step in your career?
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Application Tips
            </h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Review the job requirements carefully</li>
              <li>• Prepare your updated resume</li>
              <li>• Highlight relevant experience</li>
              <li>• Be ready for potential follow-up questions</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              Next Steps
            </h3>
            <ul className="text-gray-600 space-y-2 text-sm">
              <li>• Click "Apply Now" to proceed</li>
              <li>• Fill out the application form</li>
              <li>• Upload required documents</li>
              <li>• Wait for confirmation email</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostedJobDescription;