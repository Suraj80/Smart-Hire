import React, { useState } from "react";
import { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function TopRcruitementCycle({ id }) {
  // const [ids, setID] = useState();
  // useEffect(() => {
  //   setID(id);
  // }, [id]);

  const NavLinkStyles = ({ isActive }) => {
    return {
      background: isActive ? "#0063B2" : "#2687F0",
      color: "white",
      padding: "0.875rem 1.25rem",
      borderRadius: "0.75rem",
      fontFamily: "Poppins, sans-serif",
      fontWeight: isActive ? 500 : 400,
      fontSize: "14px",
      lineHeight: "1.4",
      textDecoration: "none",
      textAlign: "center",
      minWidth: "fit-content",
      whiteSpace: "nowrap",
      transition: "all 0.2s ease-in-out",
      border: "2px solid transparent",
      boxShadow: isActive 
        ? "0 4px 12px rgba(0, 99, 178, 0.3)" 
        : "0 2px 8px rgba(38, 135, 240, 0.2)",
      transform: isActive ? "translateY(-1px)" : "translateY(0)",
    };
  };

  // console.log(id);
  return (
    <div className="flex justify-center px-4 py-2">
      <div className="bg-white w-full max-w-6xl flex overflow-x-auto scrollbar-hide gap-3 sm:gap-4 mx-auto p-6 rounded-xl shadow-lg border border-gray-100 justify-start sm:justify-between items-center">
        <style jsx>{`
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          
          /* Hover effects */
          .nav-link:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 6px 16px rgba(38, 135, 240, 0.3) !important;
          }
          
          /* Mobile scroll indicator */
          @media (max-width: 640px) {
            .nav-container::after {
              content: '';
              position: absolute;
              right: 0;
              top: 0;
              bottom: 0;
              width: 20px;
              background: linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0));
              pointer-events: none;
            }
          }
        `}</style>

        <NavLink 
          className="nav-link flex-shrink-0" 
          style={NavLinkStyles} 
          to={`/JobDetails/${id}`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
            Applied Candidates
          </span>
        </NavLink>

        {/* <NavLink style={NavLinkStyles} to={`/JobDetails/interviewing/${id}`}>
          Interviewing
        </NavLink> */}

        <NavLink 
          className="nav-link flex-shrink-0" 
          style={NavLinkStyles} 
          to={`/JobDetails/reccomended/${id}`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
            Recommended
          </span>
        </NavLink>

        <NavLink 
          className="nav-link flex-shrink-0" 
          style={NavLinkStyles} 
          to={`/JobDetails/hired/${id}`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Hired
          </span>
        </NavLink>

        <NavLink 
          className="nav-link flex-shrink-0" 
          style={NavLinkStyles} 
          to={`/JobDetails/rejected/${id}`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Declined
          </span>
        </NavLink>

        <NavLink 
          className="nav-link flex-shrink-0" 
          style={NavLinkStyles} 
          to={`/JobDetails/withdrawn/${id}`}
        >
          <span className="inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" clipRule="evenodd" />
            </svg>
            Withdrawn
          </span>
        </NavLink>
      </div>
    </div>
  );
}

export default TopRcruitementCycle;