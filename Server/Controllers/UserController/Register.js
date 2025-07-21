const userModel = require("../../Models/User_Model");
const bcrypt = require("bcrypt");
const express = require("express");
const mailer = require("nodemailer");
const OrganizationModal = require('../../Models/Organization_Model');
const app = express();


// -> Email sending code

const sendVerifyEmail = async (name, email, id) => {
  const htmlCode = `
    <!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Email Confirmation</title>
</head>
<body style="background-color: #e9ecef;">
  <h2>Welcome to Smart Hire, ${name}!</h2>
  <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
  <a href="http://localhost:3000/verify-mail?id=${id}" style="display: inline-block; padding: 16px 36px; font-size: 16px; color: #fff; background: #1a82e2; text-decoration: none; border-radius: 6px;">Verify Now</a>
  <p>If you did not request this, please ignore this email.</p>
  <p><b>Smart Hire</b><br> ATS System</p>
</body>
</html>
  `;
  try {
    const transporter = mailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 587,
      auth: {
        user: 'e0d32ca41c20cccea55ee9027efb93d0', // Mailjet API Key
        pass: '56efbfb2155e99be5ac724c858cc152e', // Mailjet Secret Key
      },
    });
    const mailOptions = {
      from: 'Surajjjangavali80@gmail.com', // Verified sender address
      to: email,
      subject: 'Account Activation [Smart Hire]',
      html: htmlCode,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  } catch (error) {
    console.log("Error -> " + error);
  }
}


const register = async (req, res, next) => {
  // -> Extracting input values
  const { f_name, username, email, company_name, password } = req.body;

  // -> Checking if values are empty
  if (!f_name || !username || !email || !company_name || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  // -> Checking is Email @ is valid or not
  var emailRegex =
    /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
  function isEmailValid(email) {
    if (email.length > 254) return false;

    var valid = emailRegex.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    var parts = email.split("@");
    if (parts[0].length > 64) return false;

    var domainParts = parts[1].split(".");
    if (
      domainParts.some(function (part) {
        return part.length > 63;
      })
    )
      return false;

    return true;
  }
  const EmailValid = isEmailValid(email);
  if (EmailValid == false) {
    return res
      .status(400)
      .json({ error: "Enter email @ in proper format abc@domain.com" });
  }

  // -> Checking is password length is in range or not
  function passwordLengthChecker(password) {
    if (password.length < 8 || password.length > 40) {
      return false;
    }
    return true;
  }
  const passwordCheck = passwordLengthChecker(password);
  if (passwordCheck == false) {
    return res
      .status(400)
      .json({ error: "Password mimumum length should be 8 and max 40" });
  }
  // -> Checking if email OR username is not already token
  const existingUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (existingUser) {
    // console.log('user alreay exists in system');
    return res.status(409).json({ error: "Username or email already taken." });

  }


  // Hashing the password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // -> Saving user data in database
  const user = await new userModel({
    f_name: f_name,
    username: username,
    email: email,
    company_name: company_name,
    password: hashedPassword,
  });
  try {

    await user.save();
    await sendVerifyEmail(f_name, email, user._id)

    // Create a new organization for the user
    const newOrganization = new OrganizationModal({
      username: email,
      organization_name: company_name,
    });
    const savedOrganization = await newOrganization.save();

    // Update the user with the new organization ID
    user.org_id = savedOrganization._id;
    user.org_registered = true;
    await user.save();

  } catch (error) {
    // -> Handling error
    console.log("An error occured:>  " + error);
    return res
      .status(500)
      .json({ error: "An error occurred while saving the user." });
  }
  // -> Returning success message

  return res.status(200).json({ message: "Registered Sucessfully!" });
}

module.exports = register;
