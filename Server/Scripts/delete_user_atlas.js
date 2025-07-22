// Script to delete a user by email from a MongoDB Atlas cluster
const mongoose = require('mongoose');

const MONGO_URI = "mongodb+srv://susmitabogur:1234@cluster0.mwydyqt.mongodb.net/SMARTHIRE?retryWrites=true&w=majority&appName=Cluster0";
const emailToDelete = process.argv[2];

if (!emailToDelete) {
  console.error("Please provide the email to delete. Usage: node delete_user_atlas.js user@example.com");
  process.exit(1);
}

const userSchema = new mongoose.Schema({}, { strict: false, collection: 'users' });
const User = mongoose.model('User', userSchema);

async function deleteUser() {
  try {
    await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    const result = await User.deleteOne({ email: emailToDelete });
    if (result.deletedCount === 0) {
      console.log(`No user found with email: ${emailToDelete}`);
    } else {
      console.log(`User with email ${emailToDelete} deleted successfully.`);
    }
  } catch (err) {
    console.error('Error deleting user:', err);
  } finally {
    await mongoose.disconnect();
  }
}

deleteUser();
