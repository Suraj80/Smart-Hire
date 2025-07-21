const axios = require('axios');

async function testEndpoints() {
    const baseURL = 'http://localhost:8080';
    
    try {
        // Test login
        console.log('Testing login...');
        const loginResponse = await axios.post(`${baseURL}/login`, {
            email: 'testuser@example.com',
            password: 'TestPassword123'
        });
        
        console.log('Login successful!');
        const token = loginResponse.data.token;
        
        // Test home endpoint
        console.log('Testing home endpoint...');
        const homeResponse = await axios.post(`${baseURL}/home`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        console.log('Home endpoint response:', homeResponse.data);
        
        // Test dashboard endpoint
        console.log('Testing dashboard endpoint...');
        const dashboardResponse = await axios.post(`${baseURL}/dashboard`, {
            organization_id: homeResponse.data.org_id
        });
        
        console.log('Dashboard endpoint response:', dashboardResponse.data);
        
        console.log('All endpoints working correctly!');
        
    } catch (error) {
        console.error('Error testing endpoints:', error.response?.data || error.message);
    }
}

// Test Mailjet SMTP email sending
if (require.main === module) {
  const nodemailer = require('nodemailer');
  const transporter = nodemailer.createTransport({
    host: 'in-v3.mailjet.com',
    port: 587,
    auth: {
      user: 'e0d32ca41c20cccea55ee9027efb93d0', // API Key
      pass: '56efbfb2155e99be5ac724c858cc152e', // Secret Key
    },
  });
  const mailOptions = {
    from: 'Surajjjangavali80@gmail.com',
    to: 'Surajjjangavali80@gmail.com', // Change to your test recipient if needed
    subject: 'Mailjet SMTP Test Email',
    text: 'This is a test email sent using Mailjet SMTP and nodemailer.',
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Test email failed:', error);
    } else {
      console.log('Test email sent:', info.response);
    }
    process.exit(0);
  });
}

testEndpoints(); 