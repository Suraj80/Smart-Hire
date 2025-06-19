const OrganizationModal = require("../../Models/Organization_Model");
const userModel = require("../../Models/User_Model");

const Home = async (req, res, next) => {
    try {
        // Get user email from the request body (for demo, no auth)
        const { email } = req.body;
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        // Find the user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // If user has organization registered, get organization details
        if (user.org_registered && user.org_id !== '0') {
            const organization = await OrganizationModal.findById(user.org_id);
            if (organization) {
                return res.status(200).json({
                    _id: user._id,
                    f_name: user.f_name,
                    username: user.username,
                    email: user.email,
                    company_name: user.company_name,
                    org_registered: user.org_registered,
                    org_id: user.org_id,
                    organization: organization
                });
            }
        }

        // Return user data without organization if not registered
        return res.status(200).json({
            _id: user._id,
            f_name: user.f_name,
            username: user.username,
            email: user.email,
            company_name: user.company_name,
            org_registered: user.org_registered,
            org_id: user.org_id
        });

    } catch (error) {
        console.error('Error in Home controller:', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = Home;