import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "../../../assets/icons/delete.svg";
import SocialIcon from "../../../assets/icons/share.svg";

function CreatedJobElement({ data, setData }) {
  const navigate = useNavigate();

  const handleJob = (id) => {
    navigate(`/jobd/${id}`);
  };

  const handleDelete = async (event, id) => {
    event.stopPropagation(); // Prevent card navigation
    if (!window.confirm("Are you sure you want to delete this job?")) return;
    try {
      await axios.delete(`http://localhost:8080/jobs/delete`, { data: { job_id: id } });
      // Remove the deleted job from the list
      setData((prev) => prev.filter((job) => job._id !== id));
    } catch (error) {
      alert("Failed to delete job.");
    }
  };

  return (
    <>
      {data?.map((e, index) => {
        return (
          <div
            key={index}
            onClick={(event) => handleJob(e._id)}
            title="Job"
            className="bg-white hover:bg-gray-50 hover:shadow-md transition-all duration-200 border border-gray-200 hover:border-gray-300 rounded-lg p-4 cursor-pointer flex flex-col h-full"
          >
            {/* Header Section */}
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex-1 pr-2 leading-tight">
                {e.jobPosition}
              </h2>
              <span className="px-3 py-1 text-xs font-medium text-white bg-green-500 rounded-full whitespace-nowrap">
                Active
              </span>
            </div>

            {/* Stats Section */}
            <div className="text-center p-3 bg-gray-50 rounded-lg mb-4 flex-1">
              <div className="text-xs text-gray-600 mb-1">Total Candidates</div>
              <div className="text-xl font-bold text-gray-900">{e.applicants_no}</div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">
                JOB-ID: {index}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CreatedJobElement;