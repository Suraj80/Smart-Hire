import { useEffect, useState } from "react";
import axios from "axios";
import { FiSend } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import NoUserSVG from "../../assets/illustrations/no_user.svg";
import OkSVG from "../../assets/illustrations/done.svg";
import { BeatLoader } from "react-spinners";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const HiredCandidates = ({ id }) => {
  const navigate = useNavigate();
  const [candidate, setCandidate] = useState(null);
  const [description, setDescription] = useState("");
  const [emailTitle, setEmailTitle] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [jobInfo, setJobInfo] = useState({
    job_id: "",
    organization_name: "",
    job_title: "",
  });

  useEffect(() => {
    const getCandidates = async () => {
      try {
        const response = await axios({
          url: "http://localhost:8080/details/active/hired",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: { id },
        });

        if (response.status === 200) {
          setCandidate(response.data);
          setJobInfo(prev => ({
            ...prev,
            job_id: response.data[0]?.jobID,
          }));
        } else {
          throw new Error("Failed to fetch candidates");
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
        alert("Failed to load candidates. Please try again.");
      }
    };

    if (id) {
      getCandidates();
    }
  }, [id]);

  const handleEmail = async () => {
    try {
      if (!candidate?.length) {
        alert("No candidates to send emails to");
        return;
      }

      if (!emailTitle?.trim()) {
        alert("Please enter an email subject");
        return;
      }

      if (!description?.trim()) {
        alert("Please enter an email message");
        return;
      }

      const email_to = candidate.map(e => e.emailAddress);

      setShowSpinner(true);

      const response = await axios({
        url: "http://localhost:8080/details/active/hired/sendEmail",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { 
          jobInfo, 
          email_to, 
          emailTitle: emailTitle.trim(), 
          description: description.trim() 
        },
      });
      
      if (response.status === 200) {
        setSuccessMsg(true);
      } else {
        throw new Error(response.data?.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Email sending error:", error);
      alert(error.response?.data?.message || "Failed to send email. Please try again.");
    } finally {
      setShowSpinner(false);
    }
  };

  return (
    <div>
      <label
        htmlFor="my-modal-3"
        className="w-1/4 flex items-center justify-center btn mb-8 m-auto border-none
                  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-md"
      >
        Send All Hired Emails <FiSend className="inline text-lg ml-1" />
      </label>

      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative bg-white rounded-lg shadow-xl">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          
          {!successMsg ? (
            <div className="space-y-6 p-4">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">Send Hired Emails</h3>
                <p className="text-gray-600 mt-1">Compose your message to all hired candidates</p>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Subject
                </label>
                <input
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  placeholder="Successfully selected for [Role]"
                  value={emailTitle}
                  onChange={(e) => setEmailTitle(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Message
                </label>
                <div className="border border-gray-300 rounded-md shadow-sm">
                  <ReactQuill
                    theme="snow"
                    value={description}
                    className="bg-white min-h-[200px]"
                    onChange={setDescription}
                    placeholder="Enter your congratulatory message..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-center pt-4">
                {showSpinner ? (
                  <button 
                    disabled
                    className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-medium rounded-md opacity-75 cursor-not-allowed"
                  >
                    <BeatLoader size={8} color="#ffffff" className="mr-2" />
                    Sending...
                  </button>
                ) : (
                  <button
                    onClick={handleEmail}
                    className="inline-flex items-center px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-200"
                  >
                    <FiSend className="mr-2" />
                    Send Email
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center p-6">
              <img src={OkSVG} width="250" className="mx-auto mb-4" alt="Success" />
              <h2 className="text-xl font-bold text-green-600 mb-2">
                Emails Sent Successfully!
              </h2>
              <p className="text-gray-600">
                All hired candidates have been notified via email.
              </p>
            </div>
          )}
        </div>
      </div>

      {candidate?.length > 0 ? (
        <div className="space-y-6">
          {candidate.map((e, index) => {
            const educationLevelLastValue = e?.level?.slice(-1)[0];
            return (
              <div
                key={index}
                onClick={() => navigate(`/JobDetails/reccomended/details/${e._id}`)}
                className="w-4/5 mb-6 block m-auto bg-white p-5 shadow-md rounded-md 
                         hover:bg-gray-50 hover:border border-solid border-gray-300 cursor-pointer"
              >
                <div className="flex flex-wrap sm:flex-nowrap justify-between items-center">
                  <div className="m-auto">
                    <img
                      width={150}
                      src={e?.ResumeURL}
                      alt={`${e.firstName}'s profile`}
                      className="rounded-full"
                    />
                  </div>
                  <div className="ml-6 flex flex-col w-full">
                    <h2 className="heading4 font-medium text-2xl mb-4">
                      {e.firstName} {e.lastName}
                    </h2>
                    <div className="flex flex-wrap sm:flex-nowrap gap-2 justify-around">
                      <div className="bg-white border border-gray-300 rounded-lg p-2 text-center">
                        <h4 className="block line1 font-medium">Experience</h4>
                        <span className="inline">{e.duration}</span>
                      </div>
                      <div className="bg-white border border-gray-300 rounded-lg p-2 text-center">
                        <h4 className="block line1 font-medium">Education</h4>
                        <span className="inline">{educationLevelLastValue}</span>
                      </div>
                      <div className="bg-white border border-gray-300 rounded-lg p-2 text-center">
                        <h4 className="block line1 font-medium">City</h4>
                        <span className="inline">{e.city}</span>
                      </div>
                      <div className="bg-white border border-gray-300 rounded-lg p-2 text-center">
                        <h4 className="block line1 font-medium">Interview Date</h4>
                        <span className="inline">{e.interviewDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-12 text-center">
          <img className="w-1/4 mx-auto" src={NoUserSVG} alt="No candidates" />
          <h2 className="heading2b mt-8">Currently no Hired Candidates</h2>
        </div>
      )}
    </div>
  );
};


