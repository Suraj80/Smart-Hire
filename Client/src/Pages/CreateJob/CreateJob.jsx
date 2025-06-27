import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CreatedJobElement from "../../Components/Dashboard/CreateJob/CreatedJobElement";
import CreateJobHeadaer from "../../Components/Dashboard/CreateJob/CreateJobHeadaer";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";

function CreateJob() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        // axios POST request
        const options = {
          url: "http://localhost:8080/job/get-jobs",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: { id: localStorage.getItem("organization_id") },
        };

        const response = await axios(options);
        setData(response.data.jobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Main Layout Container */}
      <div className="flex">
        {/* Sidebar - Enhanced with subtle shadow and better spacing */}
        <div className="hidden sm:block w-2/12 bg-white border-r border-slate-200 shadow-sm">
          <div className="sticky top-0 h-screen">
            <LeftMenuBar />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          {/* Top Navigation - Enhanced with better contrast */}
          <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10">
            <TopNavigationBar title={"Jobs"} />
          </div>

          {/* Content Container with improved spacing and layout */}
          <div className="p-6 md:p-8 space-y-8">
            {/* Header Section - Enhanced with better visual hierarchy */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                    </svg>
                  </div>
                  Job Management
                </h1>
                <p className="text-slate-600 mt-2">Create, manage, and track your job postings</p>
              </div>
              <div className="p-6">
                <CreateJobHeadaer setData={setData} />
              </div>
            </div>

            {/* Jobs Grid Section - Enhanced with better loading state and layout */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    Your Job Listings
                  </h2>
                  {data && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                      {data.length} {data.length === 1 ? 'Job' : 'Jobs'}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {isLoading ? (
                  // Enhanced Loading State
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="text-slate-600 font-medium">Loading your jobs...</p>
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                  </div>
                ) : data && data.length > 0 ? (
                  // Enhanced Jobs Grid
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <CreatedJobElement data={data} setData={setData} />
                  </div>
                ) : (
                  // Enhanced Empty State
                  <div className="flex flex-col items-center justify-center py-20 space-y-6">
                    <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center">
                      <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div className="text-center space-y-2">
                      <h3 className="text-xl font-semibold text-slate-800">No jobs found</h3>
                      <p className="text-slate-600 max-w-md">
                        You haven't created any job postings yet. Start by creating your first job posting to attract top talent.
                      </p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-slate-500 bg-slate-50 px-4 py-2 rounded-lg">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Use the "Create New Job" button above to get started</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateJob;