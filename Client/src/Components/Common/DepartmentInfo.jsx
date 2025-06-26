import React from "react";

const DepartmentInfo = ({ department, info, onClose }) => {
  if (!department || !info) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-2">{department}</h2>
        <p className="mb-4 text-gray-700">{info.description}</p>
        <h3 className="font-semibold mt-4 mb-1">Key Roles:</h3>
        <ul className="list-disc list-inside mb-4">
          {info.roles.map((role, idx) => (
            <li key={idx}>{role}</li>
          ))}
        </ul>
        <h3 className="font-semibold mt-4 mb-1">Key Responsibilities:</h3>
        <ul className="list-disc list-inside">
          {info.responsibilities.map((resp, idx) => (
            <li key={idx}>{resp}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DepartmentInfo; 