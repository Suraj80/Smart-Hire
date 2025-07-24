import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";
import { FiSend } from "react-icons/fi";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import NoUserSVG from "../../assets/illustrations/no_user.svg";
import OkSVG from "../../assets/illustrations/done.svg";
import { BeatLoader } from "react-spinners";

function RejectedCandidateCard({ id }) {
  const [candidate, setCandidate] = useState();
  const [description, setDiscription] = useState();
  const [emailTitle, setEmailTitle] = useState();
  const [emailList, setEmailList] = useState([]);
  const [jobInfo, setJobInfo] = useState({
    job_id: "",
    organization_name: "",
    job_title: "",
  });

  const [successMsg, setSuccessMsg] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    const getCandidates = async () => {
      const options = {
        url: "http://localhost:8080/details/active/rejected",
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
            setJobInfo((e) => ({
              job_id: response.data[0]?.jobID,
            }));
          } else {
            alert("something went wrong , try again");
          }
        })
        .catch((e) => {
          alert("something went wrong , try again");
        });
    };

    getCandidates();
  }, [0]);

  const navigate = useNavigate();

  const handleEmail = async () => {
    if (candidate.length !== 0) {
      var email_to = [];
      candidate.map((e, index) => {
        email_to.push(e.emailAddress);
      });

      setShowSpinner(true);
      const options = {
        url: "http://localhost:8080/details/active/hired/sendEmail",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { jobInfo, email_to, emailTitle, description },
      };

      axios(options).then((response) => {
        if (response.status == 200) {
          setSuccessMsg(true);
          setShowSpinner(false);
        } else {
          alert("Something went wrong , refresh page and try again");
          setShowSpinner(false);
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          {/* <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Rejected Candidates
          </h1> */}
          <div className="w-24 h-1 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 mx-auto rounded-full"></div>
        </div>

        {/* Send Email Button - Enhanced */}
        {candidate?.length > 0 && (
          <div className="flex justify-center mb-12">
            <label
              htmlFor="my-modal-3"
              className="inline-flex items-center px-8 py-4 text-white font-semibold rounded-xl
                       bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900
                       hover:shadow-2xl hover:scale-105 transform transition-all duration-300
                       cursor-pointer group border-0 shadow-lg"
            >
              <span className="mr-3">Send All Decline Emails</span>
              <FiSend className="text-lg group-hover:translate-x-1 transition-transform duration-200" />
            </label>
          </div>
        )}

        {/* MODAL UI CODE - Enhanced */}
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className="modal backdrop-blur-sm">
          <div className="modal-box relative max-w-3xl w-11/12 bg-white rounded-2xl shadow-2xl border-0">
            <label
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-100 hover:bg-gray-200 
                       border-none text-gray-600 hover:text-gray-800 transition-colors duration-200"
            >
              ✕
            </label>
            
            {successMsg == false ? (
              <div className="p-6">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    Send Decline Email
                  </h3>
                  <p className="text-gray-600">
                    Compose and send decline emails to all rejected candidates
                  </p>
                </div>

                {/* Subject Input - Enhanced */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Subject
                  </label>
                  <div className="relative">
                    <input
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg 
                               focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
                               transition-all duration-200 text-gray-800 placeholder-gray-500"
                      type="text"
                      placeholder="Application Status Update - [Position Name]"
                      value={emailTitle}
                      onChange={(e) => setEmailTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Email Content - Enhanced */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Email Content
                  </label>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDiscription}
                      placeholder="Enter your message content..."
                      className="bg-white"
                      style={{ minHeight: '200px' }}
                    />
                  </div>
                </div>

                {/* Send Button - Enhanced */}
                <div className="flex flex-col items-center space-y-4">
                  <button
                    onClick={handleEmail}
                    disabled={showSpinner}
                    className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-slate-900 
                             via-purple-900 to-slate-900 text-white font-semibold rounded-lg
                             hover:shadow-lg transform hover:scale-105 transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {showSpinner ? (
                      <>
                        <span className="mr-2">Sending...</span>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-2" />
                        Send Emails
                      </>
                    )}
                  </button>
                  
                  {showSpinner && (
                    <BeatLoader color="#0063B2" size={8} />
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="mb-6">
                  <img src={OkSVG} width="200" className="mx-auto" alt="Success" />
                </div>
                <h2 className="text-2xl font-bold text-green-600 mb-2">
                  Emails Sent Successfully!
                </h2>
                <p className="text-gray-600">
                  All decline emails have been sent to the rejected candidates.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Candidates List - Enhanced */}
        {candidate?.length !== 0 ? (
          <div className="space-y-6">
            {candidate?.map((e, index) => {
              var educationLevelLastValue = e?.level.slice(-1)[0];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  onClick={() => {
                    navigate(`/JobDetails/reccomended/details/${e._id}`);
                  }}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300
                           cursor-pointer border border-gray-100 hover:border-purple-200 overflow-hidden
                           transform hover:scale-[1.02]"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
                      {/* Profile Image */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            width={120}
                            height={120}
                            src={e?.ResumeURL}
                            alt={`${e.firstName} ${e.lastName}`}
                            className="w-32 h-32 rounded-2xl object-cover border-4 border-gray-100 shadow-md"
                          />
                          <div className="absolute -bottom-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                            Rejected
                          </div>
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex-1 text-center lg:text-left">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                          {e.firstName + " " + e.lastName}
                        </h2>

                        {/* Info Cards Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 
                                        rounded-xl p-4 text-center transition-all duration-200 hover:shadow-md">
                            <h4 className="text-blue-800 font-semibold text-sm mb-1">Experience</h4>
                            <p className="text-blue-900 font-bold">{e.duration}</p>
                          </div>

                          <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 
                                        rounded-xl p-4 text-center transition-all duration-200 hover:shadow-md">
                            <h4 className="text-green-800 font-semibold text-sm mb-1">Education</h4>
                            <p className="text-green-900 font-bold">{educationLevelLastValue}</p>
                          </div>

                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 
                                        rounded-xl p-4 text-center transition-all duration-200 hover:shadow-md">
                            <h4 className="text-purple-800 font-semibold text-sm mb-1">City</h4>
                            <p className="text-purple-900 font-bold">{e.city}</p>
                          </div>

                          <div className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200 
                                        rounded-xl p-4 text-center transition-all duration-200 hover:shadow-md">
                            <h4 className="text-orange-800 font-semibold text-sm mb-1">Interview Date</h4>
                            <p className="text-orange-900 font-bold">{e.interviewDate}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* No Candidates State - Enhanced */
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <img 
                className="w-64 h-64 mx-auto mb-8 opacity-80" 
                src={NoUserSVG}
                alt="No rejected candidates"
              />
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">
                  No Rejected Candidates
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  There are currently no rejected candidates to display. 
                  When candidates are rejected, they will appear here.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default RejectedCandidateCard;