import React, { useState } from "react";
import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Building, 
  Github, 
  Linkedin, 
  Upload, 
  Camera, 
  FileText, 
  Plus, 
  CheckCircle,
  ArrowLeft
} from "lucide-react";

function PostedJobApplyForm() {
  // __ Modal to show success msg when user registration get complete
  const [showModal, setShowModal] = useState(false);
  // __  To store the Date Of Birth
  const [startDate, setStartDate] = useState(new Date());

  //to show form when user is seeing modal of success
  const [hideForm, setHideForm] = useState("");
  // __ FORM HANDLING STATES __
  const [educationDetailsPart2, setEducationaDetailsPart2] = useState(false);
  const [educationDetailsPart3, setEducationaDetailsPart3] = useState(false);
  const [experienceDetails, setExperienceDetails] = useState(false);
  const [value, setValue] = useState(1);

  const [personalInformation, setPersonalInformation] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    address: "",
    city: "",
    zipCode: "",
  });

  const [educationalInformation, setEducationalInformation] = useState({
    institute: [],
    level: [],
    majors: [],
  });

  const [educationSessionInformation, setEducationSessionInformation] =
    useState({
      first: {
        from: [undefined],
        to: [undefined],
      },
      second: {
        from: [undefined],
        to: [undefined],
      },
      third: {
        from: [undefined],
        to: [undefined],
      },
    });

  const [professionalInformation, setProfessionalInformation] = useState({
    title: [],
    duration: [],
    companyName: [],
  });

  const [contactInformation, setContactInformation] = useState({
    emailAddress: "",
    phoneNo: "",
    linkedinProfile: "",
    gitHubProfile: "",
  });

  const [file, setFile] = useState();
  const [resume, setResume] = useState();

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleProfilePic = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(!loading);
    const DoB = {
      day: startDate.getDate(),
      month: startDate.getMonth(),
      year: startDate.getFullYear(),
    };

    const userData = {
      image: file,
      resume: resume,
      personalInfo: personalInformation,
      dob: DoB,
      accadamics: educationalInformation,
      accadamicsSession: educationSessionInformation,
      profesional: professionalInformation,
      contact: contactInformation,
      org_id: "sample_org",
      job_id: "sample_job",
    };

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setHideForm("none");
      setShowModal(true);
    }, 2000);
  };

  const handleGoBack = () => {
    console.log("Going back to job portal");
  };

  // LOADING STATE ANIMATION CODE
  let [loading, setLoading] = useState(false);

  const formatDate = (date) => {
    return date.toLocaleDateString();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative px-6 py-20 text-center">
          <h1 className="text-5xl font-bold mb-4 tracking-tight">Product Manager</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Join our innovative team and help shape the future of our products
          </p>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl transform animate-in fade-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Congratulations!</h2>
            <p className="text-gray-600 mb-6">
              Your application has been submitted successfully. We'll review it and get back to you soon.
            </p>
            <button
              onClick={handleGoBack}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Jobs
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <div style={{ display: hideForm }} className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-8 border-b border-gray-200">
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-2">
              Application Form
            </h2>
            <p className="text-gray-600 text-center">
              Please fill out all sections to complete your application
            </p>
          </div>

          <div className="p-8 space-y-12">
            {/* Personal Information Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Personal Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your first name"
                    value={personalInformation.firstName}
                    onChange={(e) => {
                      setPersonalInformation((oldValue) => ({
                        ...oldValue,
                        firstName: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your last name"
                    value={personalInformation.lastName}
                    onChange={(e) => {
                      setPersonalInformation((oldValue) => ({
                        ...oldValue,
                        lastName: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      value={startDate.toISOString().split('T')[0]}
                      onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    onChange={(e) => {
                      setPersonalInformation((oldValue) => ({
                        ...oldValue,
                        gender: e.target.value,
                      }));
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="Female">Female</option>
                    <option value="Male">Male</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your full address"
                      value={personalInformation.address}
                      onChange={(e) => {
                        setPersonalInformation((oldValue) => ({
                          ...oldValue,
                          address: e.target.value,
                        }));
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your city"
                    value={personalInformation.city}
                    onChange={(e) => {
                      setPersonalInformation((oldValue) => ({
                        ...oldValue,
                        city: e.target.value,
                      }));
                    }}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Zip Code *
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter zip code"
                    value={personalInformation.zipCode}
                    onChange={(e) => {
                      setPersonalInformation((oldValue) => ({
                        ...oldValue,
                        zipCode: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>

              {/* Profile Picture Upload */}
              <div className="mt-8">
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Profile Picture
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">Click to upload your profile picture</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                  >
                    <Upload className="w-4 h-4" />
                    Choose File
                  </label>
                  {file && (
                    <p className="mt-2 text-sm text-green-600">✓ {file.name} selected</p>
                  )}
                </div>
              </div>
            </section>

            {/* Education Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Academic Qualification</h3>
              </div>

              {/* First Education Entry */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Education #1</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institute *
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      onChange={(e) => {
                        setEducationalInformation((prevState) => ({
                          ...prevState,
                          institute: [...prevState.institute, e.target.value],
                        }));
                      }}
                      value={educationalInformation.institute[0] || ""}
                    >
                      <option value="">Select Institute</option>
                      <option value="Air University Islamabad">Air University Islamabad</option>
                      <option value="Comsats University Islamabad">Comsats University Islamabad</option>
                      <option value="National University of Sciences and Technology, Islamabad">NUST Islamabad</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Level *
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      onChange={(e) => {
                        setEducationalInformation((prevState) => ({
                          ...prevState,
                          level: [...prevState.level, e.target.value],
                        }));
                      }}
                      value={educationalInformation.level[0] || ""}
                    >
                      <option value="">Select Level</option>
                      <option value="B.S">Bachelor's</option>
                      <option value="M.S">Master's</option>
                      <option value="Ph.D">Ph.D</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Major *
                    </label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      onChange={(e) => {
                        setEducationalInformation((prevState) => ({
                          ...prevState,
                          majors: [...prevState.majors, e.target.value],
                        }));
                      }}
                      value={educationalInformation.majors[0] || ""}
                    >
                      <option value="">Select Major</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Business Administration">Business Administration</option>
                      <option value="Engineering">Engineering</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="From"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={educationSessionInformation.first.from || ""}
                        onChange={(e) => {
                          setEducationSessionInformation((prevState) => ({
                            ...prevState,
                            first: {
                              ...prevState.first,
                              from: e.target.value,
                            },
                          }));
                        }}
                      />
                      <input
                        type="number"
                        placeholder="To"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        value={educationSessionInformation.first.to || ""}
                        onChange={(e) => {
                          setEducationSessionInformation((prevState) => ({
                            ...prevState,
                            first: {
                              ...prevState.first,
                              to: e.target.value,
                            },
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Add More Education Button */}
              <button
                type="button"
                onClick={() => {
                  setEducationaDetailsPart2(true);
                  setValue((prev) => (prev <= 2 ? prev + 1 : prev));
                }}
                className="inline-flex items-center gap-2 px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add More Education
              </button>
            </section>

            {/* Professional Experience Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Professional Experience</h3>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-medium text-gray-800 mb-4">Experience #1</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Job Title *
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., Senior Developer"
                      onChange={(e) => {
                        setProfessionalInformation((prevState) => ({
                          ...prevState,
                          title: [e.target.value],
                        }));
                      }}
                      value={professionalInformation.title[0] || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Duration (Years) *
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="e.g., 2.5"
                      onChange={(e) => {
                        setProfessionalInformation((prevState) => ({
                          ...prevState,
                          duration: [e.target.value],
                        }));
                      }}
                      value={professionalInformation.duration[0] || ""}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., Google Inc."
                        onChange={(e) => {
                          setProfessionalInformation((prevState) => ({
                            ...prevState,
                            companyName: [e.target.value],
                          }));
                        }}
                        value={professionalInformation.companyName[0] || ""}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setExperienceDetails(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors duration-200"
              >
                <Plus className="w-4 h-4" />
                Add More Experience
              </button>
            </section>

            {/* Contact Information Section */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Contact Information</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                      onChange={(e) => {
                        setContactInformation((old) => ({
                          ...old,
                          emailAddress: e.target.value,
                        }));
                      }}
                      value={contactInformation.emailAddress}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="+92-300-1234567"
                      onChange={(e) => {
                        setContactInformation((old) => ({
                          ...old,
                          phoneNo: e.target.value,
                        }));
                      }}
                      value={contactInformation.phoneNo}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    LinkedIn Profile
                  </label>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="linkedin.com/in/your-profile"
                      onChange={(e) => {
                        setContactInformation((old) => ({
                          ...old,
                          linkedinProfile: e.target.value,
                        }));
                      }}
                      value={contactInformation.linkedinProfile}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    GitHub Profile
                  </label>
                  <div className="relative">
                    <Github className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                    <input
                      type="url"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="github.com/your-username"
                      onChange={(e) => {
                        setContactInformation((old) => ({
                          ...old,
                          gitHubProfile: e.target.value,
                        }));
                      }}
                      value={contactInformation.gitHubProfile}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Resume Upload Section */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-red-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-800">Resume Upload</h3>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-all duration-200">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">Upload your resume (PDF format)</p>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeUpload}
                  className="hidden"
                  id="resume-upload"
                />
                <label
                  htmlFor="resume-upload"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors duration-200"
                >
                  <Upload className="w-4 h-4" />
                  Choose PDF File
                </label>
                {resume && (
                  <p className="mt-2 text-sm text-green-600">✓ {resume.name} selected</p>
                )}
              </div>
            </section>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                onClick={submit}
                disabled={loading}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p className="text-gray-300">Powered by Smart Recruiter</p>
      </footer>
    </div>
  );
}

export default PostedJobApplyForm;