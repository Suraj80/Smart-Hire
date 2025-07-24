import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoUserSVG from "../../assets/illustrations/no_user.svg";

function ReccomendidCandidateCard({ id }) {
  const [candidate, setCandidate] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const getCandidates = () => {
      setLoading(true);
      const options = {
        url: "http://localhost:8080/details/active/reccomended",
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
            setCandidate(response.data);
          } else {
            alert("something went wrong , try again");
          }
        })
        .catch((error) => {
          console.error("Error fetching candidates:", error);
          alert("something went wrong , try again");
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getCandidates();
  }, [id]);

  const navigate = useNavigate();

  // Loading state
  if (loading) {
    return (
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-shrink-0 mx-auto lg:mx-0">
                  <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
                </div>
                <div className="flex-1 space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                    {[1, 2, 3, 4].map((j) => (
                      <div key={j} className="h-16 bg-gray-100 rounded-lg"></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {candidate?.length !== 0 ? (
        <div className="space-y-6">
          {candidate?.map((e, index) => {
            var educationLevelLastValue = e?.level?.slice(-1)[0];

            return (
              <div
                key={index}
                onClick={() =>
                  navigate(`/JobDetails/reccomended/details/${e._id}`)
                }
                className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-blue-200 transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="p-6 lg:p-8">
                  <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                    {/* Profile Image */}
                    <div className="flex-shrink-0 mx-auto lg:mx-0">
                      <div className="relative">
                        <img
                          width={128}
                          height={128}
                          src={e.ResumeURL}
                          alt={`${e.firstName} ${e.lastName}`}
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-300"
                          onError={(ev) => {
                            ev.target.src = NoUserSVG;
                          }}
                        />
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Profile Info */}
                    <div className="flex-1 min-w-0">
                      <div className="text-center lg:text-left mb-6">
                        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                          {e.firstName + " " + e.lastName}
                        </h2>
                        <div className="w-12 h-1 bg-blue-500 mx-auto lg:mx-0 rounded-full"></div>
                      </div>

                      {/* Info Cards Grid */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 text-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2V6" />
                              </svg>
                            </div>
                            <h4 className="text-xs font-semibold text-blue-700 mb-1 uppercase tracking-wide">
                              Experience
                            </h4>
                            <p className="text-sm font-bold text-blue-900 truncate w-full">
                              {e.duration || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-4 text-center group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                              </svg>
                            </div>
                            <h4 className="text-xs font-semibold text-green-700 mb-1 uppercase tracking-wide">
                              Education
                            </h4>
                            <p className="text-sm font-bold text-green-900 truncate w-full">
                              {educationLevelLastValue || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 text-center group-hover:from-purple-100 group-hover:to-purple-200 transition-all duration-300">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                            <h4 className="text-xs font-semibold text-purple-700 mb-1 uppercase tracking-wide">
                              City
                            </h4>
                            <p className="text-sm font-bold text-purple-900 truncate w-full">
                              {e.city || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-4 text-center group-hover:from-orange-100 group-hover:to-orange-200 transition-all duration-300">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center mb-2">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 8h6M3 21h18a2 2 0 002-2V9a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            </div>
                            <h4 className="text-xs font-semibold text-orange-700 mb-1 uppercase tracking-wide">
                              Interview Date
                            </h4>
                            <p className="text-sm font-bold text-orange-900 truncate w-full">
                              {e.interviewDate || "N/A"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover indicator */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
              </div>
            );
          })}
        </div>
      ) : (
        // *********************************************
        // CODE FOR IF THERE ARE NOT RECCOMENDED USER
        // *********************************************
        <div className="text-center py-16 px-4">
          <div className="max-w-md mx-auto">
            <div className="relative mb-8">
              <img 
                className="w-48 h-48 mx-auto opacity-80 drop-shadow-sm" 
                src={NoUserSVG}
                alt="No candidates found"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-50/20 to-transparent rounded-full"></div>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                No Candidates Available
              </h2>
              <p className="text-gray-600 max-w-sm mx-auto leading-relaxed">
                Currently no interviewing candidates match your criteria. Check back later for new recommendations.
              </p>
              <div className="pt-4">
                <div className="inline-flex items-center px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  We'll notify you when new candidates are available
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReccomendidCandidateCard;