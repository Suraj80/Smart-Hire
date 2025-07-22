const express = require("express");
const userModel = require("../../Models/User_Model");
const bcrypt = require("bcrypt");

const app = express();

const updatePassword = async (req, res, next) => {
    const { password, token } = req.body;
    if (!password || !token) {
        return res.status(400).json({ error: "Password and token are required." });
    }
    try {
        const user = await userModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: new Date() },
            passwordResetOTP: null  // Ensure OTP was verified
        });
        if (!user) {
            return res.status(400).json({ error: "Token expired or invalid" });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        user.passwordResetToken = null;
        user.passwordResetOTP = null;
        user.passwordResetExpires = null;
        await user.save();
        return res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
        return res.status(500).json({ error: "Server error, something went wrong" });
    }
};

module.exports = updatePassword;
