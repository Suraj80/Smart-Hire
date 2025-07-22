const express = require('express');
const resendVerification = require('../Controllers/UserController/ResendVerification.js');
const GetProfilePicture = require('../Controllers/Dashboard/GetProfilePic.js');
const Home = require('../Controllers/Dashboard/Home.js');
const Dashboard = require('../Controllers/Dashboard/Dashboard.js');
const forget_password = require('../Controllers/UserController/ForgetPassword.js');
const login = require('../Controllers/UserController/Login.js');
const register = require('../Controllers/UserController/Register.js');
const updatePassword = require('../Controllers/UserController/UpdatePassword.js');
const verifyForgetPwd = require('../Controllers/UserController/verifyForgetpwd.js');
const VerifyMail = require('../Controllers/UserController/VerifyMail.js');
const AuthMiddleware = require('../Middleware/AuthMiddleware.js');
const VerifyToken = require('../Middleware/VerifyToken.js');

const UserRouter = express.Router();
UserRouter.post("/resend-verification", resendVerification);



//Login Route
UserRouter.post("/login", login);




// -> Register

UserRouter.post("/register", register)




// -> Forget Password

UserRouter.post("/forget-password", forget_password)




// -> Verify Forget Password

UserRouter.post("/verify-forget-password", verifyForgetPwd)




// -> Update Password

UserRouter.post("/update-password", updatePassword)




// -> Verify Mail

UserRouter.post("/verify-email", VerifyMail)




//-> ## DASHBOARD HOME ROUTES ##

//I left Auth Middleware  intentionally to increase devlopment speed
// Will implement it while deploying it on any hosting platform
UserRouter.post("/home", Home)
UserRouter.post("/dashboard", Dashboard)

// -> Get Profile Picture

UserRouter.post("/getProfilePic", GetProfilePicture)

module.exports = UserRouter;