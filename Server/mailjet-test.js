const Mailjet = require('node-mailjet');
const nodemailer = require('nodemailer');

// Mailjet API test
const mailjet = Mailjet.apiConnect(
  'e0d32ca41c20cccea55ee9027efb93d0', // Your Mailjet API Key
  '56efbfb2155e99be5ac724c858cc152e'  // Your Mailjet Secret Key
);

const request = mailjet
  .post('send', { version: 'v3.1' })
  .request({
    Messages: [
      {
        From: {
          Email: 'Surajjjangavali80@gmail.com',
          Name: 'Smart Hire'
        },
        To: [
          {
            Email: 'Surajjjangavali80@gmail.com', // Change to your recipient
            Name: 'Suraj'
          }
        ],
        Subject: 'Mailjet API Test Email',
        TextPart: 'This is a test email sent using the Mailjet API and your API key.',
        HTMLPart: '<h3>This is a test email sent using the <b>Mailjet API</b> and your API key.</h3>'
      }
    ]
  });

request
  .then((result) => {
    console.log('Mailjet API email sent:', result.body);
    // After Mailjet test, try nodemailer test
    sendNodemailerTest();
  })
  .catch((err) => {
    console.error('Mailjet API error:', err.statusCode, err.message, err);
    // Even if Mailjet fails, try nodemailer test
    sendNodemailerTest();
  });

function sendNodemailerTest() {
  // Replace with your Gmail app password if you want to test Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'Surajjjangavali80@gmail.com',
      pass: 'ifzitgtizvtuzpuj', // Gmail App Password
    },
  });
  const mailOptions = {
    from: 'Surajjjangavali80@gmail.com',
    to: 'Surajjjangavali80@gmail.com',
    subject: 'Nodemailer Gmail SMTP Test Email',
    text: 'This is a test email sent using Gmail SMTP and nodemailer.',
    html: '<h3>This is a test email sent using <b>Gmail SMTP</b> and nodemailer.</h3>'
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Nodemailer Gmail SMTP error:', error);
    } else {
      console.log('Nodemailer Gmail SMTP email sent:', info.response);
    }
  });
} 