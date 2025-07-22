const userModel = require("../../Models/User_Model");

const VerifyMail = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).json({ error: "Token is required!" });
    }
    const user = await userModel.findOne({ emailVerificationToken: token, emailVerificationExpires: { $gt: new Date() } });
    if (!user) {
        return res.status(400).json({ error: "Invalid or expired verification token." });
    }
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    return res.status(200).json({ message: "Email verified successfully." });
};

module.exports = VerifyMail;
