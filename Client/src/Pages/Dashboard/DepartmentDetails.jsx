import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const departmentData = {
  HR: {
    totalEmployees: 12,
    newEmployeesRequired: 2,
    head: "Ayesha Khan",
    projects: ["Onboarding Automation", "Employee Wellness Program"],
    overview: "Handles recruitment, onboarding, employee relations, and compliance.",
    responsibilities: [
      "Recruit and onboard new employees",
      "Manage employee records",
      "Ensure legal compliance",
      "Handle employee grievances"
    ]
  },
  Marketing: {
    totalEmployees: 8,
    newEmployeesRequired: 1,
    head: "Ali Raza",
    projects: ["Summer Campaign", "SEO Revamp"],
    overview: "Focuses on promoting the company and its products/services.",
    responsibilities: [
      "Develop marketing strategies",
      "Manage social media campaigns",
      "Conduct market research",
      "Coordinate promotional events"
    ]
  },
  Finance: {
    totalEmployees: 6,
    newEmployeesRequired: 0,
    head: "Sara Ahmed",
    projects: ["Q2 Budget Planning"],
    overview: "Manages the company's finances, including planning, organizing, auditing, and accounting.",
    responsibilities: [
      "Prepare financial statements",
      "Manage budgets and forecasts",
      "Oversee payroll",
      "Ensure regulatory compliance"
    ]
  },
  IT: {
    totalEmployees: 10,
    newEmployeesRequired: 3,
    head: "Bilal Hussain",
    projects: ["Cloud Migration", "Security Audit"],
    overview: "Responsible for technology infrastructure, support, and security.",
    responsibilities: [
      "Maintain IT infrastructure",
      "Provide tech support",
      "Ensure cybersecurity",
      "Manage software and hardware"
    ]
  }
};

const DepartmentDetails = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  // Try to get department info from localStorage first
  const localDeptData = JSON.parse(localStorage.getItem("customDepartments") || '{}');
  const info = localDeptData[name] || departmentData[name];
  const [showModal, setShowModal] = useState(!info);
  const [form, setForm] = useState({
    totalEmployees: info?.totalEmployees || '',
    newEmployeesRequired: info?.newEmployeesRequired || '',
    head: info?.head || '',
    projects: info?.projects ? info.projects.join(', ') : '',
    overview: info?.overview || '',
    responsibilities: info?.responsibilities ? info.responsibilities.join(', ') : ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    const newDept = {
      totalEmployees: Number(form.totalEmployees),
      newEmployeesRequired: Number(form.newEmployeesRequired),
      head: form.head,
      projects: form.projects.split(',').map(s => s.trim()),
      overview: form.overview,
      responsibilities: form.responsibilities.split(',').map(s => s.trim())
    };
    const updated = { ...localDeptData, [name]: newDept };
    localStorage.setItem("customDepartments", JSON.stringify(updated));
    setShowModal(false);
    window.location.reload();
  };

  if (showModal) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden relative animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-6 relative">
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white text-xl font-bold transition-all duration-200 hover:scale-110"
              onClick={() => navigate("/dashboard")}
            >
              ×
            </button>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{name?.charAt(0) || 'D'}</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Department Details</h2>
                <p className="text-blue-100">Configure {name} department information</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-8 py-6 max-h-[calc(90vh-120px)] overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Department Head */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-lg">👤</span>
                  <span>Department Head</span>
                </label>
                <input 
                  name="head" 
                  value={form.head} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white" 
                  placeholder="Enter department head name" 
                  required 
                />
              </div>

              {/* Employee Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-lg">👥</span>
                    <span>Total Employees</span>
                  </label>
                  <input 
                    name="totalEmployees" 
                    value={form.totalEmployees} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white" 
                    placeholder="0" 
                    type="number" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                    <span className="text-lg">➕</span>
                    <span>New Positions</span>
                  </label>
                  <input 
                    name="newEmployeesRequired" 
                    value={form.newEmployeesRequired} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white" 
                    placeholder="0" 
                    type="number" 
                    required 
                  />
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-lg">📊</span>
                  <span>Current Projects</span>
                </label>
                <input 
                  name="projects" 
                  value={form.projects} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white" 
                  placeholder="Project 1, Project 2, Project 3..." 
                  required 
                />
                <p className="text-xs text-gray-500 ml-1">Separate multiple projects with commas</p>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-lg">ℹ️</span>
                  <span>Department Overview</span>
                </label>
                <textarea 
                  name="overview" 
                  value={form.overview} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white resize-none" 
                  placeholder="Brief description of the department's role and purpose..." 
                  rows="3"
                  required 
                />
              </div>

              {/* Responsibilities */}
              <div className="space-y-2">
                <label className="flex items-center space-x-2 text-sm font-semibold text-gray-700">
                  <span className="text-lg">✅</span>
                  <span>Key Responsibilities</span>
                </label>
                <textarea 
                  name="responsibilities" 
                  value={form.responsibilities} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 bg-gray-50 focus:bg-white resize-none" 
                  placeholder="Responsibility 1, Responsibility 2, Responsibility 3..." 
                  rows="3"
                  required 
                />
                <p className="text-xs text-gray-500 ml-1">Separate multiple responsibilities with commas</p>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <span className="text-lg">💾</span>
                  <span>Save Department</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                {name.charAt(0)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{name} Department</h1>
                <p className="text-blue-600 font-medium">Department Overview</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all duration-200"
            >
              <span>←</span>
              <span className="font-medium">Back to Home</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-blue-100">
          <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 font-bold">ℹ️</span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-3">Department Overview</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{info.overview}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👥</span>
              </div>
              <span className="text-3xl font-bold text-blue-600">{info.totalEmployees}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Total Employees</h3>
            <p className="text-sm text-gray-500">Current team size</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">➕</span>
              </div>
              <span className="text-3xl font-bold text-green-600">{info.newEmployeesRequired}</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">New Positions</h3>
            <p className="text-sm text-gray-500">Open vacancies</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 hover:shadow-xl transition-shadow duration-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">👤</span>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-800">{info.head}</div>
              </div>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Department Head</h3>
            <p className="text-sm text-gray-500">Leadership</p>
          </div>
        </div>

        {/* Projects and Responsibilities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Current Projects */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">📊</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Current Projects</h2>
            </div>
            <div className="space-y-3">
              {info.projects.length ? (
                info.projects.map((proj, i) => (
                  <div key={i} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    <span className="text-gray-700 font-medium">{proj}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                  <span className="text-gray-500 italic">No current projects</span>
                </div>
              )}
            </div>
          </div>

          {/* Key Responsibilities */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-blue-100">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-xl">✅</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800">Key Responsibilities</h2>
            </div>
            <div className="space-y-3">
              {info.responsibilities.map((resp, i) => (
                <div key={i} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                  <span className="text-gray-700 leading-relaxed">{resp}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-3"
            onClick={() => setShowModal(true)}
          >
            <span className="text-xl">✏️</span>
            <span>Edit Department Information</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetails;