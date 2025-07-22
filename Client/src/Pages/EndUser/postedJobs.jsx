import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Banner from "../../assets/illustrations/job.png";

function PostedJobs() {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8080/job/get-all-jobs"
      );
      setData(response.data.fetchAllPostedJobs);
    };

    fetchData();
  }, [0]);

  const navigate = useNavigate();
  const handleMe = (id) => {};

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Go Back Button */}
      <div className="relative z-20 px-4 sm:px-6 lg:px-8 pt-6 flex justify-start">
        <button
          onClick={() => navigate("/")}
          className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2 rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Go Back to Smart Hire</span>
        </button>
      </div>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="text-white">Find Your </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Dream
                  </span>
                  <span className="text-white"> Job</span>
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 font-light">
                  Simply fill the form and
                  <a href="#jobs">
  <span className="inline-block ml-3 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-purple-500/25 transform hover:scale-105">
    Get Hired
  </span>
</a>
                </p>
              </div>
              
              {/* Stats or Features */}
              <div className="flex flex-wrap gap-6 mt-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">{data?.length || 0}+</div>
                  <div className="text-gray-300 text-sm">Active Jobs</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">100+</div>
                  <div className="text-gray-300 text-sm">Companies</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                  <div className="text-2xl font-bold text-white">95%</div>
                  <div className="text-gray-300 text-sm">Success Rate</div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <img
                  src={Banner}
                  className="relative z-10 w-full max-w-md lg:max-w-lg object-contain drop-shadow-2xl"
                  alt="Job search illustration"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div id="jobs" className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl p-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Available Opportunities
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Discover amazing career opportunities from top companies. Click on any position to learn more and apply.
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mt-6 rounded-full"></div>
            </div>

            {/* Loading State */}
            {!data && (
              <div className="flex justify-center items-center py-20">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
                  <p className="text-gray-300 mt-4 text-center">Loading opportunities...</p>
                </div>
              </div>
            )}

            {/* Jobs Grid */}
            {data && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {data.map((job, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleMe(navigate(`/portal/job/description/${job._id}`))
                    }
                    className="group cursor-pointer relative overflow-hidden bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 p-6 transition-all duration-300 hover:bg-white/20 hover:border-purple-400/50 hover:shadow-2xl hover:shadow-purple-500/20 hover:-translate-y-2"
                  >
                    {/* Card Background Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Card Content */}
                    <div className="relative z-10">
                      {/* Job Icon */}
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8v10m4-10v10m4-10v10" />
                        </svg>
                      </div>

                      {/* Job Title */}
                      <h3 className="text-lg font-semibold text-white mb-3 line-clamp-2 group-hover:text-purple-300 transition-colors duration-300">
                        {job.jobPosition}
                      </h3>

                      {/* Job Details (if you want to add them later) */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-gray-400 text-sm">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          <span>Full-time Position</span>
                        </div>
                      </div>

                      {/* Action Indicator */}
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400 text-sm font-medium">View Details</span>
                        <svg className="w-4 h-4 text-purple-400 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Empty State */}
            {data && data.length === 0 && (
              <div className="text-center py-20">
                <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M8 8v10m4-10v10m4-10v10" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No Jobs Available</h3>
                <p className="text-gray-400">Check back soon for new opportunities!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="relative z-10 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 text-center">
            <div className="flex items-center justify-center space-x-2 text-gray-300">
              <span className="text-sm">Powered by</span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Smart Hire
              </span>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Your gateway to amazing career opportunities</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PostedJobs;