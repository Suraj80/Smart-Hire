const mongoose = require("mongoose")
const connection = async () => {
    try {
        const mongoUrl = process.env.MONGOURL || 'mongodb://localhost:27017/smartcruiter';
        const connect = await mongoose.connect(mongoUrl);
        console.log("Database connected");
    }

    catch (e) {
        console.log("DB Error: " + e);
    }
}

module.exports = connection;