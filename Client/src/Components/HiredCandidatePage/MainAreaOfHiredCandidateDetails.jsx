import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { MdDoneAll, MdRemoveDone, MdArrowBack, MdCalendarToday, MdLocationOn, MdSchool, MdWork } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import NoUser from "../../assets/illustrations/no_user.svg";

function MainAreaOfHiredCandidateDetails() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  let { id } = useParams();

  useEffect(() => {
    const fetchAllInterviewingCanidate = () => {
      setLoading(true);
      // axios POST request
      const options = {
        url: "http://localhost:8080/details/active/hired",
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
            console.log(response);
            setUser(response.data);
          }
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchAllInterviewingCanidate();
  }, [0]);

  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-slate-600 font-medium">Loading hired candidates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
            >
              <MdArrowBack className="text-slate-600 text-xl" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Hired Candidates</h1>
              <p className="text-slate-600 mt-1">Frontend Developer Position</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {user?.length !== 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {user?.map((e, index) => {
              var educationLevelLastValue = e?.level.slice(-1)[0];
              return (
                <div
                  key={index}
                  onClick={() =>
                    navigate(`/JobDetails/interviewing/details/${e._id}`)
                  }
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100 overflow-hidden">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10">
                      {e?.interviewDate !== "nill" ? (
                        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <MdDoneAll className="text-sm" />
                          <span>Interviewed</span>
                        </div>
                      ) : (
                        <div className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                          <MdRemoveDone className="text-sm" />
                          <span>Pending</span>
                        </div>
                      )}
                    </div>

                    {/* Profile Section */}
                    <div className="p-6 pb-4">
                      <div className="flex flex-col items-center text-center">
                        <div className="relative">
                          <img
                            width={80}
                            height={80}
                            src={e?.ResumeURL}
                            alt={`${e?.firstName} ${e?.lastName}`}
                            className="rounded-full object-cover border-4 border-white shadow-lg"
                          />
                          <div className="absolute -bottom-1 -right-1 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mt-4 group-hover:text-indigo-600 transition-colors">
                          {e?.firstName + " " + e?.lastName}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">Frontend Developer</p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="px-6 pb-6">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors">
                          <div className="flex items-center space-x-2 mb-1">
                            <MdWork className="text-indigo-600 text-sm" />
                            <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Experience</span>
                          </div>
                          <p className="text-slate-900 font-semibold text-sm">{e?.duration[0]}</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors">
                          <div className="flex items-center space-x-2 mb-1">
                            <MdSchool className="text-emerald-600 text-sm" />
                            <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Education</span>
                          </div>
                          <p className="text-slate-900 font-semibold text-sm">{educationLevelLastValue}</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors">
                          <div className="flex items-center space-x-2 mb-1">
                            <MdLocationOn className="text-rose-600 text-sm" />
                            <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Location</span>
                          </div>
                          <p className="text-slate-900 font-semibold text-sm">{e?.city}</p>
                        </div>

                        <div className="bg-slate-50 rounded-xl p-3 hover:bg-slate-100 transition-colors">
                          <div className="flex items-center space-x-2 mb-1">
                            <MdCalendarToday className="text-purple-600 text-sm" />
                            <span className="text-xs font-medium text-slate-600 uppercase tracking-wide">Interview</span>
                          </div>
                          <p className="text-slate-900 font-semibold text-sm">
                            {e?.interviewDate !== "nill" ? e?.interviewDate : "Not scheduled"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 group-hover:from-indigo-100 group-hover:to-blue-100 transition-all">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">View Details</span>
                        <div className="text-indigo-600 group-hover:translate-x-1 transition-transform">
                          →
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 max-w-md mx-auto text-center">
              <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-slate-100 to-slate-200 rounded-full flex items-center justify-center">
                <img className="w-20 h-20 opacity-60" src={NoUser} alt="No candidates" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                No Hired Candidates Yet
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Once you hire candidates for this position, they will appear here with their details and interview status.
              </p>
              <button 
                onClick={() => navigate('/candidates')}
                className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Browse Candidates
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainAreaOfHiredCandidateDetails;