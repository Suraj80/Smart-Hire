import React from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import FeedbackForm from "../../Components/RecruitmentStage/FeedbackForm";
import SwitchStatus from "../../Components/RecruitmentStage/SwitchStatus";
import { motion } from "framer-motion";
import { useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import JSAlert from "js-alert";
import { FiArrowLeft, FiCalendar, FiClock, FiMail, FiVideo } from "react-icons/fi";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import GoBackButton from "../../Components/Common/GoBackButton";

function InterviewingCandidateDetails() {
  const { id } = useParams();
  const [value, onChange] = useState(new Date());
  const [time, setTime] = useState("10:00");

  const [candidateDetails, setCandidateDetails] = useState();
  const [discription, setDiscription] = useState();
  const [emailDetails, setEmailDetails] = useState({
    to: "asd",
    subject: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [rating, setRating] = useState();

  useEffect(() => {
    const fetchAllInterviewingCanidate = () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/details/active/interviewing/details",
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
            setCandidateDetails(response.data.candidate_details);
            setRating(response.data.candidate_details.feedback_form);
            const updatedObject = {
              ...emailDetails,
              to: response.data.candidate_details.emailAddress,
            };

            setEmailDetails(updatedObject);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };

    fetchAllInterviewingCanidate();
  }, [0]);

  const handleSavingDateAndTime = () => {
    // Validate selected date and time
    const selectedDateTime = new Date(value);
    const [hours, minutes] = time.split(':').map(Number);
    selectedDateTime.setHours(hours, minutes, 0, 0);
    
    const now = new Date();
    
    if (selectedDateTime < now) {
      alert("Cannot schedule interview in the past. Please select a future date and time.");
      return;
    }

    // axios POST request
    const options = {
      url: "http://localhost:8080/details/active/interviewing/details/dateandtime",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { id, value, time },
    };

    axios(options)
      .then((response) => {
        if (response.status == 200) {
          JSAlert.alert("Interview scheduled successfully").dismissIn(1000 * 1);
          
          // Update the candidateDetails with new date and time
          setCandidateDetails(prev => ({
            ...prev,
            interviewDate: value.toLocaleDateString(),
            interviewTime: time
          }));
        } else {
          alert("Something went wrong, please try again");
        }
      })
      .catch((e) => {
        alert("Failed to schedule interview. Please try again.");
      });
  };

  const navigate = useNavigate();
  // || *************************************** ||
  //  Code to make Rating % value based on the formula of 20% each cateogry
  // || *************************************** ||
  const feedback = candidateDetails?.feedback_form;

  const calculateFeebackPercentage = (feedback) => {
    let rating = 0;
    for (let i = 0; i < feedback?.length; i++) {
      if (feedback[i] == 0) {
        rating += 0;
      } else {
        rating += feedback[i] * 4;
      }
    }
    return rating;
  };

  const RatingPercentage = calculateFeebackPercentage(feedback);

  const handleRatingUpdate = (newRating) => {
    setRating(newRating);
    // Update candidateDetails with the new rating
    setCandidateDetails(prev => ({
      ...prev,
      feedback_form: newRating
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Alert with better positioning and styling */}
      <div
        style={{
          display: showAlert == false ? "none" : "block",
        }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 alert alert-success shadow-xl w-96 bg-green-500 text-white border-none rounded-lg"
      >
        <div className="flex items-center gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current flex-shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-medium">
            Email 📧 has been sent successfully
          </span>
        </div>
      </div>

      <div className="flex">
        <div className="hidden sm:block w-64 bg-white fixed h-screen">
          <LeftMenuBar />
        </div>
        <div className="flex-1 bg-gray-50 min-h-screen ml-64">
          <div className="sticky top-0 z-40 bg-white shadow-sm">
            <TopNavigationBar title={"Interviewing"} />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Enhanced Go Back Button */}
            <div className="mb-8">
              <GoBackButton
                location={"Interviewing"}
                name={candidateDetails?.firstName}
              />
            </div>

            {/* Status Update Section */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h2 className="text-2xl font-bold text-gray-800">Update Status</h2>
              </div>
              <SwitchStatus id={id} />
            </motion.div>

            {/* Enhanced Rating Section */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                    duration: 2,
                  }}
                  className="text-center"
                >
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
                    Candidate Rating
                  </h2>
                  <p className="text-gray-600">Overall Performance Score</p>
                </motion.div>

                <motion.div
                  className="radial-progress text-blue-500 bg-blue-50"
                  style={{ 
                    "--value": RatingPercentage || 70, 
                    "--size": "8rem",
                    "--thickness": "6px" 
                  }}
                  animate={{
                    rotate: [0, 180, 280, 360, 0],
                    borderRadius: ["20%", "20%", "50%", "50%", "20%"],
                    animationDuration: 2,
                  }}
                >
                  <span className="text-2xl font-bold text-blue-600">
                    {RatingPercentage}%
                  </span>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Interview Date & Time Section */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center gap-3 mb-4 sm:mb-0">
                  <FiCalendar className="text-blue-600 text-2xl" />
                  <h2 className="text-2xl font-bold text-gray-800">Interview Schedule</h2>
                </div>
                <label
                  className="btn bg-blue-600 hover:bg-blue-700 text-white border-none px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                  onClick={() => {}}
                  htmlFor="my-modal-3"
                >
                  <FiCalendar />
                  Schedule Interview
                </label>
              </div>

              {/* Enhanced Modal */}
              <input type="checkbox" id="my-modal-3" className="modal-toggle" />
              <div className="modal">
                <div className="modal-box max-w-lg bg-white rounded-xl shadow-2xl">
                  <label
                    htmlFor="my-modal-3"
                    className="btn btn-sm btn-circle absolute right-4 top-4 bg-gray-100 hover:bg-gray-200 border-none"
                  >
                    ✕
                  </label>
                  <div className="text-center mb-6">
                    <FiCalendar className="text-blue-600 text-4xl mx-auto mb-3" />
                    <h3 className="text-2xl font-bold text-gray-800">Schedule Interview</h3>
                    <p className="text-gray-600">Select your preferred date and time</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <FiClock className="text-blue-600 text-xl" />
                      <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                        <TimePicker
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={setTime}
                          value={time}
                          minTime={value?.toDateString() === new Date().toDateString() ? 
                            new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }) 
                            : undefined}
                          disableClock={true}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <Calendar
                        className="mx-auto border border-gray-200 rounded-lg shadow-sm"
                        onChange={onChange}
                        value={value}
                        minDate={new Date()} // Prevents selecting past dates
                        tileDisabled={({ date }) => date < new Date().setHours(0, 0, 0, 0)} // Disables past dates
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleSavingDateAndTime}
                    className="btn bg-blue-600 hover:bg-blue-700 text-white border-none w-full mt-6 py-3 rounded-lg font-medium"
                  >
                    Save Schedule
                  </button>
                </div>
              </div>

              {/* Enhanced Date & Time Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200"
                  animate={{
                    x: [0, 10, 0],
                    transition: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FiCalendar className="text-blue-600 text-xl" />
                    <h3 className="text-lg font-semibold text-gray-800">Interview Date</h3>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">
                    {candidateDetails?.interviewDate || "Not scheduled"}
                  </p>
                </motion.div>

                <motion.div
                  className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200"
                  animate={{
                    x: [0, 10, 0],
                    transition: { duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }
                  }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <FiClock className="text-green-600 text-xl" />
                    <h3 className="text-lg font-semibold text-gray-800">Interview Time</h3>
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    {candidateDetails?.interviewTime || "Not scheduled"}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Enhanced Interview Link Section */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <FiVideo className="text-blue-600 text-2xl" />
                <h3 className="text-2xl font-bold text-gray-800">Interview Link</h3>
              </div>

              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200">
                {/* Platform Icon */}
                <div className="flex items-center justify-center mb-8">
                  <div className="text-center">
                    <div className="bg-white p-4 rounded-xl shadow-md mb-3 w-fit mx-auto">
                      <img
                        width={60}
                        height={60}
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Google_Meet_icon_%282020%29.svg/1200px-Google_Meet_icon_%282020%29.svg.png"
                        alt="Google Meet"
                        className="mx-auto"
                      />
                    </div>
                    <p className="text-sm font-medium text-gray-600">Google Meet</p>
                  </div>
                </div>

                {/* URL Input */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Google Meet Link
                  </label>
                  <div className="flex gap-3">
                    <input
                      className="flex-1 p-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      type="url"
                      value={candidateDetails?.interview_link || ""}
                      onChange={(e) => {
                        setCandidateDetails(prev => ({
                          ...prev,
                          interview_link: e.target.value
                        }));
                      }}
                      placeholder="Enter Google Meet link here..."
                    />
                    <button 
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                      onClick={() => {
                        if (candidateDetails?.interview_link) {
                          navigator.clipboard.writeText(candidateDetails.interview_link);
                          JSAlert.alert("Link copied to clipboard").dismissIn(1000);
                        }
                      }}
                    >
                      Copy
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Format: https://meet.google.com/xxx-xxxx-xxx
                  </p>
                </div>

                {/* Send Invitation Button */}
                <label
                  htmlFor="my-modal-4"
                  className="btn bg-blue-600 hover:bg-blue-700 text-white border-none w-full py-4 rounded-lg font-medium text-lg flex items-center justify-center gap-3 transition-colors duration-200"
                >
                  <FiMail />
                  Send Interview Invitation
                </label>

                {/* Enhanced Email Modal */}
                <input
                  type="checkbox"
                  id="my-modal-4"
                  className="modal-toggle"
                />
                <div className="modal modal-bottom sm:modal-middle">
                  <div className="modal-box max-w-2xl bg-white rounded-xl shadow-2xl">
                    <div className="text-center mb-6">
                      <FiMail className="text-blue-600 text-4xl mx-auto mb-3" />
                      <h3 className="text-2xl font-bold text-gray-800">Send Interview Invitation</h3>
                      <p className="text-gray-600">Compose and send the interview invitation email</p>
                    </div>

                    <div className="space-y-6">
                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <label className="text-sm font-medium text-gray-700 w-20">
                          To:
                        </label>
                        <input
                          className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          type="text"
                          value={emailDetails.to}
                          readOnly
                        />
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                        <label className="text-sm font-medium text-gray-700 w-20">
                          Subject:
                        </label>
                        <input
                          className="flex-1 p-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          type="text"
                          placeholder="Invitation for [Role] interview"
                          value={emailDetails.subject}
                          onChange={(e) => {
                            setEmailDetails((old) => ({
                              ...old,
                              subject: e.target.value,
                            }));
                          }}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Message:
                        </label>
                        <div className="border border-gray-300 rounded-lg overflow-hidden">
                          <ReactQuill
                            theme="snow"
                            value={discription}
                            onChange={setDiscription}
                            placeholder="Enter your interview invitation message..."
                            className="bg-white"
                            style={{ minHeight: '200px' }}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 mt-8">
                      <label
                        htmlFor="my-modal-4"
                        className="btn flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 border-none py-3 rounded-lg font-medium"
                      >
                        Cancel
                      </label>
                      <label
                        htmlFor="my-modal-4"
                        className="btn flex-1 bg-blue-600 hover:bg-blue-700 text-white border-none py-3 rounded-lg font-medium"
                        onClick={() => {
                          if (!emailDetails.subject || !discription) {
                            alert("Please fill in all fields");
                            return;
                          }

                          if (!candidateDetails?.interview_link) {
                            alert("Please add a Google Meet link before sending the invitation");
                            return;
                          }

                          if (!candidateDetails?.interviewDate || !candidateDetails?.interviewTime) {
                            alert("Please schedule the interview date and time first");
                            return;
                          }

                          const options = {
                            url: "http://localhost:8080/api/interview/send-invitation",
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json;charset=UTF-8",
                            },
                            data: {
                              emailDetails,
                              discription,
                              interviewDate: candidateDetails.interviewDate,
                              interviewTime: candidateDetails.interviewTime,
                              interviewLink: candidateDetails.interview_link,
                              candidateName: candidateDetails.firstName
                            },
                          };

                          axios(options)
                            .then((response) => {
                              if (response.status === 200) {
                                // Close the modal
                                document.getElementById('my-modal-4').checked = false;
                                
                                // Show success message
                                window.scrollTo({ top: 0, behavior: "smooth" });
                                setShowAlert(true);
                                setTimeout(() => {
                                  setShowAlert(false);
                                }, 2000);
                              }
                            })
                            .catch((e) => {
                              console.error(e);
                              alert("Failed to send invitation. Please try again.");
                            });
                        }}
                      >
                        Send Invitation
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced Feedback Form Section */}
            <motion.div 
              className="bg-white rounded-xl shadow-lg p-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <FeedbackForm 
                id={id} 
                rating={rating} 
                onRatingUpdate={handleRatingUpdate}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewingCandidateDetails;