import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "../../../assets/icons/delete.svg";
import SocialIcon from "../../../assets/icons/share.svg";

function CreatedJobElement({ data, setData }) {
  const navigate = useNavigate();
  const handleJob = (id) => {
    navigate(`/JobDetails/${id}`);
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
            <div className="grid grid-cols-2 gap-4 mb-4 flex-1">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Total Candidates</div>
                <div className="text-xl font-bold text-gray-900">{e.applicants_no}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs text-gray-600 mb-1">Active Candidates</div>
                <div className="text-xl font-bold text-gray-900">0</div>
              </div>
            </div>

            {/* Footer Section */}
            <div className="flex justify-between items-center pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500 font-medium">
                JOB-ID: {index}
              </p>
              <div className="flex gap-3">
                <img 
                  src={DeleteIcon} 
                  alt="Delete job" 
                  className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity" 
                />
                <img 
                  src={SocialIcon} 
                  alt="Share job" 
                  className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity" 
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CreatedJobElement;