const connection = require('../../Config/Database');
const userModel = require('../../Models/User_Model');
const bcrypt = require('bcrypt');

async function createTestUser() {
    await connection();
    const testUsers = [
        {
            f_name: 'Test',
            username: 'testuser',
            email: 'testuser@example.com',
            company_name: 'TestCompany',
            password: await bcrypt.hash('TestPassword123', 10),
            isVerified: true
        },
        {
            f_name: 'Test2',
            username: 'testuser2',
            email: 'testuser2@example.com',
            company_name: 'TestCompany2',
            password: await bcrypt.hash('TestPassword456', 10),
            isVerified: true
        }
    ];
    for (const testUser of testUsers) {
        const exists = await userModel.findOne({ email: testUser.email });
        if (exists) {
            console.log(`Test user with email ${testUser.email} already exists.`);
        } else {
            await userModel.create(testUser);
            console.log(`Test user with email ${testUser.email} created successfully!`);
        }
    }
    process.exit(0);
}

createTestUser().catch(e => {
    console.error('Error creating test user:', e);
    process.exit(1);
}); 