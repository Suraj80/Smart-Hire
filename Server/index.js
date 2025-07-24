const express = require('express')
require("dotenv").config();
const ngrok = require('ngrok');


// const fileUpload = require('express-fileupload')
var bodyParser = require('body-parser')
const mongoose = require('mongoose');
const cors = require("cors");
const connection = require("./Config/Database.js");
const UserRouter = require("./Routes/UserRoute");
const ProfileRouter = require("./Routes/ProfileCreation");
const JobRouter = require('./Routes/Jobs');
const RecruitmentRouter = require('./Routes/RecruitmentCycle.js');
const ReportRouter = require('./Routes/Report.js');
const RouterReport = require('./Routes/Report.js');
const SettingRouter = require('./Routes/SettingRouter.js');
const InterviewRouter = require('./Routes/Interview.js');

// -----| Configration |-----
const app = express();
// Enable CORS for local frontend and production frontend
app.use(cors({
    origin: [
        'http://localhost:5173',
        'http://localhost:8080',
        'https://smart-cruiter-fyp-production.up.railway.app'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept', 'Authorization']
}));
mongoose.set('strictQuery', false);
app.use(express.urlencoded({ extended: true }))
// app.use(fileUpload())
app.use(express.json());
app.use(bodyParser.json());

connection();



//Routes


app.use('/', UserRouter);
app.use("/profile", ProfileRouter)
app.use("/job", JobRouter)
app.use('/details', RecruitmentRouter)
app.use("/report", RouterReport)
app.use("/settings", SettingRouter);
app.use("/api/interview", InterviewRouter);

// Create a new ngrok tunnel.
//      



//-----| App listening |------
const port = process.env.PORT || 8080;



app.listen(port, () => {
    console.log("server is running on port :" + port)
})

