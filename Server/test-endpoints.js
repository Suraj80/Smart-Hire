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

testEndpoints(); 