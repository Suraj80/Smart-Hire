import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NoUserSVG from "../../assets/illustrations/no_user.svg";
import { MdDoneAll, MdRemoveDone } from "react-icons/md";

function InterviewingCandidateListCard({ id }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchAllInterviewingCanidate = () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/details/active/interviewing",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id },
      };

      axios(options)
        .then((response) => {
          if (response.status == 200) {
            setUser(response.data);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchAllInterviewingCanidate();
  }, [0]);

  const navigate = useNavigate();

  return (
    <div className="space-y-6 px-4 py-6">
      {user?.length !== 0 ? (
        user?.map((e, index) => {
          var educationLevelLastValue = e?.level.slice(-1)[0];
          return (
            <div
              key={index}
              onClick={() =>
                navigate(`/JobDetails/interviewing/details/${e._id}`)
              }
              className="transition-all duration-300 ease-in-out"
            >
              <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-gray-200 cursor-pointer transition-all duration-300 overflow-hidden">
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6 lg:gap-8">
                    {/* Profile Image Section */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <img
                          width={120}
                          height={120}
                          src={e?.ResumeURL}
                          alt={`${e?.firstName} ${e?.lastName}'s profile`}
                          className="rounded-full object-cover border-4 border-gray-50 shadow-md"
                        />
                        {/* Status indicator */}
                        <div className="absolute -top-1 -right-1">
                          {e?.interviewDate !== "nill" ? (
                            <div className="bg-green-500 rounded-full p-1.5 shadow-lg">
                              <MdDoneAll className="text-white text-sm" />
                            </div>
                          ) : (
                            <div className="bg-gray-400 rounded-full p-1.5 shadow-lg">
                              <MdRemoveDone className="text-white text-sm" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Profile Information Section */}
                    <div className="flex-1 w-full">
                      {/* Name and Title */}
                      <div className="text-center lg:text-left mb-6">
                        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2 leading-tight">
                          {e?.firstName + " " + e?.lastName}
                        </h2>
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200">
                          {e?.interviewDate !== "nill" ? "Interview Scheduled" : "Pending Interview"}
                        </div>
                      </div>

                      {/* Information Cards Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-4 text-center transition-all duration-200 hover:shadow-md">
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                              Experience
                            </h4>
                            <p className="text-lg font-bold text-gray-900">
                              {e?.duration[0]}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-4 text-center transition-all duration-200 hover:shadow-md">
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-purple-600 uppercase tracking-wide">
                              Education
                            </h4>
                            <p className="text-lg font-bold text-gray-900">
                              {educationLevelLastValue}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-lg p-4 text-center transition-all duration-200 hover:shadow-md">
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide">
                              City
                            </h4>
                            <p className="text-lg font-bold text-gray-900">
                              {e?.city}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-4 text-center transition-all duration-200 hover:shadow-md">
                          <div className="space-y-1">
                            <h4 className="text-xs font-semibold text-orange-600 uppercase tracking-wide">
                              Interview Date
                            </h4>
                            <p className="text-lg font-bold text-gray-900">
                              {e?.interviewDate}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Section - Only visible on larger screens as main indicator is now on profile image */}
                    <div className="hidden lg:flex flex-col items-center justify-center">
                      {e?.interviewDate !== "nill" ? (
                        <div className="bg-green-50 border border-green-200 rounded-xl p-4 shadow-sm">
                          <MdDoneAll className="text-3xl text-green-600" />
                        </div>
                      ) : (
                        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 shadow-sm">
                          <MdRemoveDone className="text-3xl text-gray-500" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Hover Effect Indicator */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left"></div>
              </div>
            </div>
          );
        })
      ) : (
        // *********************************************
        // CODE FOR IF THERE ARE NOT INTERVIEWING USER
        // *********************************************
        <div className="flex flex-col items-center justify-center py-16 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <img 
                className="w-48 h-48 mx-auto drop-shadow-sm opacity-80" 
                src={NoUserSVG}
                alt="No interviewing users illustration"
              />
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-semibold text-gray-700 leading-tight">
                No Interviewing Candidates
              </h2>
              <p className="text-gray-500 text-lg">
                There are currently no candidates in the interviewing stage.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewingCandidateListCard;