const userModel = require("../../Models/User_Model");
const crypto = require('crypto');
const sendVerifyEmail = require("./Register.js").sendVerifyEmail;

const resendVerification = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(404).json({ error: "User not found." });
  }
  if (user.isVerified) {
    return res.status(400).json({ error: "User already verified." });
  }
  // Generate new token and expiry
  const emailVerificationToken = crypto.randomBytes(32).toString('hex');
  const emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  user.emailVerificationToken = emailVerificationToken;
  user.emailVerificationExpires = emailVerificationExpires;
  await user.save();
  try {
    await sendVerifyEmail(user.f_name, user.email, emailVerificationToken);
    return res.status(200).json({ message: "Verification email sent." });
  } catch (e) {
    return res.status(500).json({ error: "Failed to send verification email." });
  }
};

module.exports = resendVerification;
