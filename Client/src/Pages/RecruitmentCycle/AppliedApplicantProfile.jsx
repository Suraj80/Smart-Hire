import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { SiLinkedin } from "react-icons/si";
import { MdClear } from "react-icons/md";
import { FcInvite, FcPhone, FcHome } from "react-icons/fc";
import { AiOutlineMail, AiOutlineMessage, AiOutlineHome } from "react-icons/ai";

function AppliedApplicantProfile({ id }) {
  const [modal, setModal] = useState(false);
  const [modalValue, setModalValue] = useState("none");
  const [userData, setUserData] = useState();
  
  useEffect(() => {
    const fetchData = () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/details/active/user",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { user_id: id },
      };

      axios(options).then((response) => {
        setUserData(response.data);
      });
    };
    fetchData();
  }, [0]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
      {/* Enhanced Modal */}
      {modal !== false ? (
        <div
          style={{ display: modalValue }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-semibold text-lg">Resume Preview</h3>
              <button
                onClick={(e) => {
                  setModalValue("none");
                  setModal(false);
                }}
                className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors duration-200"
              >
                <MdClear className="text-2xl" />
              </button>
            </div>
            {/* Modal Content */}
            <div className="h-full pb-16">
              <object
                className="w-full h-full"
                data={userData.profilePic}
                type="application/pdf"
              ></object>
            </div>
          </div>
        </div>
      ) : undefined}

      {userData !== null ? (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Header Profile Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Profile Image & Name */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-6 lg:w-3/5">
                <div className="relative group">
                  <img
                    width={140}
                    height={140}
                    src={userData?.ResumeURL}
                    alt="Profile"
                    className="rounded-3xl shadow-lg ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300 object-cover"
                  />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {userData?.firstName + " " + userData?.lastName}
                  </h1>
                  <p className="text-gray-600 flex items-center justify-center sm:justify-start gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    DoB: {userData?.dob}
                  </p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="lg:w-2/5 space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200">
                  <AiOutlineMail className="text-2xl text-blue-600 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-700">Email:</span>
                    <p className="text-gray-600 break-all">{userData?.emailAddress[0]}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors duration-200">
                  <AiOutlineMessage className="text-2xl text-green-600 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-700">Contact:</span>
                    <p className="text-gray-600">{userData?.phoneNo}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors duration-200">
                  <AiOutlineHome className="text-2xl text-purple-600 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-gray-700">Address:</span>
                    <p className="text-gray-600">{userData?.address}</p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    setModal(true);
                    setModalValue("block");
                  }}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  📄 View Resume
                </button>
              </div>
            </div>
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🎓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Education</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold">
                  <div className="text-center">Degree</div>
                  <div className="text-center">Institute</div>
                  <div className="text-center">Graduated In</div>
                </div>
              </div>

              {/* Education Rows */}
              {[0, 1, 2].map((index) => (
                <div key={index} className={`p-4 border-b border-gray-100 last:border-b-0 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors duration-200`}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="font-medium text-gray-800">{userData?.majors[index] || 'N/A'}</div>
                    <div className="text-gray-600 md:border-l md:border-gray-200">{userData?.institute[index] || 'N/A'}</div>
                    <div className="text-gray-600 md:border-l md:border-gray-200">
                      {index === 0 && userData?.session[0][0]?.first?.to ||
                       index === 1 && userData?.session[0][0]?.second?.to ||
                       index === 2 && userData?.session[0][0]?.third?.to || 'N/A'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 mb-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">💼</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Experience</h2>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200">
              {/* Table Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-semibold">
                  <div className="text-center">Title</div>
                  <div className="text-center">Organization</div>
                  <div className="text-center">Duration</div>
                </div>
              </div>

              {/* Experience Row */}
              <div className="p-4 bg-gray-50 hover:bg-green-50 transition-colors duration-200">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="font-medium text-gray-800">{userData?.title[0] || 'N/A'}</div>
                  <div className="text-gray-600 md:border-l md:border-gray-200">{userData?.companyName[0] || 'N/A'}</div>
                  <div className="text-gray-600 md:border-l md:border-gray-200">{userData?.duration[0] ? `${userData?.duration[0]} Years` : 'N/A'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Social Handles Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">🔗</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Social Handles</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LinkedIn */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-colors duration-200 border border-blue-100">
                <SiLinkedin className="text-4xl text-blue-600 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-1">LinkedIn</h3>
                  <input
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    type="text"
                    value={userData?.linkedinProfile || ''}
                    readOnly
                  />
                </div>
              </div>

              {/* GitHub */}
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors duration-200 border border-gray-100">
                <AiFillGithub className="text-4xl text-gray-800 flex-shrink-0" />
                <div className="flex-grow">
                  <h3 className="font-semibold text-gray-800 mb-1">GitHub</h3>
                  <input
                    className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    type="text"
                    value={userData?.gitHubProfile || ''}
                    readOnly
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <h2 className="text-2xl font-semibold text-gray-700">Loading...</h2>
            <p className="text-gray-500 mt-2">Please wait while we fetch the profile data</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppliedApplicantProfile;