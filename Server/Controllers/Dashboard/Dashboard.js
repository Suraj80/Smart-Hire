const OrganizationModal = require("../../Models/Organization_Model");

const Dashboard = async (req, res, next) => {
    try {
        const { organization_id } = req.body;
        
        if (!organization_id) {
            return res.status(400).json({ message: "Organization ID is required" });
        }

        const organization = await OrganizationModal.findById(organization_id);
        
        if (organization) {
            return res.status(200).json({ organizaion: organization });
        } else {
            return res.status(404).json({ message: "No organization found, enter valid organization" });
        }

    } catch (error) {
        console.error('Error in Dashboard controller:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = Dashboard; 