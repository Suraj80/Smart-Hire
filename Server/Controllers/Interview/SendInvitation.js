const express = require("express");
const nodemailer = require('nodemailer');
const app = express();

const sendInvitation = async (req, res) => {
  const { emailDetails, discription, interviewDate, interviewTime, interviewLink, candidateName } = req.body;

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
      <title>Interview Invitation</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f9f9f9; padding: 30px; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">Interview Invitation</h2>
        <div style="color: #555; line-height: 1.6;">
          ${discription}
        </div>
        <div style="background-color: #007bff; color: white; padding: 15px; text-align: center; border-radius: 5px; margin: 20px 0;">
          <h3 style="margin: 0;">Interview Details</h3>
          <p style="margin: 10px 0;">Date: ${interviewDate}</p>
          <p style="margin: 10px 0;">Time: ${interviewTime}</p>
        </div>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${interviewLink}" 
             style="background-color: #28a745; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Join Meeting
          </a>
        </div>
        <p style="color: #888; font-size: 12px; text-align: center;">
          Please make sure to join the meeting on time.<br>
          If you have any questions, please reply to this email.
        </p>
      </div>
    </body>
  </html>
  `;

  const textContent = `
Interview Invitation

${discription}

Interview Details:
Date: ${interviewDate}
Time: ${interviewTime}

Join Meeting Link: ${interviewLink}

Please make sure to join the meeting on time.
If you have any questions, please reply to this email.
  `.trim();

  const mailOptions = {
    from: {
      name: 'Smart Hire',
      address: 'surajjangavali80@gmail.com'
    },
    to: emailDetails.to,
    subject: emailDetails.subject || 'Interview Invitation - Smart Hire',
    text: textContent,
    html: htmlCode
  };

  try {
    console.log('Sending interview invitation email...');
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({
      status: 200,
      message: 'Interview invitation sent successfully',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      status: 500,
      message: 'Failed to send interview invitation',
      error: error.message
    });
  }
};

module.exports = sendInvitation;
