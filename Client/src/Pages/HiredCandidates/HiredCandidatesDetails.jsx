import React from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import MainAreaOfHiredCandidateDetails from "../../Components/HiredCandidatePage/MainAreaOfHiredCandidateDetails";

function HiredCandidateDetails() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      {/* Left Sidebar - Enhanced with better spacing and shadow */}
      <div className="hidden sm:block w-64 bg-white/95 backdrop-blur-sm border-r border-slate-200/60 shadow-lg shadow-slate-200/20 h-screen sticky top-0">
        <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
          <LeftMenuBar />
        </div>
      </div>

      {/* Main Content Area - Improved layout and spacing */}
      <div className="flex-1 flex flex-col min-h-screen bg-transparent">
        {/* Top Navigation - Enhanced with better visual hierarchy */}
        <div className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
          <div className="px-6 py-4">
            <TopNavigationBar title={"Hired"} />
          </div>
        </div>

        {/* Main Content - Better container with modern spacing */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Content Container with subtle styling */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/40 overflow-hidden">
              <MainAreaOfHiredCandidateDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HiredCandidateDetails;