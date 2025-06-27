import React from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import TopRcruitementCycle from "../../Components/Dashboard/CreateJob/TopRcruitementCycle";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import SwitchStatus from "../../Components/RecruitmentStage/SwitchStatus";
import AppliedApplicantProfile from "./AppliedApplicantProfile";

function AppliedCandidateDetails() {
  const { id } = useParams();

  const notify = () => toast("Wow so easy !");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40">
      {/* Main Layout Container */}
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden sm:block w-64 bg-white/95 backdrop-blur-sm border-r border-slate-200/60 shadow-lg shadow-slate-200/40 h-screen sticky top-0 z-10">
          <LeftMenuBar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-h-screen">
          {/* Header Section */}
          <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-20">
            <TopNavigationBar title={"Applied Candidates"} />
          </div>

          {/* Content Container */}
          <div className="p-6 space-y-6">
            {/* Recruitment Cycle Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg shadow-slate-200/50 border border-slate-200/60 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <h2 className="text-white font-semibold text-lg tracking-wide">
                  Recruitment Process
                </h2>
              </div>
              <div className="p-6">
                <TopRcruitementCycle id={id} />
              </div>
            </div>

            {/* Status Control Section */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md shadow-slate-200/40 border border-slate-200/50 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Application Status
                  </h3>
                </div>
                <SwitchStatus id={id} />
              </div>
            </div>

            {/* Candidate Profile Section */}
            <div className="max-w-5xl mx-auto">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-xl shadow-slate-200/60 border border-slate-200/50 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-slate-50 to-blue-50/50 px-8 py-6 border-b border-slate-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">
                        Candidate Profile
                      </h2>
                      <p className="text-slate-600 text-sm">
                        Detailed information and application status
                      </p>
                    </div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="p-8">
                  <AppliedApplicantProfile id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="mt-16"
        toastClassName="bg-white shadow-xl border border-slate-200 rounded-lg"
        bodyClassName="text-slate-700 font-medium"
        progressClassName="bg-gradient-to-r from-blue-500 to-indigo-500"
      />
    </div>
  );
}

export default AppliedCandidateDetails;