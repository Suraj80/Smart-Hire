import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EmailVerification() {
  const { token } = useParams();
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setError("Invalid verification link.");
      return;
    }
    axios.post("http://localhost:8080/verify-email", { token })
      .then((res) => {
        if (res.status === 200) {
          setStatus("success");
        } else {
          setStatus("error");
          setError("Verification failed. Please try again or contact support.");
        }
      })
      .catch(() => {
        setStatus("error");
        setError("Verification failed. Please try again or contact support.");
      });
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === "pending" && (
          <>
            <div className="mb-4 animate-pulse">
              <svg className="w-12 h-12 mx-auto text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">Verifying your email...</h2>
            <p className="text-gray-500">Please wait while we verify your account.</p>
          </>
        )}
        {status === "success" && (
          <>
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2 text-green-600">Email Verified!</h2>
            <p className="text-gray-600 mb-6">Your account has been successfully verified. You can now log in.</p>
            <button
              className="btnfont btn btn-wide bg-primary text-white font-semibold rounded-xl hover:bg-black transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </>
        )}
        {status === "error" && (
          <>
            <div className="mb-4">
              <svg className="w-12 h-12 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2 text-red-600">Verification Failed</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              className="btnfont btn btn-wide bg-primary text-white font-semibold rounded-xl hover:bg-black transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default EmailVerification;
