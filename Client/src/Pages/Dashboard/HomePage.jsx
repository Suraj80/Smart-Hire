import axios from "axios";
import React, { useState, useEffect } from "react";
import LeftMenuBar from "../../Components/Dashboard/LeftMenuBar";
import TopNavigationBar from "../../Components/Dashboard/TopNavigationBar";
import ProfileSetup from "../../Components/ProfileSetup/ProfileSetup";
import DepartmentPhoto from "../../assets/illustrations/dep_1.jpg";
import DepartmentPhoto2 from "../../assets/illustrations/dep_2.jpg";
import DepartmentPhoto3 from "../../assets/illustrations/dep_3.jpg";
import { HiOfficeBuilding, HiUsers, HiTrendingUp, HiCurrencyDollar, HiDesktopComputer, HiChevronRight } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  fetchOrganizationDataStart,
  fetchOrganizationDataSuccess,
  fetchOrganizationDataFailure,
} from "../../Features/Dashboard/Organization_Details_Slice";
import DepartmentInfo from "../../Components/Common/DepartmentInfo";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Department info data with icons
  const departmentInfo = {
    HR: {
      description: "Handles recruitment, onboarding, employee relations, and compliance.",
      roles: ["HR Manager", "Recruiter", "HR Coordinator"],
      responsibilities: [
        "Recruit and onboard new employees",
        "Manage employee records",
        "Ensure legal compliance",
        "Handle employee grievances"
      ],
      icon: HiUsers,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    Marketing: {
      description: "Focuses on promoting the company and its products/services.",
      roles: ["Marketing Manager", "Content Strategist", "SEO Specialist"],
      responsibilities: [
        "Develop marketing strategies",
        "Manage social media campaigns",
        "Conduct market research",
        "Coordinate promotional events"
      ],
      icon: HiTrendingUp,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    Finance: {
      description: "Manages the company's finances, including planning, organizing, auditing, and accounting.",
      roles: ["Finance Manager", "Accountant", "Financial Analyst"],
      responsibilities: [
        "Prepare financial statements",
        "Manage budgets and forecasts",
        "Oversee payroll",
        "Ensure regulatory compliance"
      ],
      icon: HiCurrencyDollar,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50"
    },
    IT: {
      description: "Responsible for technology infrastructure, support, and security.",
      roles: ["IT Manager", "System Administrator", "Support Specialist"],
      responsibilities: [
        "Maintain IT infrastructure",
        "Provide tech support",
        "Ensure cybersecurity",
        "Manage software and hardware"
      ],
      icon: HiDesktopComputer,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    },
  };

  //to store is user setup the organization profile or not
  const [profileSetup, setProfileSetup] = useState(false);
  const [organizationData, setOrganizationData] = useState();
  const [organizationDeatails, setOrganizationDetails] = useState();
  const [showAddDeptModal, setShowAddDeptModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState("");

  const CheckAuth = async () => {
    axios
      .post(
        "http://localhost:8080/home",
        { email: "testuser@example.com" }
      )
      .then(function (response) {
        if (response.data.org_registered == true) {
          setOrganizationData(response.data);
          setProfileSetup(true);
          localStorage.setItem("user_id", response.data._id);
          localStorage.setItem("organization_id", response.data.org_id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const CheckOrganization = async () => {
    dispatch(fetchOrganizationDataStart());

    axios
      .post("http://localhost:8080/dashboard", 
        {
          organization_id: localStorage.getItem("organization_id"),
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      )
      .then(function (response) {
        const arr = Object.entries(response.data.organizaion);
        setOrganizationDetails(arr);
        dispatch(fetchOrganizationDataSuccess(arr));
      })
      .catch(function (error) {
        dispatch(fetchOrganizationDataFailure(error.message));
        console.log(error);
      });
  };
  
  useEffect(() => {
    CheckAuth();
    CheckOrganization();
    // Redirect to organization setup if no org
    if (profileSetup === false) {
      navigate("/profilesetup/organization");
    }
  }, [profileSetup]);

  const depImages = [DepartmentPhoto, DepartmentPhoto2, DepartmentPhoto3];

  // Add department handler
  const handleAddDepartment = async () => {
    if (!newDeptName.trim()) return;
    try {
      await axios.post("http://localhost:8080/settings/addDepartment", {
        org_id: localStorage.getItem("organization_id"),
        department: newDeptName.trim(),
      });
      setShowAddDeptModal(false);
      setNewDeptName("");
      CheckOrganization(); // Refresh list
    } catch (err) {
      alert("Failed to add department");
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      <div className="hidden sm:block w-2/12 h-screen">
        <LeftMenuBar />
      </div>
      <div className="w-full bg-gray-50">
        <div className="p-0">
          <TopNavigationBar title={"Home"} />
          
          {/* ## USING CONDITIONAL RENDERING HERE TO DIFFRENTIATE 1ST TIME USER AND WELL SETUP USER */}
          {profileSetup == false ? (
            // ~~ WHEN USER LOGIN 1ST TIME ~~
            <div className="px-6 py-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h1 className="text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 mb-4">
                    Welcome to Smart Cruiter
                  </h1>
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Let's get your organization set up to streamline your recruitment process
                  </p>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <ProfileSetup />
                </div>
              </div>
            </div>
          ) : (
            // ~~ WHEN USER LOGIN AFTER PROFILE SETUP ~~
            <div className="px-6 py-8">
              <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                {/* <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                      <HiOfficeBuilding className="text-2xl text-white" />
                    </div>
                    <div>
                      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        {organizationData?.company_name}
                      </h1>
                      <p className="text-gray-600 mt-1">
                        Manage your departments and recruitment process
                      </p>
                    </div>
                  </div>
                </div> */}
    
                {/* Departments Section */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h2 className="text-1xl font-bold text-gray-900 mb-2">
                        Your Departments
                      </h2>
                      <p className="text-gray-600">
                        Click on any department to view details and manage recruitment
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium shadow"
                        onClick={() => setShowAddDeptModal(true)}
                      >
                        + Add Department
                      </button>
                      <span className="hidden sm:block text-sm text-gray-500">
                        {organizationDeatails?.[6][1]?.length || 0} departments
                      </span>
                    </div>
                  </div>

                  {/* Add Department Modal */}
                  {showAddDeptModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full relative">
                        <button
                          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
                          onClick={() => setShowAddDeptModal(false)}
                        >
                          &times;
                        </button>
                        <h2 className="text-xl font-bold mb-4">Add New Department</h2>
                        <input
                          type="text"
                          value={newDeptName}
                          onChange={e => setNewDeptName(e.target.value)}
                          placeholder="Department Name"
                          className="input input-bordered w-full mb-4"
                        />
                        <button
                          className="btn bg-blue-500 text-white w-full"
                          onClick={handleAddDepartment}
                        >
                          Add Department
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Department Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {organizationDeatails?.[6][1]?.map((departmentName, index) => {
                      const deptInfo = departmentInfo[departmentName] || {};
                      const IconComponent = deptInfo.icon || HiOfficeBuilding;
                      const imageNumber = Math.floor(Math.random() * 3);

                      return (
                        <div
                          key={index}
                          className="group cursor-pointer"
                          onClick={() => navigate(`/department/${encodeURIComponent(departmentName)}`)}
                        >
                          <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
                            {/* Image Header */}
                            <div className="relative h-40 overflow-hidden">
                              <img
                                src={depImages[imageNumber]}
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                alt={`${departmentName} department`}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                              <div className="absolute bottom-4 left-4">
                                <div className={`p-2 rounded-lg bg-gradient-to-r ${deptInfo.color || 'from-blue-500 to-blue-600'}`}>
                                  <IconComponent className="text-xl text-white" />
                                </div>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-3">
                                <h3 className="text-xl font-bold text-gray-900">
                                  {departmentName}
                                </h3>
                                <HiChevronRight className="text-gray-400 group-hover:text-blue-500 transition-colors duration-200" />
                              </div>
                              
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {deptInfo.description || "Manage department operations and recruitment"}
                              </p>

                              {/* Stats or Additional Info */}
                              <div className="flex items-center justify-between text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <HiUsers className="text-sm" />
                                  {deptInfo.roles?.length || 0} roles
                                </span>
                                <span className={`px-2 py-1 rounded-full ${deptInfo.bgColor || 'bg-blue-50'} text-xs font-medium`}>
                                  Active
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Empty State */}
                  {(!organizationDeatails?.[6][1] || organizationDeatails[6][1].length === 0) && (
                    <div className="text-center py-16">
                      <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                        <HiOfficeBuilding className="text-2xl text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        No departments found
                      </h3>
                      <p className="text-gray-600 max-w-sm mx-auto">
                        Set up your organization departments to start managing recruitment processes.
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Actions or Additional Content */}
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomePage;