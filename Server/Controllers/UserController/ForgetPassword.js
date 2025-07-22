const express = require("express");
const userModel = require("../../Models/User_Model");
const app = express();
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const forget_password = async (req, res, next) => {

  const sendVerifyEmail = async (token, otp, email) => {
    // Create Brevo transporter
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: "8f6443001@smtp-brevo.com", // Your Brevo login
        pass: process.env.BREVO_SMTP_KEY || "AgL9GctSra5Iszdh" // Your Brevo SMTP key
      }
    });
    
    const htmlCode = `
    <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset</title>
  </head>
  <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px;">
      <h2 style="color: #333; text-align: center;">Password Reset Request</h2>
      <p style="color: #555; line-height: 1.6;">
        You requested a password reset for your Smart Hire account. 
        Use the OTP below or click the verification link:
      </p>
      <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin: 0;">OTP: <strong>${otp}</strong></h3>
      </div>
      <div style="text-align: center; margin: 30px 0;">
        <a href="http://localhost:5173/verify-otp/${token}" 
           style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
          Verify OTP
        </a>
      </div>
      <p style="color: #888; font-size: 12px; text-align: center;">
        This OTP and link will expire in 10 minutes.<br>
        If you didn't request this, please ignore this email.
      </p>
    </div>
  </body>
</html>
    `;

    const textContent = `
Password Reset Request

You requested a password reset for your Smart Hire account.

OTP: ${otp}

Or visit this link: http://localhost:5173/verify-otp/${token}

This OTP and link will expire in 10 minutes.
If you didn't request this, please ignore this email.
    `.trim();
    
    const mailOptions = {
      from: {
        name: 'Smart Hire',
        address: 'surajjangavali80@gmail.com' // Use your Brevo login email as sender
      },
      to: email,
      subject: 'Password Reset Request - Smart Hire',
      text: textContent,
      html: htmlCode
    };

    try {
      console.log('Sending email with options:', JSON.stringify({
        ...mailOptions,
        html: '[HTML content hidden for brevity]'
      }, null, 2));
      
      const info = await transporter.sendMail(mailOptions);
      
      console.log('Brevo email sent successfully');
      console.log('Message ID:', info.messageId);
      console.log('Response:', info.response);
      
      return { 
        success: true, 
        messageId: info.messageId,
        response: info.response
      };
      
    } catch (error) {
      console.error('Brevo error details:', {
        message: error.message,
        code: error.code,
        command: error.command,
        response: error.response,
        responseCode: error.responseCode
      });
      throw error;
    }
  }

  const { email } = req.body;
  
  // Validate the email address
  if (!email) {
    return res.status(400).json({ error: 'Email address is required' });
  }

  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Check if the email address exists in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'Email address not found' });
    }

    // Generate OTP and token
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const token = crypto.randomBytes(32).toString('hex');
    const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
    
    // Save to database first
    user.passwordResetOTP = otp;
    user.passwordResetToken = token;
    user.passwordResetExpires = expiry;
    await user.save();

    console.log(`Attempting to send password reset email to: ${email}`);
    console.log(`Generated OTP: ${otp}`);
    console.log(`Generated Token: ${token}`);

    // Send email and wait for result
    const emailResult = await sendVerifyEmail(token, otp, user.email);
    
    if (emailResult.success) {
      res.status(200).json({ 
        message: 'Password reset request sent to your email',
        success: true,
        debug: {
          email: user.email,
          messageId: emailResult.messageId,
          response: emailResult.response,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      throw new Error('Email sending failed');
    }

  } catch (error) {
    console.error('Error in forget_password:', error);
    
    // Provide more specific error handling
    let errorMessage = 'Error processing password reset request';
    let statusCode = 500;
    
    // Handle specific email errors
    if (error.code === 'EAUTH') {
      errorMessage = 'Email service authentication failed - Invalid API token';
      statusCode = 500;
    } else if (error.code === 'ECONNECTION') {
      errorMessage = 'Failed to connect to email service';
      statusCode = 500;
    } else if (error.responseCode >= 400 && error.responseCode < 500) {
      errorMessage = 'Email sending failed - Invalid request';
      statusCode = 400;
    } else if (error.code === 'EENVELOPE') {
      errorMessage = 'Invalid sender email address format';
      statusCode = 400;
    }
    
    res.status(statusCode).json({ 
      error: errorMessage,
      details: error.message,
      success: false
    });
  }
}

module.exports = forget_password;