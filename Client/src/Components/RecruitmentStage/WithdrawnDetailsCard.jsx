import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import { toast, ToastContainer } from "react-toastify";
import SwitchStatus from "./SwitchStatus";

function WithdrawnDetailsCard({ id }) {
  const [userDetails, setUserDetails] = useState();
  const [description, setDescription] = useState();

  const notify = () =>
    toast.success("Updated", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    const getCandidates = async () => {
      const options = {
        url: "http://localhost:8080/details/active/withdrawn/details",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id },
      };

      axios(options)
        .then((response) => {
          if (response.status === 200 && response.data) {
            setUserDetails(response.data);
            setDescription(response.data.withdrawn_reason || "");
            console.log("Withdrawn candidate details:", response.data); // For debugging
          } else {
            console.error("Error response:", response);
            toast.error("Failed to load candidate details");
          }
        })
        .catch((error) => {
          console.error("Error fetching withdrawn details:", error);
          toast.error("Failed to load candidate details");
        });
    };

    if (id) {
      getCandidates();
    }
  }, [id]);

  const handleTextValue = async () => {
    if (!description) {
      toast.error("Please enter a withdrawal reason");
      return;
    }

    try {
      const response = await axios({
        url: "http://localhost:8080/details/active/withdrawn/details/updateReason",
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;charset=UTF-8",
        },
        data: { id, description },
      });

      if (response.status === 200) {
        notify();
      } else {
        toast.error(response.data?.message || "Failed to update reason");
      }
    } catch (error) {
      console.error("Error updating reason:", error);
      toast.error(
        error.response?.data?.message || 
        "Failed to update reason. Please try again."
      );
    }
  };

  return (
    <div className="space-y-6">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Withdrawn Candidate</h3>

        <div className="flex items-center space-x-6">
          <img
            width={120}
            height={120}
            className="rounded-full object-cover"
            src={userDetails?.ResumeURL}
            alt={`${userDetails?.firstName} ${userDetails?.lastName}`}
          />

          <h2 className="text-2xl font-bold text-gray-900">
            {userDetails?.firstName} {userDetails?.lastName}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Withdrawal Reason</h2>

          <ReactQuill
            value={description}
            onChange={setDescription}
            className="bg-gray-50 rounded-lg"
            style={{ minHeight: '200px' }}
          />

          <div className="flex justify-center">
            <button
              onClick={handleTextValue}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Update Reason
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawnDetailsCard;
