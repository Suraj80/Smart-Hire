import React from "react";
import { useParams } from "react-router-dom";
import TopRcruitementCycle from "../../Components/Dashboard/CreateJob/TopRcruitementCycle";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import SwitchStatus from "../../Components/RecruitmentStage/SwitchStatus";
import WithdrawnDetailsCard from "../../Components/RecruitmentStage/WithdrawnDetailsCard";

function WithdrawnDetails() {
  const { id } = useParams();
  
  return (
    <div>
      <div className="flex bg-white">
        <div className="hidden sm:block w-2/12 bg-white h-screen">
          <LeftMenuBar />
        </div>
        <div className="w-screen bg-background">
          <div className="p-4 w-full bg-white shadow-sm flex items-center">
            <button 
              onClick={() => window.history.back()} 
              className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back
            </button>
          </div>

          <div className="w-11/12 m-auto mt-0">
            <SwitchStatus id={id} />
          </div>

          <div className="w-11/12 m-auto mt-4">
            <WithdrawnDetailsCard id={id} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawnDetails;
