const express = require("express");
const userModel = require("../../Models/User_Model");
const app = express();

const verifyForgetPwd = async (req, res, next) => {
    const { token, otp } = req.body;
    try {
        const user = await userModel.findOne({
            passwordResetToken: token,
            passwordResetOTP: otp,
            passwordResetExpires: { $gt: new Date() }
        });
        if (!user) {
            return res.status(400).json({ error: "Invalid or expired OTP/token" });
        }
        // Mark OTP as verified but keep token valid for password reset
        user.passwordResetOTP = null; // Clear only the OTP after verification
        await user.save();
        res.status(200).json({ id: user._id, token });
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = verifyForgetPwd;
