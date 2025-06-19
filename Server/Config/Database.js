const mongoose = require("mongoose")
const connection = async () => {
    try {
        const mongoUrl = process.env.MONGOURL || 'mongodb+srv://surajjangavali80:1234@cluster0.qhd8c.mongodb.net/HR2?retryWrites=true&w=majority&appName=Cluster0';
        const connect = await mongoose.connect(mongoUrl);
        console.log("Database connected");
    }

    catch (e) {
        console.log("DB Error: " + e);
    }
}

module.exports = connection;