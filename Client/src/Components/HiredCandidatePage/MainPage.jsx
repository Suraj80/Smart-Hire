import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [createdJobs, setCreatedJobs] = useState();

  useEffect(() => {
    const fetchData = () => {
      // axios POST request
      const options = {
        url: "http://localhost:8080/job/get-jobs",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id: localStorage.getItem("organization_id") },
      };

      axios(options).then((response) => {
        setCreatedJobs(response.data.jobs);
      });
    };

    fetchData();
  }, [0]);

  const navigate = useNavigate();
  
  return (
    <div className="p-6">
      <h2 className="heading3 sm:text-justify text-center sm:font-normal font-medium">
        Hired Candidate Details
      </h2>
      
      {/* Fixed grid layout for better alignment */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
        {createdJobs?.map((element, index) => {
          return (
            <div
              onClick={() => navigate(`/JobDetails/${element._id}`)}
              key={index}
              className="cursor-pointer bg-white border border-solid border-gray-200 shadow-md rounded-lg 
                         hover:bg-gray-50 hover:shadow-lg transition-all duration-200 
                         flex flex-col h-80 w-full max-w-sm mx-auto"
            >
              {/* Header section with job position and department */}
              <div className="flex flex-col gap-3 p-4 border-b border-gray-100">
                <div className="text-center">
                  <h3 className="heading3 font-medium text-lg text-gray-800 line-clamp-2">
                    {element.jobPosition}
                  </h3>
                </div>
                <div className="flex justify-center">
                  <span className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium">
                    {element.department}
                  </span>
                </div>
              </div>

              {/* Image and applicants section */}
              <div className="flex-1 flex flex-col justify-between p-4">
                <div className="flex justify-center items-center flex-1">
                  {element.department === "HR" ? (
                    <img
                      className="w-24 h-24 object-contain"
                      src="https://cdn.dribbble.com/users/878959/screenshots/4460762/hr.png"
                      alt="HR Department"
                    />
                  ) : element.department === "IT" ? (
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
                
                {/* Applicants count */}
                <div className="text-center mt-4">
                  <h2 className="heading3 font-medium text-lg text-blue-600 underline">
                    {element.applicants_no} Applied
                  </h2>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;