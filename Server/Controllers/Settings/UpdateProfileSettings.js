const { find } = require("../../Models/Organization_Model");
const OrganizationModal = require("../../Models/Organization_Model");

const UpdateProfileSettings = async (req, res) => {
    console.log("i am running")
    console.log(req.body.org_id)

    const { org_id } = req.body;
    const { inputValue } = req.body;

    // Map frontend fields to backend schema
    const updateFields = {
        organization_name: inputValue.name,
        phoneNo: inputValue.phone_no,
        website: inputValue.website,
        office_address: inputValue.address,
        office_city: inputValue.city,
        office_country: inputValue.country,
        fb_url: inputValue.fb_url,
        linkedIn_url: inputValue.linkedin_url, // note the spelling difference
        yt_url: inputValue.yt_url,
        insta_url: inputValue.insta_url
    };

    try {
        const updatedOrg = await OrganizationModal.findByIdAndUpdate(
            org_id,
            { $set: updateFields },
            { new: true }
        );
        if (updatedOrg) {
            return res.status(200).json({ message: "Organization details updated successfully", organization: updatedOrg });
        } else {
            return res.status(404).json({ message: "Organization not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to update organization details", error: error.message });
    }
}

const AddDepartment = async (req, res) => {
    const { org_id, department } = req.body;
    if (!org_id || !department) {
        return res.status(400).json({ message: "Organization ID and department name are required" });
    }
    try {
        const updatedOrg = await OrganizationModal.findByIdAndUpdate(
            org_id,
            { $addToSet: { departments: department } },
            { new: true }
        );
        if (updatedOrg) {
            return res.status(200).json({ message: "Department added successfully", organization: updatedOrg });
        } else {
            return res.status(404).json({ message: "Organization not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Failed to add department", error: error.message });
    }
};

module.exports = { UpdateProfileSettings, AddDepartment };