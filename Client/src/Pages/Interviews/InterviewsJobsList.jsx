
import React, { useEffect, useState } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function InterviewsJobsList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Use the same API as Candidates page
    const options = {
      url: "http://localhost:8080/job/get-jobs",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { id: localStorage.getItem("organization_id") },
    };
    axios(options)
      .then((response) => {
        setJobs(response.data.jobs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading jobs...</div>;

  return (
    <div className="flex bg-white">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-background">
        <div className="p-0">
          <TopNavigationBar title={"Interviews"} />
        </div>
        <div className="p-6">
          <h2 className="heading3 sm:text-justify text-center sm:font-normal font-medium">
            All Available Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
            {jobs.map((job, index) => (
              <div
                onClick={() => navigate(`/JobDetails/interviewing/${job._id}`)}
                key={index}
                className="cursor-pointer bg-white border border-solid border-gray-200 shadow-md rounded-lg hover:bg-gray-50 hover:shadow-lg transition-all duration-200 flex flex-col h-80 w-full max-w-sm mx-auto"
              >
                <div className="flex flex-col gap-3 p-4 border-b border-gray-100">
                  <div className="text-center">
                    <h3 className="heading3 font-medium text-lg text-gray-800 line-clamp-2">
                      {job.jobPosition}
                    </h3>
                  </div>
                  <div className="flex justify-center">
                    <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                      {job.department}
                    </span>
                  </div>
                </div>
                <div className="flex-1 flex flex-col justify-between p-4">
                  <div className="flex justify-center items-center flex-1">
                    {job.department === "HR" ? (
                      <img
                        className="w-24 h-24 object-contain"
                        src="https://cdn.dribbble.com/users/878959/screenshots/4460762/hr.png"
                        alt="HR Department"
                      />
                    ) : job.department === "IT" ? (
                      <img
                        className="w-24 h-24 object-contain"
                        src="https://img.freepik.com/premium-vector/back-end-development-abstract-concept-vector-illustration_107173-25072.jpg"
                        alt="IT Department"
                      />
                    ) : (
                      <img
                        className="w-24 h-24 object-contain"
                        src="https://media.istockphoto.com/id/1201845960/vector/business-hierarchy-ceo-organization-job-working-leadership.jpg?s=612x612&w=0&k=20&c=QTi2Ha-Q3kcdAldcJ3_NhMluaSczHn-ne5leHbHpV0k="
                        alt="Other Department"
                      />
                    )}
                  </div>
                  <div className="text-center mt-4">
                    <h2 className="heading3 font-medium text-lg text-blue-600 underline">
                      {job.applicants_no} Applied
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

export default InterviewsJobsList;
