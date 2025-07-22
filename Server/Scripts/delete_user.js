const mongoose = require('mongoose');
const userModel = require('../Models/User_Model');

async function deleteUser() {
  await mongoose.connect('mongodb://localhost:27017/yourdbname'); // Change to your DB name
  const result = await userModel.deleteOne({ email: 'surajjangavali80@gmail.com' });
  console.log('Delete result:', result);
  await mongoose.disconnect();
}

deleteUser();
