import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MainButton from "../../Components/Common/MainButton";

function VerifyOPT() {
  const [inputCode, SetinputCode] = useState("      "); // Initialize with 6 spaces
  const [error, SetError] = useState();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract token from URL
    const pathParts = location.pathname.split("/");
    const tokenFromUrl = pathParts[pathParts.length - 1];
    setToken(tokenFromUrl);
    
    // Get email from localStorage if available
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, [location]);

  const handle = (e) => {
    e.preventDefault();
    const options = {
      url: "http://localhost:8080/verify-forget-password",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
      },
      data: { token, otp: inputCode },
    };
    axios(options)
      .then((response) => {
        if (response.status == 200) {
          navigate(`/new-password/${token}`);
        }
      })
      .catch(function (error) {
        if (error.response && error.response.status === 400) {
          SetError("Invalid or expired OTP/token");
        } else {
          SetError("Error processing, something went wrong try again");
        }
      });
  };
  useEffect(() => {}, [inputCode]);
  return (
    <div>
      {/* component */}
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
        <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
          <div className="mx-auto flex w-full max-w-md flex-col space-y-12">
            <div className="flex flex-col items-center justify-center text-center space-y-2">
              <div className="text-3xl">
                <p className="heading2">Email Verification</p>
              </div>
              <div className="flex flex-row text-gray-400 w-full ">
                <p className="heading4 mt-4">
                  We have sent a code to your email {email}
                </p>
              </div>
            </div>
            <div>
              <form>
                <div className="flex flex-col space-y-16">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {[0, 1, 2, 3, 4, 5].map((index) => (
                      <div key={index} className="w-14 h-14">
                        <input
                          maxLength={1}
                          className="w-full h-full flex flex-col items-center justify-center text-center px-4 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                          type="text"
                          onChange={(e) => {
                            const value = e.target.value;
                            if (/^[0-9]$/.test(value)) {
                              SetinputCode((oldValue) => {
                                const newArray = oldValue.split('');
                                newArray[index] = value;
                                return newArray.join('');
                              });
                              // Auto-focus next input
                              const nextInput = e.target.parentElement.nextElementSibling?.querySelector('input');
                              if (nextInput) nextInput.focus();
                            }
                          }}
                          onKeyDown={(e) => {
                            // Handle backspace
                            if (e.key === 'Backspace' && !e.target.value) {
                              const prevInput = e.target.parentElement.previousElementSibling?.querySelector('input');
                              if (prevInput) {
                                prevInput.focus();
                                SetinputCode((oldValue) => {
                                  const newArray = oldValue.split('');
                                  newArray[index - 1] = '';
                                  return newArray.join('');
                                });
                              }
                            }
                          }}
                          pattern="\d*"
                          inputMode="numeric"
                        />
                      </div>
                    ))}
                  </div>
                  {/* -> ERROR MESSAGE UI CODE */}
                  {error == null ? null : (
                    <div className="text-white text-center font-semibold bg-red-600 p-2 w-9/12 m-auto rounded">
                      {error}
                    </div>
                  )}

                  {/* ~~ ERROR MESSAGE CODE IS ENDING HERE */}
                  <div className="flex flex-col space-y-5">
                    <div className="m-auto text-center w-full">
                      <button
                        type="submit"
                        onClick={handle}
                        className=" btnfont btn btn-wide  bg-primary border-none hover:bg-black shadow-sm"
                      >
                        Verify Account
                      </button>
                    </div>
                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        rel="noopener noreferrer"
                      >
                        Try again
                      </a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default VerifyOPT;
