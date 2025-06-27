import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FilterProfiles from "../../Components/Dashboard/CreateJob/FIlterProfiles";
import TopRcruitementCycle from "../../Components/Dashboard/CreateJob/TopRcruitementCycle";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import ShowMoreIcon from "../../assets/icons/show_more.svg";
import NoUser from "../../assets/illustrations/no_user.svg";

function JobDetails() {
  const { id } = useParams();
  const [candidates, setCandidates] = useState();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  useEffect(() => {
    const fetchData = () => {
      // dispath(startFetchingCandidatesData());
      // axios POST request
      const options = {
        url: "http://localhost:8080/details/active/applied",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: {
          job_id: id,
        },
      };

      axios(options)
        .then((response) => {
          setCandidates(response.data);
          // dispath(sucessOnFetchingCandidatesData(response.data));
        })
        .catch((e) => {
          // dispath(errorFetchingCandidatesData(e));
        });
    };

    fetchData();
  }, [0]);

  //To handle nabvigation and move user to next page
  const navigate = useNavigate();
  const handleNavigation = (e) => {
    navigate(`/JobDetails/applied/${e}`);
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  // Close filter when clicking outside on mobile
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsFilterOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden sm:block w-2.3/12 h-screen sticky top-0">
        <LeftMenuBar />
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full">
          {/* Top Navigation */}
          <div className="bg-white shadow-sm border-b border-gray-200">
            <TopNavigationBar title={"Applied"} />
          </div>
          
          {/* Recruitment Cycle */}
          <div className="bg-white border-b border-gray-100">
            <TopRcruitementCycle id={id} />
          </div>

          {/* Main Content Area */}
          <div className="relative flex gap-6 p-6 h-full">
            {/* Filter Overlay for Mobile */}
            {isFilterOpen && (
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
                onClick={handleOverlayClick}
              />
            )}

            {/* Collapsible Filter Sidebar */}
            <div className={`
              fixed sm:relative 
              top-0 left-0 sm:left-auto
              h-full sm:h-auto
              w-80 sm:w-80
              bg-white sm:bg-transparent
              shadow-xl sm:shadow-none
              z-50 sm:z-auto
              transform sm:transform-none
              transition-transform duration-300 ease-in-out
              ${isFilterOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'}
              ${isFilterOpen ? 'sm:block' : 'hidden sm:hidden'}
              flex-shrink-0
            `}>
              <div className="sticky top-6 p-4 sm:p-0">
                {/* Close button for mobile */}
                <div className="flex justify-between items-center mb-4 sm:hidden">
                  <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                  <button
                    onClick={toggleFilter}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <FilterProfiles can={candidates} setCan={setCandidates} />
              </div>
            </div>

            {/* Candidates List */}
            <div className="flex-1 min-w-0">
              <div className="space-y-4">
                {candidates?.length !== 0 ? (
                  <>
                    {/* Results Header with Filter Button */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-2xl font-bold text-gray-900">
                          Applied Candidates
                        </h2>
                        <button
                          onClick={toggleFilter}
                          className={`
                            flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200
                            ${isFilterOpen 
                              ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' 
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                            }
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                          `}
                        >
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={2} 
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" 
                            />
                          </svg>
                          <span className="font-medium">
                            {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
                          </span>
                        </button>
                      </div>
                      <p className="text-gray-600">
                        {candidates?.length || 0} candidate{candidates?.length !== 1 ? 's' : ''} found
                      </p>
                    </div>

                    {/* Candidates Grid */}
                    <div className="grid gap-4">
                      {candidates?.map((candidate, index) => (
                        <div
                          key={index}
                          onClick={() => handleNavigation(candidate._id)}
                          className="group bg-white rounded-xl border border-gray-200 p-6 cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-blue-200 hover:-translate-y-1 active:transform-none"
                        >
                          <div className="flex items-start gap-6">
                            {/* Profile Picture */}
                            <div className="flex-shrink-0">
                              <div className="relative">
                                <img
                                  src={candidate?.ResumeURL}
                                  alt={`${candidate.firstName} ${candidate.lastName}`}
                                  className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-200"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
                              </div>
                            </div>

                            {/* Candidate Info */}
                            <div className="flex-1 min-w-0">
                              {/* Name and Status */}
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                    {candidate.firstName} {candidate.lastName}
                                  </h3>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 border">
                                    Applied
                                  </span>
                                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-100 rounded-lg">
                                    <img
                                      src={ShowMoreIcon}
                                      width={18}
                                      alt="More options"
                                      className="w-5 h-5"
                                    />
                                  </button>
                                </div>
                              </div>

                              {/* Stats Cards */}
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                {/* Experience Card */}
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 text-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-200">
                                  <div className="text-blue-600 font-medium text-sm mb-1">
                                    Experience
                                  </div>
                                  <div className="text-blue-900 font-bold text-lg">
                                    {candidate.duration[0]}
                                    <span className="text-sm font-normal ml-1">years</span>
                                  </div>
                                </div>

                                {/* Education Card */}
                                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 text-center group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-200">
                                  <div className="text-purple-600 font-medium text-sm mb-1">
                                    Education
                                  </div>
                                  <div className="text-purple-900 font-bold text-base truncate">
                                    {candidate.level[0]}
                                  </div>
                                </div>

                                {/* Location Card */}
                                <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 text-center group-hover:from-green-100 group-hover:to-green-200 transition-all duration-200">
                                  <div className="text-green-600 font-medium text-sm mb-1">
                                    Location
                                  </div>
                                  <div className="text-green-900 font-bold text-base truncate">
                                    {candidate.city}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  // Empty State
                  <div className="flex flex-col items-center justify-center py-20 px-6">
                    <div className="w-64 h-64 mb-8">
                      <img
                        src={NoUser}
                        alt="No candidates found"
                        className="w-full h-full object-contain opacity-80"
                      />
                    </div>
                    <div className="text-center max-w-md">
                      <h2 className="text-2xl font-bold text-gray-900 mb-3">
                        No Applied Candidates
                      </h2>
                      <p className="text-gray-600 text-lg leading-relaxed">
                        There are currently no candidates who have applied for this position. 
                        Check back later or review your job posting to attract more applicants.
                      </p>
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

export default JobDetails;