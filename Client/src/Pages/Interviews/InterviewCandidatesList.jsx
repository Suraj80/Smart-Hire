
import React, { useEffect, useState } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function InterviewCandidatesList() {
  const { jobId } = useParams();
  const [candidates, setCandidates] = useState([]);
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job details
    axios.get(`/api/jobs/${jobId}`)
      .then(res => setJob(res.data.job))
      .catch(() => {});
    // Fetch candidates for this job in 'interviewing' stage
    axios.get(`/api/jobs/${jobId}/candidates?stage=interviewing`)
      .then(res => {
        setCandidates(res.data.candidates || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [jobId]);

  if (loading) return <div>Loading candidates...</div>;

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={job?.title ? `Candidates for: ${job.title}` : "Interview Candidates"} />
        </div>
        <div className="p-6">
          <h2 className="heading3 sm:text-justify text-center sm:font-normal font-medium">
            {job?.title ? `Candidates for: ${job.title}` : "Candidates"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {candidates.map((candidate, index) => (
              <div
                onClick={() => navigate(`/JobDetails/interviewing/details/${candidate._id}`)}
                key={index}
                className="cursor-pointer bg-white border border-solid border-gray-200 shadow-md rounded-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-200 flex flex-col h-80 w-full max-w-sm mx-auto"
              >
                <div className="flex flex-col gap-3 p-4 border-b border-gray-100">
                  <div className="text-center">
                    <h3 className="heading3 font-medium text-lg text-gray-800 line-clamp-2">
                      {candidate.name}
                    </h3>
                  </div>
                  <div className="flex justify-center">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      {candidate.email}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div className="flex justify-center items-center flex-1">
                    <img
                      className="w-24 h-24 object-contain rounded-full border"
                      src={candidate.profilePic || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                      alt={candidate.name}
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h2 className="heading3 font-medium text-lg text-gray-700">
                      {candidate.phone || "No Phone"}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InterviewCandidatesList;
