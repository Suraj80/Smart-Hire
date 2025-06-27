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
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

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

  const handleEditClick = () => {
    setEditData({ ...job });
    setShowModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveError(null);
    try {
      const options = {
        url: `http://localhost:8080/job/update`,
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { ...editData, job_id: job._id },
      };
      const response = await axios(options);
      setJob(response.data.updatedJob);
      setShowModal(false);
    } catch (err) {
      setSaveError("Failed to update job.");
    } finally {
      setSaving(false);
    }
  };

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
              <div className="flex justify-between items-center mb-2">
                <h1 className="text-3xl font-bold text-gray-800">{job.jobPosition}</h1>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold shadow"
                  onClick={handleEditClick}
                >
                  Edit
                </button>
              </div>
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
            </>
          ) : (
            <div className="text-center text-gray-500 py-16 text-lg">No job details found.</div>
          )}
        </div>
        {/* Modal for editing job */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-xl">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-800">Edit Job</h2>
                  <button
                    className="text-gray-400 hover:text-gray-700 text-2xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                    onClick={() => setShowModal(false)}
                    aria-label="Close"
                  >
                    &times;
                  </button>
                </div>
              </div>
              
              <div className="px-6 py-4">
                <form onSubmit={handleEditSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Job Position</label>
                      <input
                        type="text"
                        name="jobPosition"
                        value={editData.jobPosition}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Department</label>
                      <input
                        type="text"
                        name="department"
                        value={editData.department}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Location</label>
                      <input
                        type="text"
                        name="officeLocation"
                        value={editData.officeLocation}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Type</label>
                      <input
                        type="text"
                        name="jobType"
                        value={editData.jobType}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Positions</label>
                      <input
                        type="number"
                        name="numberOfSeats"
                        value={editData.numberOfSeats}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Salary From</label>
                      <input
                        type="number"
                        name="salaryRangeFrom"
                        value={editData.salaryRangeFrom}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 font-medium mb-2">Salary To</label>
                      <input
                        type="number"
                        name="salaryRangeUpto"
                        value={editData.salaryRangeUpto}
                        onChange={handleEditChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">Description</label>
                    <textarea
                      name="job_description"
                      value={editData.job_description}
                      onChange={handleEditChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                      rows={4}
                      required
                    />
                  </div>
                  
                  {saveError && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                      {saveError}
                    </div>
                  )}
                  
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JobD;