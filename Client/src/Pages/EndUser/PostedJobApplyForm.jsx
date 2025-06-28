import axios from "axios";
import { React, useState, CSSProperties } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ClipLoader from "react-spinners/ClipLoader";

import {
  FcBusinessman,
  FcGraduationCap,
  FcAssistant,
  FcAdvertising,
  FcPlus,
  FcCamera,
  FcDocument,
} from "react-icons/fc";

import { FiPlusCircle } from "react-icons/fi";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Congrats from "../../assets/illustrations/congrats.svg";
import { BeatLoader } from "react-spinners";
function PostedJobApplyForm() {
  // __ Modal to show sucess msg when user registration get complete
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

  const location = useLocation();
  const Organization_id = location.state?.orgID;
  const { id } = useParams();

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
  };

  const handleProfilePic = (e) => {
    setFile(e.target.files[0]);
  };

  const submit = async (e) => {
    e.preventDefault();
    // const formData = await new FormData();
    // await formData.append("file", file);
    //to enable loading animation
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
      org_id: Organization_id,
      job_id: id,
    };
    // console.log(userData);
    const options = {
      url: "http://localhost:8080/job/apply-to-job",
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "multipart/form-data; ",
      },
      data: userData,
    };

    axios(options)
      .then((response) => {
        if (response.status == 200) {
          setLoading(!loading);
          setHideForm("none");
          setShowModal(true);
        } else if (response.status == 206) {
          setLoading(!loading);

          alert("Enter valid information in Form");
        } else {
          setLoading(!loading);

          alert("Enter all information as they were asked");
        }
      })
      .catch((e) => {
        setLoading(false);
        alert("kindly fill the complete form ");
      });
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/portal/job");
  };

  // LOADING STATE ANIMATION CODE
  let [loading, setLoading] = useState(false);
  const CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "lightblue",
  };
  // console.log(educationSessionInformation);
  return (
    <div>
      <div className="bg-gradient-to-b from-gray-900 to-gray-600 bg-gradient-to-r h-40 flex items-center justify-center shadow-xl">
        <h1 className="text-4xl heading text-white text-center">
          Product Manager
        </h1>
      </div>
      {/* ~~~ ON SUCESS JOB APPLY MODAL UI CODE */}

      {showModal == true ? (
        <div className="z-10 bg-white justify-center w-1/3 left-1/3 4 mt-12 p-6 modalShadow m-auto absolute">
          <h1 className="heading2b text-blue-500 text-center">Congrats!</h1>
          <img
            className="block m-auto mt-4"
            width={180}
            src={Congrats}
            alt=""
          />
          <p className="line1 text-center mt-4">
            Your application is subbmited successfully
          </p>
          <button
            onClick={handleGoBack}
            className="shadow bg-blue-500 p-3 rounded-lg block m-auto heading4 text-white mt-4 hover:bg-gray-600"
          >
            Go Back
          </button>
        </div>
      ) : undefined}

      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
      <div
        style={{ display: `${hideForm}` }}
        className="w-4/5 m-auto bg-gray-100 rounded-lg shadows flex flex-wrap gap-6 p-8 mt-12 mb-12"
      >
        <div className="block w-full">
          <h2 className="text-3xl heading2 text-center mb-8">
            Fill out the form
          </h2>
          <h3 className="heading3 font-medium ">
            <FcBusinessman className="inline text-4xl" /> Personal Information{" "}
          </h3>
        </div>
        <div>
          <label className="label line1">First Name</label>
          <input
            type="text"
            className="h-10 input input-bordered w-full"
            id="text"
            name="name"
            required
            autoComplete="on"
            placeholder="Alex"
            value={personalInformation.firstName}
            onChange={(e) => {
              setPersonalInformation((oldValue) => ({
                ...oldValue,
                firstName: e.target.value,
              }));
            }}
          />
        </div>

        <div className="ml-12">
          <label className="label line1">Last Name</label>
          <input
            type="text"
            required
            className="h-10 input input-bordered w-full"
            id="text"
            name="name"
            autoComplete="on"
            placeholder="Smith"
            value={personalInformation.lastName}
            onChange={(e) => {
              setPersonalInformation((oldValue) => ({
                ...oldValue,
                lastName: e.target.value,
              }));
            }}
          />
        </div>

        <div className="ml-2 ">
          <label htmlFor="dob" className="label line1">
            Data Of Birth
          </label>
          <DatePicker
            showIcon
            className="cursor-pointer bg-white w-44 p-2 rounded-md border border-solid border-gray-300"
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </div>

        <div className="ml-8">
          <label className="label line1">Gender</label>
          <select
            onChange={(e) => {
              setPersonalInformation((oldValue) => ({
                ...oldValue,
                gender: e.target.value,
              }));
            }}
            className="select select-bordered w-full  max-w-xs text-gray-500"
          >
            <option disabled selected className="text-gray-700">
              Select Gender
            </option>
            <option value={"Female"}>Female</option>
            <option value={"Male"}>Male</option>
          </select>
        </div>

        <div className=" w-2/6">
          <label className="label line1">Address</label>
          <input
            required
            type="text"
            className="h-10 input input-bordered w-full"
            id="text"
            name="address"
            autoComplete="on"
            placeholder="G-9/4 ISB"
            value={personalInformation.address}
            onChange={(e) => {
              setPersonalInformation((oldValue) => ({
                ...oldValue,
                address: e.target.value,
              }));
            }}
          />
        </div>

        <div className="ml-12">
          <label className="label line1">City</label>
          <input
            type="text"
            className="h-10 input input-bordered w-full"
            id="text"
            name="address"
            autoComplete="on"
            placeholder="Bengaluru"
            value={personalInformation.city}
            onChange={(e) => {
              setPersonalInformation((oldValue) => ({
                ...oldValue,
                city: e.target.value,
              }));
            }}
          />
        </div>

        <div className="ml-12">
          <label className="label line1">Zip-Code</label>
          <input
            type="number"
            className="h-10 input input-bordered w-1/2"
            id="text"
            name="address"
            autoComplete="on"
            placeholder="0110"
            value={personalInformation.zipCode}
            onChange={(e) => {
              setPersonalInformation((oldValue) => ({
                ...oldValue,
                zipCode: e.target.value,
              }));
            }}
          />
        </div>
        {/* ~~~~~ PROFILE PIC UPLOAD UI CODE  ~~~~~~~~*/}
        <div className="mt-2 flex justify-center m-auto p-4 items-center bg-transparent shadow-md cursor-pointer h-1/2 rounded-md">
          <div
            className="border bg-transparent border-gray-400 border-dashed rounded-md p-4 flex flex-col items-center justify-center
            hover:bg-gray-100
          "
          >
            <FcCamera className="text-4xl block" />
            <h3 className="mt-2 line1">Click here to Upload profile picture</h3>
            <input
              type="file"
              name="profile"
              onChange={handleProfilePic}
              id=""
              alt="select profile picture"
              accept="image/*"
              style={{
                position: "relative",
                top: "5px",
                background: "white",
                color: "white",
                display: "block",
                margin: "auto",
                width: "6.5em",
                border: "1px solid black",
                boxShadow: "2px 2px 2px 1px white",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* ACCAADAMIC QUALITFICATION */}
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <h3 className="heading3 mt-8 block w-full font-medium">
          <FcGraduationCap className="inline text-4xl mr-2" />
          Accadamics Qualification
        </h3>

        <div className="w-1/4">
          <label className="label line1">Institute</label>
          <select
            onChange={(e) => {
              setEducationalInformation((prevState) => ({
                ...prevState,
                institute: [...prevState.institute, e.target.value],
              }));
            }}
            value={educationalInformation.institute[0]}
            className="select select-bordered w-full  max-w-xs text-gray-500"
          >
            <option disabled selected className="text-gray-700">
              Select Insitute
            </option>
           <option value="Indian Institute of Technology Bombay">
  Indian Institute of Technology Bombay
</option>
<option value="Indian Institute of Technology Delhi">
  Indian Institute of Technology Delhi
</option>
<option value="Indian Institute of Technology Madras">
  Indian Institute of Technology Madras
</option>
<option value="Indian Institute of Technology Kanpur">
  Indian Institute of Technology Kanpur
</option>
<option value="Indian Institute of Technology Kharagpur">
  Indian Institute of Technology Kharagpur
</option>
<option value="National Institute of Technology Tiruchirappalli">
  National Institute of Technology Tiruchirappalli
</option>
<option value="National Institute of Technology Surathkal">
  National Institute of Technology Surathkal
</option>
<option value="Birla Institute of Technology and Science, Pilani">
  Birla Institute of Technology and Science, Pilani
</option>
<option value="Vellore Institute of Technology, Vellore">
  Vellore Institute of Technology, Vellore
</option>
<option value="Manipal Academy of Higher Education, Manipal">
  Manipal Academy of Higher Education, Manipal
</option>
<option value="University of Delhi">
  University of Delhi
</option>
<option value="Jawaharlal Nehru University, New Delhi">
  Jawaharlal Nehru University, New Delhi
</option>
<option value="Jamia Millia Islamia, New Delhi">
  Jamia Millia Islamia, New Delhi
</option>
<option value="Amity University, Noida">
  Amity University, Noida
</option>
<option value="Christ University, Bengaluru">
  Christ University, Bengaluru
</option>
<option value="Savitribai Phule Pune University, Pune">
  Savitribai Phule Pune University, Pune
</option>
<option value="Osmania University, Hyderabad">
  Osmania University, Hyderabad
</option>
<option value="Jadavpur University, Kolkata">
  Jadavpur University, Kolkata
</option>
<option value="Banaras Hindu University, Varanasi">
  Banaras Hindu University, Varanasi
</option>
<option value="Anna University, Chennai">
  Anna University, Chennai
</option>

           
          </select>
        </div>

        <div className="w-1/6">
          <label className="label line1">Level</label>
          <select
            onChange={(e) => {
              setEducationalInformation((prevState) => ({
                ...prevState,
                level: [...prevState.level, e.target.value],
              }));
            }}
            value={educationalInformation.level[0]}
            className="select select-bordered w-full  max-w-xs text-gray-500"
          >
            <option disabled selected className="text-gray-700">
              Under / Post Grad
            </option>
            <option>B.C.A</option>
             <option>B.S.C</option>
             <option>B.TECH</option>
            <option>M.C.A</option>
            <option>M.TECH</option>
            <option>MBA</option>
            <option>Ph.D</option>
          </select>
        </div>

        <div className="w-1/5">
          <label className="label line1">Majors In</label>
          <select
            onChange={(e) => {
              setEducationalInformation((prevState) => ({
                ...prevState,
                majors: [...prevState.majors, e.target.value],
              }));
            }}
            value={educationalInformation.majors[0]}
            className="select select-bordered w-full  max-w-xs text-gray-500"
          >
            <option disabled selected className="text-gray-700">
              Degree Program
            </option>
            <option value="Accounting and Finance">
              Accounting and Finance
            </option>
            <option value="Actuarial Science">Actuarial Science</option>
            <option value="Aerospace Engineering">Aerospace Engineering</option>
            <option value="Agricultural Sciences">Agricultural Sciences</option>
            <option value="Anthropology">Anthropology</option>
            <option value="Applied Linguistics">Applied Linguistics</option>
            <option value="Applied Psychology">Applied Psychology</option>
            <option value="Architecture and Design">
              Architecture and Design
            </option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Automotive Engineering">
              Automotive Engineering
            </option>
            <option value="Aviation Management">Aviation Management</option>
            <option value="Banking and Finance">Banking and Finance</option>
            <option value="Biochemistry">Biochemistry</option>
            <option value="Bioinformatics">Bioinformatics</option>
            <option value="Biological Sciences">Biological Sciences</option>
            <option value="Biomedical Engineering">
              Biomedical Engineering
            </option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="Botany">Botany</option>
            <option value="Business Administration">
              Business Administration
            </option>
            <option value="Chemical Engineering">Chemical Engineering</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Climate Change">Climate Change</option>
            <option value="Commerce">Commerce</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Criminology">Criminology</option>
            <option value="Data Science">Data Science</option>
            <option value="Dentistry">Dentistry</option>
            <option value="Design and Visual Arts">
              Design and Visual Arts
            </option>
            <option value="Development Studies">Development Studies</option>
            <option value="Economics">Economics</option>
            <option value="Education">Education</option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Electronics Engineering">
              Electronics Engineering
            </option>
            <option value="Energy Systems Engineering">
              Energy Systems Engineering
            </option>
            <option value="English Language and Literature">
              English Language and Literature
            </option>
            <option value="Environmental Sciences">
              Environmental Sciences
            </option>
            <option value="Fashion Design">Fashion Design</option>
            <option value="Film and TV Production">
              Film and TV Production
            </option>
            <option value="Food Science and Technology">
              Food Science and Technology
            </option>
            <option value="Forensic Sciences">Forensic Sciences</option>
            <option value="Gender Studies">Gender Studies</option>
            <option value="Genetics">Genetics</option>
            <option value="Geography">Geography</option>
            <option value="Geology">Geology</option>
            <option value="Graphic Design">Graphic Design</option>
            <option value="Health and Physical Education">
              Health and Physical Education
            </option>
            <option value="History">History</option>
            <option value="Hospitality and Tourism Management">
              Hospitality and Tourism Management
            </option>
            <option value="Human Resource Management">
              Human Resource Management
            </option>
            <option value="Industrial Design">Industrial Design</option>
            <option value="Information Security">Information Security</option>
            <option value="Information Technology">
              Information Technology
            </option>
            <option value="International Relations">
              International Relations
            </option>
            <option value="Islamic Studies">Islamic Studies</option>
            <option value="Journalism and Mass Communication">
              Journalism and Mass Communication
            </option>
            <option value="Law">Law</option>
            <option value="Library and Information Science">
              Library and Information Science
            </option>
            <option value="Linguistics">Linguistics</option>
            <option value="Management Sciences">Management Sciences</option>
            <option value="Marine Sciences">Marine Sciences</option>
            <option value="Marketing">Marketing</option>
            <option value="Materials Science and Engineering">
              Materials Science and Engineering
            </option>
            <option value="Mathematics">Mathematics</option>
            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>
            <option value="Media and Communication Studies">
              Media and Communication Studies
            </option>
            <option value="Medical Laboratory Technology">
              Medical Laboratory Technology
            </option>
            <option value="Medicine and Surgery">Medicine and Surgery</option>
            <option value="Metallurgy and Materials Engineering">
              Metallurgy and Materials Engineering
            </option>
            <option value="Microbiology">Microbiology</option>
            <option value="Mining Engineering">Mining Engineering</option>
            <option value="Multimedia Arts">Multimedia Arts</option>
            <option value="Nanotechnology">Nanotechnology</option>
            <option value="Natural Resource Management">
              Natural Resource Management
            </option>
            <option value="Neuroscience">Neuroscience</option>
            <option value="Nursing">Nursing</option>
            <option value="Nutrition and Dietetics">
              Nutrition and Dietetics
            </option>
            <option value="Peace and Conflict Studies">
              Peace and Conflict Studies
            </option>
            <option value="Pharmaceutical Sciences">
              Pharmaceutical Sciences
            </option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Physics">Physics</option>
            <option value="Physiotherapy">Physiotherapy</option>
            <option value="Plant Sciences">Plant Sciences</option>
            <option value="Political Science">Political Science</option>
            <option value="Project Management">Project Management</option>
            <option value="Psychology">Psychology</option>
            <option value="Public Administration">Public Administration</option>
            <option value="Public Health">Public Health</option>
            <option value="Quality Management">Quality Management</option>
            <option value="Renewable Energy Engineering">
              Renewable Energy Engineering
            </option>
            <option value="Robotics and Artificial Intelligence">
              Robotics and Artificial Intelligence
            </option>
            <option value="Social Sciences">Social Sciences</option>
            <option value="Software Engineering">Software Engineering</option>
            <option value="Sociology">Sociology</option>
            <option value="Soil and Environmental Sciences">
              Soil and Environmental Sciences
            </option>
            <option value="Statistics">Statistics</option>
            <option value="Supply Chain Management">
              Supply Chain Management
            </option>
            <option value="Telecommunication Engineering">
              Telecommunication Engineering
            </option>
            <option value="Textile Design">Textile Design</option>
            <option value="Textile Engineering">Textile Engineering</option>
            <option value="Tourism and Hospitality Management">
              Tourism and Hospitality Management
            </option>
            <option value="Transportation Engineering">
              Transportation Engineering
            </option>
            <option value="Urdu Language and Literature">
              Urdu Language and Literature
            </option>
            <option value="Veterinary Sciences">Veterinary Sciences</option>
            <option value="Water Resource Engineering">
              Water Resource Engineering
            </option>
            <option value="Zoology">Zoology</option>
          </select>
        </div>

        {/* YEAR OR SESSION SELECTION UI CODE */}
        <div className="w-12 ml-2">
          <label htmlFor="session" className="label line1">
            Session
          </label>

          <input
            type="number"
            placeholder="2k19"
            maxLength={4}
            required
            value={educationSessionInformation.first.from}
            onChange={(e) => {
              setEducationSessionInformation((prevState) => ({
                ...prevState,
                first: {
                  ...prevState.first,
                  from: e.target.value,
                },
              }));
            }}
            className="input  input-bordered w-20"
          />
        </div>

        <div className="ml-8 mt-14">
          <h5 className="line1 font-medium">To</h5>
        </div>

        <div className="w-12">
          <label htmlFor="session" className="label line1 text-transparent">
            ,
          </label>

          <input
            type="number"
            placeholder="2k19"
            maxLength={4}
            required
            className="input  input-bordered w-20"
            value={educationSessionInformation.first.to}
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

        <div className=" w-full">
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* CODE FOR 2ND EDUCATION DETAILS UI CODE */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {educationDetailsPart2 == true && value >= 2 ? (
            <div className="flex mb-6">
              <div className="w-1/4">
                <label className="label line1">Institute</label>
                <select
                  onChange={(e) => {
                    setEducationalInformation((prevState) => ({
                      ...prevState,
                      institute: [...prevState.institute, e.target.value],
                    }));
                  }}
                  value={educationalInformation.institute[1]}
                  className="select select-bordered w-full  max-w-xs text-gray-500"
                >
                  <option disabled selected className="text-gray-700">
                    Select Insitute
                  </option>
                  <option value="Indian Institute of Technology Bombay">
  Indian Institute of Technology Bombay
</option>
<option value="Indian Institute of Technology Delhi">
  Indian Institute of Technology Delhi
</option>
<option value="Indian Institute of Technology Madras">
  Indian Institute of Technology Madras
</option>
<option value="Indian Institute of Technology Kanpur">
  Indian Institute of Technology Kanpur
</option>
<option value="Indian Institute of Technology Kharagpur">
  Indian Institute of Technology Kharagpur
</option>
<option value="National Institute of Technology Tiruchirappalli">
  National Institute of Technology Tiruchirappalli
</option>
<option value="National Institute of Technology Surathkal">
  National Institute of Technology Surathkal
</option>
<option value="Birla Institute of Technology and Science, Pilani">
  Birla Institute of Technology and Science, Pilani
</option>
<option value="Vellore Institute of Technology, Vellore">
  Vellore Institute of Technology, Vellore
</option>
<option value="Manipal Institute of Technology, Manipal">
  Manipal Institute of Technology, Manipal
</option>
<option value="University of Delhi">
  University of Delhi
</option>
<option value="Jawaharlal Nehru University, New Delhi">
  Jawaharlal Nehru University, New Delhi
</option>
<option value="Jamia Millia Islamia, New Delhi">
  Jamia Millia Islamia, New Delhi
</option>
<option value="Banaras Hindu University, Varanasi">
  Banaras Hindu University, Varanasi
</option>
<option value="Aligarh Muslim University, Aligarh">
  Aligarh Muslim University, Aligarh
</option>
<option value="Anna University, Chennai">
  Anna University, Chennai
</option>
<option value="Savitribai Phule Pune University, Pune">
  Savitribai Phule Pune University, Pune
</option>
<option value="University of Calcutta, Kolkata">
  University of Calcutta, Kolkata
</option>
<option value="University of Mumbai, Mumbai">
  University of Mumbai, Mumbai
</option>
<option value="Osmania University, Hyderabad">
  Osmania University, Hyderabad
</option>
<option value="Jadavpur University, Kolkata">
  Jadavpur University, Kolkata
</option>
<option value="Amity University, Noida">
  Amity University, Noida
</option>
<option value="Christ University, Bengaluru">
  Christ University, Bengaluru
</option>
<option value="Shiv Nadar University, Greater Noida">
  Shiv Nadar University, Greater Noida
</option>
<option value="Ashoka University, Sonepat">
  Ashoka University, Sonepat
</option>
<option value="SRM Institute of Science and Technology, Chennai">
  SRM Institute of Science and Technology, Chennai
</option>
<option value="Sharda University, Greater Noida">
  Sharda University, Greater Noida
</option>
<option value="Guru Gobind Singh Indraprastha University, Delhi">
  Guru Gobind Singh Indraprastha University, Delhi
</option>
<option value="Indira Gandhi Delhi Technical University for Women">
  Indira Gandhi Delhi Technical University for Women
</option>
<option value="Dr. A.P.J. Abdul Kalam Technical University, Lucknow">
  Dr. A.P.J. Abdul Kalam Technical University, Lucknow
</option>
<option value="IIIT Hyderabad">
  IIIT Hyderabad
</option>
<option value="IIIT Bangalore">
  IIIT Bangalore
</option>
<option value="IIIT Allahabad">
  IIIT Allahabad
</option>
<option value="Delhi Technological University, Delhi">
  Delhi Technological University, Delhi
</option>
<option value="Netaji Subhas University of Technology, Delhi">
  Netaji Subhas University of Technology, Delhi
</option>
<option value="BMS College of Engineering, Bengaluru">
  BMS College of Engineering, Bengaluru
</option>
<option value="PES University, Bengaluru">
  PES University, Bengaluru
</option>
<option value="College of Engineering, Pune">
  College of Engineering, Pune
</option>
<option value="LD College of Engineering, Ahmedabad">
  LD College of Engineering, Ahmedabad
</option>
<option value="Thapar Institute of Engineering and Technology, Patiala">
  Thapar Institute of Engineering and Technology, Patiala
</option>
<option value="Lovely Professional University, Phagwara">
  Lovely Professional University, Phagwara
</option>
<option value="Graphic Era University, Dehradun">
  Graphic Era University, Dehradun
</option>
<option value="KIIT University, Bhubaneswar">
  KIIT University, Bhubaneswar
</option>
<option value="SRM University, Delhi-NCR">
  SRM University, Delhi-NCR
</option>
<option value="Vel Tech University, Chennai">
  Vel Tech University, Chennai
</option>
<option value="SASTRA University, Thanjavur">
  SASTRA University, Thanjavur
</option>
<option value="Tezpur University, Assam">
  Tezpur University, Assam
</option>
<option value="North Eastern Hill University, Shillong">
  North Eastern Hill University, Shillong
</option>

                </select>
              </div>

              <div className="w-1/6 ml-6">
                <label className="label line1">Level</label>
                <select
                  onChange={(e) => {
                    setEducationalInformation((prevState) => ({
                      ...prevState,
                      level: [...prevState.level, e.target.value],
                    }));
                  }}
                  value={educationalInformation.level[1]}
                  className="select select-bordered w-full  max-w-xs text-gray-500"
                >
                  <option disabled selected className="text-gray-700">
                    Under / Post Grad
                  </option>
                  <option>B.C.A</option>
             <option>B.S.C</option>
             <option>B.TECH</option>
            <option>M.C.A</option>
            <option>M.TECH</option>
            <option>MBA</option>
            <option>Ph.D</option>
                </select>
              </div>

              <div className="w-1/5 ml-6">
                <label className="label line1">Majors In</label>
                <select
                  onChange={(e) => {
                    setEducationalInformation((prevState) => ({
                      ...prevState,
                      majors: [...prevState.majors, e.target.value],
                    }));
                  }}
                  value={educationalInformation.majors[1]}
                  className="select select-bordered w-full  max-w-xs text-gray-500"
                >
                  <option disabled selected className="text-gray-700">
                    Degree Program
                  </option>
                  <option value="Accounting and Finance">
                    Accounting and Finance
                  </option>
                  <option value="Actuarial Science">Actuarial Science</option>
                  <option value="Aerospace Engineering">
                    Aerospace Engineering
                  </option>
                  <option value="Agricultural Sciences">
                    Agricultural Sciences
                  </option>
                  <option value="Anthropology">Anthropology</option>
                  <option value="Applied Linguistics">
                    Applied Linguistics
                  </option>
                  <option value="Applied Psychology">Applied Psychology</option>
                  <option value="Architecture and Design">
                    Architecture and Design
                  </option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Automotive Engineering">
                    Automotive Engineering
                  </option>
                  <option value="Aviation Management">
                    Aviation Management
                  </option>
                  <option value="Banking and Finance">
                    Banking and Finance
                  </option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Bioinformatics">Bioinformatics</option>
                  <option value="Biological Sciences">
                    Biological Sciences
                  </option>
                  <option value="Biomedical Engineering">
                    Biomedical Engineering
                  </option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Botany">Botany</option>
                  <option value="Business Administration">
                    Business Administration
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Climate Change">Climate Change</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Computer Engineering">
                    Computer Engineering
                  </option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Criminology">Criminology</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="Design and Visual Arts">
                    Design and Visual Arts
                  </option>
                  <option value="Development Studies">
                    Development Studies
                  </option>
                  <option value="Economics">Economics</option>
                  <option value="Education">Education</option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Electronics Engineering">
                    Electronics Engineering
                  </option>
                  <option value="Energy Systems Engineering">
                    Energy Systems Engineering
                  </option>
                  <option value="English Language and Literature">
                    English Language and Literature
                  </option>
                  <option value="Environmental Sciences">
                    Environmental Sciences
                  </option>
                  <option value="Fashion Design">Fashion Design</option>
                  <option value="Film and TV Production">
                    Film and TV Production
                  </option>
                  <option value="Food Science and Technology">
                    Food Science and Technology
                  </option>
                  <option value="Forensic Sciences">Forensic Sciences</option>
                  <option value="Gender Studies">Gender Studies</option>
                  <option value="Genetics">Genetics</option>
                  <option value="Geography">Geography</option>
                  <option value="Geology">Geology</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Health and Physical Education">
                    Health and Physical Education
                  </option>
                  <option value="History">History</option>
                  <option value="Hospitality and Tourism Management">
                    Hospitality and Tourism Management
                  </option>
                  <option value="Human Resource Management">
                    Human Resource Management
                  </option>
                  <option value="Industrial Design">Industrial Design</option>
                  <option value="Information Security">
                    Information Security
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="International Relations">
                    International Relations
                  </option>
                  <option value="Islamic Studies">Islamic Studies</option>
                  <option value="Journalism and Mass Communication">
                    Journalism and Mass Communication
                  </option>
                  <option value="Law">Law</option>
                  <option value="Library and Information Science">
                    Library and Information Science
                  </option>
                  <option value="Linguistics">Linguistics</option>
                  <option value="Management Sciences">
                    Management Sciences
                  </option>
                  <option value="Marine Sciences">Marine Sciences</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Materials Science and Engineering">
                    Materials Science and Engineering
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Media and Communication Studies">
                    Media and Communication Studies
                  </option>
                  <option value="Medical Laboratory Technology">
                    Medical Laboratory Technology
                  </option>
                  <option value="Medicine and Surgery">
                    Medicine and Surgery
                  </option>
                  <option value="Metallurgy and Materials Engineering">
                    Metallurgy and Materials Engineering
                  </option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Mining Engineering">Mining Engineering</option>
                  <option value="Multimedia Arts">Multimedia Arts</option>
                  <option value="Nanotechnology">Nanotechnology</option>
                  <option value="Natural Resource Management">
                    Natural Resource Management
                  </option>
                  <option value="Neuroscience">Neuroscience</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Nutrition and Dietetics">
                    Nutrition and Dietetics
                  </option>
                  <option value="Peace and Conflict Studies">
                    Peace and Conflict Studies
                  </option>
                  <option value="Pharmaceutical Sciences">
                    Pharmaceutical Sciences
                  </option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Physics">Physics</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Plant Sciences">Plant Sciences</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Public Administration">
                    Public Administration
                  </option>
                  <option value="Public Health">Public Health</option>
                  <option value="Quality Management">Quality Management</option>
                  <option value="Renewable Energy Engineering">
                    Renewable Energy Engineering
                  </option>
                  <option value="Robotics and Artificial Intelligence">
                    Robotics and Artificial Intelligence
                  </option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Sociology">Sociology</option>
                  <option value="Soil and Environmental Sciences">
                    Soil and Environmental Sciences
                  </option>
                  <option value="Statistics">Statistics</option>
                  <option value="Supply Chain Management">
                    Supply Chain Management
                  </option>
                  <option value="Telecommunication Engineering">
                    Telecommunication Engineering
                  </option>
                  <option value="Textile Design">Textile Design</option>
                  <option value="Textile Engineering">
                    Textile Engineering
                  </option>
                  <option value="Tourism and Hospitality Management">
                    Tourism and Hospitality Management
                  </option>
                  <option value="Transportation Engineering">
                    Transportation Engineering
                  </option>
                  <option value="Urdu Language and Literature">
                    Urdu Language and Literature
                  </option>
                  <option value="Veterinary Sciences">
                    Veterinary Sciences
                  </option>
                  <option value="Water Resource Engineering">
                    Water Resource Engineering
                  </option>
                  <option value="Zoology">Zoology</option>
                </select>
              </div>

              {/* YEAR OR SESSION SELECTION UI CODE */}
              <div className="w-12 ml-8">
                <label htmlFor="session" className="label line1">
                  Session
                </label>

                <input
                  type="text"
                  value={educationSessionInformation.second.from}
                  onChange={(e) => {
                    setEducationSessionInformation((prevState) => ({
                      ...prevState,
                      second: {
                        ...prevState.second,
                        from: e.target.value,
                      },
                    }));
                  }}
                  placeholder="2k19"
                  className="input  input-bordered w-20"
                />
              </div>

              <div className="ml-14 mt-14">
                <h5 className="line1 font-medium">To</h5>
              </div>

              <div className="w-12 ml-6">
                <label
                  htmlFor="session"
                  className="label line1 text-transparent"
                >
                  ,
                </label>

                <input
                  type="text"
                  placeholder="2k23"
                  className="input  input-bordered w-20"
                  value={educationSessionInformation.second.to}
                  onChange={(e) => {
                    setEducationSessionInformation((prevState) => ({
                      ...prevState,
                      second: {
                        ...prevState.second,
                        to: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          ) : undefined}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* CODE FOR 3RD EDUCATION DETAILS UI CODE */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {educationDetailsPart2 == true && value == 3 ? (
            <div className="flex mb-6">
              <div className="w-1/4">
                <label className="label line1">Institute</label>
                <select
                  onChange={(e) => {
                    setEducationalInformation((prevState) => ({
                      ...prevState,
                      institute: [...prevState.institute, e.target.value],
                    }));
                  }}
                  value={educationalInformation.institute[2]}
                  className="select select-bordered w-full  max-w-xs text-gray-500"
                >
                  <option disabled selected className="text-gray-700">
                    Select Insitute
                  </option>
                 <option value="Indian Institute of Technology Bombay">
  Indian Institute of Technology Bombay
</option>
<option value="Indian Institute of Technology Delhi">
  Indian Institute of Technology Delhi
</option>
<option value="Indian Institute of Technology Madras">
  Indian Institute of Technology Madras
</option>
<option value="Indian Institute of Technology Kanpur">
  Indian Institute of Technology Kanpur
</option>
<option value="Indian Institute of Technology Kharagpur">
  Indian Institute of Technology Kharagpur
</option>
<option value="National Institute of Technology Tiruchirappalli">
  National Institute of Technology Tiruchirappalli
</option>
<option value="National Institute of Technology Surathkal">
  National Institute of Technology Surathkal
</option>
<option value="Birla Institute of Technology and Science, Pilani">
  Birla Institute of Technology and Science, Pilani
</option>
<option value="Vellore Institute of Technology, Vellore">
  Vellore Institute of Technology, Vellore
</option>
<option value="Manipal Institute of Technology, Manipal">
  Manipal Institute of Technology, Manipal
</option>
<option value="University of Delhi">
  University of Delhi
</option>
<option value="Jawaharlal Nehru University, New Delhi">
  Jawaharlal Nehru University, New Delhi
</option>
<option value="Jamia Millia Islamia, New Delhi">
  Jamia Millia Islamia, New Delhi
</option>
<option value="Banaras Hindu University, Varanasi">
  Banaras Hindu University, Varanasi
</option>
<option value="Aligarh Muslim University, Aligarh">
  Aligarh Muslim University, Aligarh
</option>
<option value="Anna University, Chennai">
  Anna University, Chennai
</option>
<option value="Savitribai Phule Pune University, Pune">
  Savitribai Phule Pune University, Pune
</option>
<option value="University of Calcutta, Kolkata">
  University of Calcutta, Kolkata
</option>
<option value="University of Mumbai, Mumbai">
  University of Mumbai, Mumbai
</option>
<option value="Osmania University, Hyderabad">
  Osmania University, Hyderabad
</option>
<option value="Jadavpur University, Kolkata">
  Jadavpur University, Kolkata
</option>
<option value="Amity University, Noida">
  Amity University, Noida
</option>
<option value="Christ University, Bengaluru">
  Christ University, Bengaluru
</option>
<option value="Shiv Nadar University, Greater Noida">
  Shiv Nadar University, Greater Noida
</option>
<option value="Ashoka University, Sonepat">
  Ashoka University, Sonepat
</option>
<option value="SRM Institute of Science and Technology, Chennai">
  SRM Institute of Science and Technology, Chennai
</option>
<option value="Sharda University, Greater Noida">
  Sharda University, Greater Noida
</option>
<option value="Guru Gobind Singh Indraprastha University, Delhi">
  Guru Gobind Singh Indraprastha University, Delhi
</option>
<option value="Indira Gandhi Delhi Technical University for Women">
  Indira Gandhi Delhi Technical University for Women
</option>
<option value="Dr. A.P.J. Abdul Kalam Technical University, Lucknow">
  Dr. A.P.J. Abdul Kalam Technical University, Lucknow
</option>
<option value="IIIT Hyderabad">
  IIIT Hyderabad
</option>
<option value="IIIT Bangalore">
  IIIT Bangalore
</option>
<option value="IIIT Allahabad">
  IIIT Allahabad
</option>
<option value="Delhi Technological University, Delhi">
  Delhi Technological University, Delhi
</option>
<option value="Netaji Subhas University of Technology, Delhi">
  Netaji Subhas University of Technology, Delhi
</option>
<option value="BMS College of Engineering, Bengaluru">
  BMS College of Engineering, Bengaluru
</option>
<option value="PES University, Bengaluru">
  PES University, Bengaluru
</option>
<option value="College of Engineering, Pune">
  College of Engineering, Pune
</option>
<option value="LD College of Engineering, Ahmedabad">
  LD College of Engineering, Ahmedabad
</option>
<option value="Thapar Institute of Engineering and Technology, Patiala">
  Thapar Institute of Engineering and Technology, Patiala
</option>
<option value="Lovely Professional University, Phagwara">
  Lovely Professional University, Phagwara
</option>
<option value="Graphic Era University, Dehradun">
  Graphic Era University, Dehradun
</option>
<option value="KIIT University, Bhubaneswar">
  KIIT University, Bhubaneswar
</option>
<option value="SRM University, Delhi-NCR">
  SRM University, Delhi-NCR
</option>
<option value="Vel Tech University, Chennai">
  Vel Tech University, Chennai
</option>
<option value="SASTRA University, Thanjavur">
  SASTRA University, Thanjavur
</option>
<option value="Tezpur University, Assam">
  Tezpur University, Assam
</option>
<option value="North Eastern Hill University, Shillong">
  North Eastern Hill University, Shillong
</option>

                </select>
              </div>

              <div className="w-1/6 ml-6">
                <label className="label line1">Level</label>
                <select
                  onChange={(e) => {
                    setEducationalInformation((prevState) => ({
                      ...prevState,
                      level: [...prevState.level, e.target.value],
                    }));
                  }}
                  value={educationalInformation.level[2]}
                  className="select select-bordered w-full  max-w-xs text-gray-500"
                >
                  <option disabled selected className="text-gray-700">
                    Under / Post Grad
                  </option>
                 <option>B.C.A</option>
             <option>B.S.C</option>
             <option>B.TECH</option>
            <option>M.C.A</option>
            <option>M.TECH</option>
            <option>MBA</option>
            <option>Ph.D</option>
                </select>
              </div>

              <div className="w-1/5 ml-6">
                <label className="label line1">Majors In</label>
                <select
                  onChange={(e) => {
                    setEducationalInformation((prevState) => ({
                      ...prevState,
                      majors: [...prevState.majors, e.target.value],
                    }));
                  }}
                  value={educationalInformation.majors[2]}
                  className="select select-bordered w-full  max-w-xs text-gray-500"
                >
                  <option disabled selected className="text-gray-700">
                    Degree Program
                  </option>
                  <option value="Accounting and Finance">
                    Accounting and Finance
                  </option>
                  <option value="Actuarial Science">Actuarial Science</option>
                  <option value="Aerospace Engineering">
                    Aerospace Engineering
                  </option>
                  <option value="Agricultural Sciences">
                    Agricultural Sciences
                  </option>
                  <option value="Anthropology">Anthropology</option>
                  <option value="Applied Linguistics">
                    Applied Linguistics
                  </option>
                  <option value="Applied Psychology">Applied Psychology</option>
                  <option value="Architecture and Design">
                    Architecture and Design
                  </option>
                  <option value="Artificial Intelligence">
                    Artificial Intelligence
                  </option>
                  <option value="Automotive Engineering">
                    Automotive Engineering
                  </option>
                  <option value="Aviation Management">
                    Aviation Management
                  </option>
                  <option value="Banking and Finance">
                    Banking and Finance
                  </option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Bioinformatics">Bioinformatics</option>
                  <option value="Biological Sciences">
                    Biological Sciences
                  </option>
                  <option value="Biomedical Engineering">
                    Biomedical Engineering
                  </option>
                  <option value="Biotechnology">Biotechnology</option>
                  <option value="Botany">Botany</option>
                  <option value="Business Administration">
                    Business Administration
                  </option>
                  <option value="Chemical Engineering">
                    Chemical Engineering
                  </option>
                  <option value="Chemistry">Chemistry</option>
                  <option value="Civil Engineering">Civil Engineering</option>
                  <option value="Climate Change">Climate Change</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Computer Engineering">
                    Computer Engineering
                  </option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Criminology">Criminology</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Dentistry">Dentistry</option>
                  <option value="Design and Visual Arts">
                    Design and Visual Arts
                  </option>
                  <option value="Development Studies">
                    Development Studies
                  </option>
                  <option value="Economics">Economics</option>
                  <option value="Education">Education</option>
                  <option value="Electrical Engineering">
                    Electrical Engineering
                  </option>
                  <option value="Electronics Engineering">
                    Electronics Engineering
                  </option>
                  <option value="Energy Systems Engineering">
                    Energy Systems Engineering
                  </option>
                  <option value="English Language and Literature">
                    English Language and Literature
                  </option>
                  <option value="Environmental Sciences">
                    Environmental Sciences
                  </option>
                  <option value="Fashion Design">Fashion Design</option>
                  <option value="Film and TV Production">
                    Film and TV Production
                  </option>
                  <option value="Food Science and Technology">
                    Food Science and Technology
                  </option>
                  <option value="Forensic Sciences">Forensic Sciences</option>
                  <option value="Gender Studies">Gender Studies</option>
                  <option value="Genetics">Genetics</option>
                  <option value="Geography">Geography</option>
                  <option value="Geology">Geology</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Health and Physical Education">
                    Health and Physical Education
                  </option>
                  <option value="History">History</option>
                  <option value="Hospitality and Tourism Management">
                    Hospitality and Tourism Management
                  </option>
                  <option value="Human Resource Management">
                    Human Resource Management
                  </option>
                  <option value="Industrial Design">Industrial Design</option>
                  <option value="Information Security">
                    Information Security
                  </option>
                  <option value="Information Technology">
                    Information Technology
                  </option>
                  <option value="International Relations">
                    International Relations
                  </option>
                  <option value="Islamic Studies">Islamic Studies</option>
                  <option value="Journalism and Mass Communication">
                    Journalism and Mass Communication
                  </option>
                  <option value="Law">Law</option>
                  <option value="Library and Information Science">
                    Library and Information Science
                  </option>
                  <option value="Linguistics">Linguistics</option>
                  <option value="Management Sciences">
                    Management Sciences
                  </option>
                  <option value="Marine Sciences">Marine Sciences</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Materials Science and Engineering">
                    Materials Science and Engineering
                  </option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Mechanical Engineering">
                    Mechanical Engineering
                  </option>
                  <option value="Media and Communication Studies">
                    Media and Communication Studies
                  </option>
                  <option value="Medical Laboratory Technology">
                    Medical Laboratory Technology
                  </option>
                  <option value="Medicine and Surgery">
                    Medicine and Surgery
                  </option>
                  <option value="Metallurgy and Materials Engineering">
                    Metallurgy and Materials Engineering
                  </option>
                  <option value="Microbiology">Microbiology</option>
                  <option value="Mining Engineering">Mining Engineering</option>
                  <option value="Multimedia Arts">Multimedia Arts</option>
                  <option value="Nanotechnology">Nanotechnology</option>
                  <option value="Natural Resource Management">
                    Natural Resource Management
                  </option>
                  <option value="Neuroscience">Neuroscience</option>
                  <option value="Nursing">Nursing</option>
                  <option value="Nutrition and Dietetics">
                    Nutrition and Dietetics
                  </option>
                  <option value="Peace and Conflict Studies">
                    Peace and Conflict Studies
                  </option>
                  <option value="Pharmaceutical Sciences">
                    Pharmaceutical Sciences
                  </option>
                  <option value="Pharmacy">Pharmacy</option>
                  <option value="Philosophy">Philosophy</option>
                  <option value="Physics">Physics</option>
                  <option value="Physiotherapy">Physiotherapy</option>
                  <option value="Plant Sciences">Plant Sciences</option>
                  <option value="Political Science">Political Science</option>
                  <option value="Project Management">Project Management</option>
                  <option value="Psychology">Psychology</option>
                  <option value="Public Administration">
                    Public Administration
                  </option>
                  <option value="Public Health">Public Health</option>
                  <option value="Quality Management">Quality Management</option>
                  <option value="Renewable Energy Engineering">
                    Renewable Energy Engineering
                  </option>
                  <option value="Robotics and Artificial Intelligence">
                    Robotics and Artificial Intelligence
                  </option>
                  <option value="Social Sciences">Social Sciences</option>
                  <option value="Software Engineering">
                    Software Engineering
                  </option>
                  <option value="Sociology">Sociology</option>
                  <option value="Soil and Environmental Sciences">
                    Soil and Environmental Sciences
                  </option>
                  <option value="Statistics">Statistics</option>
                  <option value="Supply Chain Management">
                    Supply Chain Management
                  </option>
                  <option value="Telecommunication Engineering">
                    Telecommunication Engineering
                  </option>
                  <option value="Textile Design">Textile Design</option>
                  <option value="Textile Engineering">
                    Textile Engineering
                  </option>
                  <option value="Tourism and Hospitality Management">
                    Tourism and Hospitality Management
                  </option>
                  <option value="Transportation Engineering">
                    Transportation Engineering
                  </option>
                  <option value="Urdu Language and Literature">
                    Urdu Language and Literature
                  </option>
                  <option value="Veterinary Sciences">
                    Veterinary Sciences
                  </option>
                  <option value="Water Resource Engineering">
                    Water Resource Engineering
                  </option>
                  <option value="Zoology">Zoology</option>
                </select>
              </div>

              {/* YEAR OR SESSION SELECTION UI CODE */}
              <div className="w-12 ml-8">
                <label htmlFor="session" className="label line1">
                  Session
                </label>

                <input
                  type="text"
                  placeholder="2k19"
                  className="input  input-bordered w-20"
                  value={educationSessionInformation.third.from}
                  onChange={(e) => {
                    setEducationSessionInformation((prevState) => ({
                      ...prevState,
                      third: {
                        ...prevState.third,
                        from: e.target.value,
                      },
                    }));
                  }}
                />
              </div>

              <div className="ml-14 mt-14">
                <h5 className="line1 font-medium">To</h5>
              </div>

              <div className="w-12 ml-6">
                <label
                  htmlFor="session"
                  className="label line1 text-transparent"
                >
                  ,
                </label>

                <input
                  type="text"
                  placeholder="2k23"
                  className="input  input-bordered w-20"
                  value={educationSessionInformation.third.to}
                  onChange={(e) => {
                    setEducationSessionInformation((prevState) => ({
                      ...prevState,
                      third: {
                        ...prevState.third,
                        to: e.target.value,
                      },
                    }));
                  }}
                />
              </div>
            </div>
          ) : undefined}
          <FiPlusCircle
            onClick={() => {
              setEducationaDetailsPart2(true);
              setValue((previousValue) => {
                if (previousValue <= 2) {
                  return previousValue + 1;
                } else {
                  return previousValue;
                }
              });
            }}
            className="
            hover:text-blue-500 hover:bg-white hover:rounded-md hover:shadow-xl
            text-4xl cursor-pointer  text-gray-600 m-auto block text-center"
          >
            Add More
          </FiPlusCircle>

          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* PROFESSIONAL EXPERIENCE  UI CODE */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          <h3 className="heading3 mt-8 block w-full font-medium">
            <FcAssistant className="inline text-4xl mr-2" /> Professional
            Experience
          </h3>

          <div className="flex mt-4">
            <div className="w-5/12">
              <label className="label line1">Title</label>
              <input
                type="text"
                className="h-10 input input-bordered w-full"
                id="text"
                name="name"
                autoComplete="on"
                placeholder="Lead Backend Developer"
                onChange={(e) => {
                  setProfessionalInformation((prevState) => ({
                    ...prevState,
                    title: [e.target.value], // add many new values to the title array
                  }));
                }}
                value={professionalInformation.title[0]}
              />
            </div>

            <div className="ml-16">
              <label className="label line1">Duration (/Years)</label>
              <input
                type="number"
                className="h-10 input input-bordered w-1/2"
                id="text"
                name="year"
                min={0}
                autoComplete="on"
                placeholder="0.6 / 5 -- In Years"
                onChange={(e) => {
                  setProfessionalInformation((prevState) => ({
                    ...prevState,
                    duration: [e.target.value], // add many new values to the title array
                  }));
                }}
                value={professionalInformation.duration[0]}
              />
            </div>

            <div className="ml-0">
              <label className="label line1">Company Name</label>
              <input
                type="text"
                className="h-10 input input-bordered w-full"
                id="text"
                name="company"
                autoComplete="on"
                placeholder="META"
                onChange={(e) => {
                  setProfessionalInformation((prevState) => ({
                    ...prevState,
                    companyName: [e.target.value], // add many new values to the title array
                  }));
                }}
                value={professionalInformation.companyName[0]}
              />
            </div>
          </div>
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
          {/* PROFESSIONAL EXPERIENCE 2ND   UI CODE */}
          {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}

          {experienceDetails == true ? (
            <div className="flex mt-4">
              <div className="w-5/12">
                <label className="label line1">Title</label>
                <input
                  type="text"
                  className="h-10 input input-bordered w-full"
                  id="text"
                  name="name"
                  autoComplete="on"
                  placeholder="Software Architect"
                />
              </div>

              <div className="ml-16">
                <label className="label line1">Duration (/Years)</label>
                <input
                  type="number"
                  className="h-10 input input-bordered w-1/2"
                  id="text"
                  name="year"
                  min={0}
                  autoComplete="on"
                  placeholder="0.6 / 5 -- In Years"
                />
              </div>

              <div className="ml-0">
                <label className="label line1">Company Name</label>
                <input
                  type="text"
                  className="h-10 input input-bordered w-full"
                  id="text"
                  name="company"
                  autoComplete="on"
                  placeholder="SAMSUNG"
                />
              </div>
            </div>
          ) : undefined}
          <div className="block m-auto text-center mt-12 w-full">
            <FiPlusCircle
              className="
             hover:text-blue-500 hover:bg-white hover:rounded-md hover:shadow-xl
             text-4xl cursor-pointer  text-gray-600 m-auto block text-center"
              onClick={() => setExperienceDetails(true)}
            >
              Add More...
            </FiPlusCircle>
          </div>
        </div>

        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        {/* CONTACT DETAILS UI CODE */}
        {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
        <h3 className="heading3 mt-8 block w-full font-medium">
          <FcAdvertising className="inline text-4xl mr-2" />
          Contact / Social Handles
        </h3>

        <div className="flex w-full ">
          <div className=" w-1/3">
            <label className="label line1">Email Address</label>
            <input
              type="email"
              className="h-10 input input-bordered w-full"
              id="text"
              name="name"
              autoComplete="on"
              placeholder="name@gmail.com"
              onChange={(e) => {
                setContactInformation((old) => ({
                  ...old,
                  emailAddress: e.target.value,
                }));
              }}
              value={personalInformation.emailAddress}
            />
          </div>

          <div className=" w-1/3 ml-16">
            <label className="label line1">Phone / WhatsApp Number</label>
            <input
              type="tel"
              className="h-10 input input-bordered w-full"
              id="text"
              name="phone number"
              autoComplete="on"
              placeholder="+92-340-111-222"
              onChange={(e) => {
                setContactInformation((old) => ({
                  ...old,
                  phoneNo: e.target.value,
                }));
              }}
              value={personalInformation.phoneNo}
            />
          </div>
        </div>

        <div className=" w-1/3 ">
          <label className="label line1">Linkedin Profile</label>
          <input
            type="url"
            className="h-10 input input-bordered w-full"
            id="text"
            name="linkedin profile"
            autoComplete="on"
            placeholder="linkedin.com/Humza-Sajid"
            onChange={(e) => {
              setContactInformation((old) => ({
                ...old,
                linkedinProfile: e.target.value,
              }));
            }}
            value={personalInformation.linkedinProfile}
          />
        </div>

        <div className=" w-1/3 ml-10 ">
          <label className="label line1">GitHub Profile </label>
          <input
            type="url"
            className="h-10 input input-bordered w-full"
            id="text"
            name="linkedin profile"
            autoComplete="on"
            placeholder="github.com/META"
            onChange={(e) => {
              setContactInformation((old) => ({
                ...old,
                gitHubProfile: e.target.value,
              }));
            }}
            value={personalInformation.gitHubProfile}
          />
        </div>

        <div className="mt-4 flex justify-center m-auto p-4 items-center bg-transparent shadow-md cursor-pointer h-1/2 rounded-md">
          <div
            className="border bg-transparent border-gray-400 border-dashed rounded-md p-4 flex flex-col items-center justify-center
            hover:bg-gray-100
          "
          >
            <FcDocument className="text-4xl block" />
            <h3 className="mt-2 line1">Upload Your Resume(Pdf)</h3>
            <input
              type="file"
              name="resume"
              onChange={handleResumeUpload}
              id=""
              alt="select resume  pdf"
              accept="application/pdf"
              style={{
                position: "relative",
                top: "5px",
                background: "white",
                color: "white",
                display: "block",
                margin: "auto",
                width: "6.5em",
                border: "1.5px solid black",
                boxShadow: "2px 2px 2px 1px white",
                borderRadius: "12px",
              }}
            />
          </div>
        </div>
        <div className="flex w-full justify-center mt-12">
          <button
            style={{ textTransform: "capitalize" }}
            className="btn bg-blue-600 border-none w-40 text-lg line1"
            onClick={submit}
          >
            Submit
          </button>
        </div>

        {/* LOADING ANIMATION CODE */}
        <div className="flex justify-center  w-full">
          <div className="block">
            <BeatLoader
              color={"blue"}
              loading={loading}
              cssOverride={CSSProperties}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        </div>
      </div>

      <footer className="bg-gray-700 h-12 flex justify-center items-center">
        <h3 className="text-white line1">Powerd By Smart Hire </h3>
      </footer>
    </div>
  );
}

export default PostedJobApplyForm;
