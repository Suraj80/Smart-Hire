import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";

function JobD() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      setError(null);
      try {
        const options = {
          url: "http://localhost:8080/job/get-jobs/details",
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
          data: { id },
        };
        const response = await axios(options);
        setJob(response.data.jobs && response.data.jobs[0]);
      } catch (err) {
        setError("Failed to fetch job details.");
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="hidden sm:block w-2/12 bg-white h-screen">
        <LeftMenuBar />
      </div>
      <div className="flex-1">
        <TopNavigationBar title={job?.jobPosition || "Job Details"} />
        <div className="max-w-3xl mx-auto p-8 mt-8 bg-white rounded-xl shadow-lg">
          {loading ? (
            <div className="text-center text-gray-500 py-16 text-lg">Loading job details...</div>
          ) : error ? (
            <div className="text-center text-red-500 py-16 text-lg">{error}</div>
          ) : job ? (
            <>
              <h1 className="text-3xl font-bold mb-2 text-gray-800">{job.jobPosition}</h1>
              <div className="flex flex-wrap gap-4 mb-6">
                <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  Department: {job.department}
                </span>
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                  Type: {job.jobType}
                </span>
                <span className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  Location: {job.officeLocation}
                </span>
                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                  Positions: {job.numberOfSeats}
                </span>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Salary Range</h2>
                <p className="text-gray-800">
                  ${job.salaryRangeFrom} - ${job.salaryRangeUpto}
                </p>
              </div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-700 mb-1">Description</h2>
                <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: job.job_description }} />
              </div>
              {/* Add more fields as needed */}
            </>
          ) : (
            <div className="text-center text-gray-500 py-16 text-lg">No job details found.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default JobD; 