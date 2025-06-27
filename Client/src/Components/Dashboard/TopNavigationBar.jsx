import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

import { MdMenu, MdClose } from "react-icons/md";
import { 
  HiHome, 
  HiUsers, 
  HiBriefcase, 
  HiChartBar, 
  HiCog,
  HiLogout,
  HiExternalLink
} from "react-icons/hi";

import { Link, useNavigate } from "react-router-dom";

function TopNavigationBar({ title }) {
  const [profileURL, setProfileURL] = useState();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    const orgId = localStorage.getItem("organization_id");
    if (!orgId || orgId === "null" || orgId === "undefined") return;
    // axios POST request
    const options = {
      url: "http://localhost:8080/getProfilePic",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: {
        organization_id: orgId,
      },
    };

    axios(options).then((response) => {
      if (response.status == 200) {
        setProfileURL(response.data);
      }
    });
  }, [0]);

  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/", icon: HiHome },
    { name: "Candidates", path: "/Candidates", icon: HiUsers },
    { name: "Jobs", path: "/jobs", icon: HiBriefcase },
    { name: "Statistics", path: "/report", icon: HiChartBar },
    { name: "Settings", path: "/settings", icon: HiCog },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("organization_id");
    localStorage.removeItem("user_id");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="bg-white border-b border-gray-100 sm:hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Toggle menu"
          >
            {showMenu ? (
              <MdClose className="w-6 h-6 text-gray-700" />
            ) : (
              <MdMenu className="w-6 h-6 text-gray-700" />
            )}
          </button>

          {/* Title */}
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-blue-50 rounded-lg">
              <HiHome className="w-5 h-5 text-blue-600" />
            </div>
            <h1 className="text-lg font-semibold text-gray-900 truncate max-w-[200px]">
              {title}
            </h1>
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200 hover:ring-blue-300 transition-all duration-200 focus:outline-none focus:ring-blue-500"
            >
              <img 
                src={profileURL || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
                alt="Profile"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
                  <HiLogout className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {showMenu && (
          <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={() => setShowMenu(false)}>
            <div className="absolute left-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl">
              <div className="p-6">
                {/* Menu Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                      <HiHome className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">Menu</h2>
                      <p className="text-sm text-gray-500">Navigate your workspace</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowMenu(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                  >
                    <MdClose className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                {/* Menu Items */}
                <nav className="space-y-2">
                  {menuItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <Link
                        key={item.name}
                        to={item.path}
                        onClick={() => setShowMenu(false)}
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                      >
                        <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-blue-100 transition-colors duration-200">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* View Posted Jobs Button */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <Link
                    to="portal/job"
                    onClick={() => setShowMenu(false)}
                    className="flex items-center justify-center space-x-2 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <span>View Posted Jobs</span>
                    <HiExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navigation Bar */}
      <div className="hidden sm:flex bg-white border-b border-gray-100 px-6 py-4">
        <div className="flex items-center flex-1">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
              <HiHome className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{title}</h1>
              <p className="text-sm text-gray-500">Dashboard</p>
            </div>
          </div>
        </div>

        {/* Desktop Profile Section */}
        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-gray-200">
                <img 
                  src={profileURL || "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png"} 
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10"></div>
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-gray-900">Profile</p>
                <p className="text-xs text-gray-500">Manage account</p>
              </div>
            </button>

            {/* Desktop Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 top-14 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">Account</p>
                  <p className="text-xs text-gray-500">Manage your account settings</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
                  <HiLogout className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside to close dropdowns */}
      {(showProfileMenu) && (
        <div 
          className="fixed inset-0 z-30" 
          onClick={() => setShowProfileMenu(false)}
        ></div>
      )}
    </>
  );
}

export default TopNavigationBar;