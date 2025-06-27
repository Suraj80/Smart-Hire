import React, { useEffect, useState } from "react";
import Profile_Office2 from "../../../Components/ProfileSetup/Profile_Office2";
import axios from "axios";

export default function Profile_Office() {
  const [orgDetails, setOrgDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user has an organization registered
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      setLoading(false);
      return;
    }
    axios
      .post("http://localhost:8080/home", { email: localStorage.getItem("email") })
      .then((response) => {
        if (response.data.org_registered && response.data.organization) {
          setOrgDetails(response.data.organization);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (orgDetails) {
    // Show organization details if already registered
    return (
      <div className="bg-background w-full h-screen">
        <h2 className="heading2 text-center pt-10">Organization Details</h2>
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8 mt-8">
          <h3 className="text-xl font-bold mb-4">{orgDetails.organization_name}</h3>
          <p><b>Phone:</b> {orgDetails.phoneNo}</p>
          <p><b>Website:</b> {orgDetails.website}</p>
          <p><b>Address:</b> {orgDetails.office_address}</p>
          <p><b>City:</b> {orgDetails.office_city}</p>
          <p><b>Country:</b> {orgDetails.office_country}</p>
          <p><b>Departments:</b> {orgDetails.departments?.join(", ")}</p>
          <p><b>Facebook:</b> {orgDetails.fb_url}</p>
          <p><b>LinkedIn:</b> {orgDetails.linkedIn_url}</p>
          <p><b>Instagram:</b> {orgDetails.insta_url}</p>
          <p><b>YouTube:</b> {orgDetails.yt_url}</p>
          <div className="mt-4">
            <b>Team Members:</b>
            <ul className="list-disc ml-6">
              {orgDetails.team_members?.map((member, idx) => (
                <li key={idx}>{member.name} ({member.role}) - {member.email}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  // If not registered, show the setup form
  return (
    <div>
      <div className="bg-background w-full h-screen">
        <h2 className="heading2 text-center pt-10">Profile Creation</h2>
        <Profile_Office2 />
      </div>
    </div>
  );
}
