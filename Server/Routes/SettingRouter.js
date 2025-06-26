const express = require("express");
const UpdateProfilePicture = require("../Controllers/Settings/UpdateProfilePicture");
const multer = require('multer');
const { UpdateProfileSettings, AddDepartment } = require("../Controllers/Settings/UpdateProfileSettings");




const SettingRouter = express.Router();

// Set up Multer middleware
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });



SettingRouter.post("/updateProfile", upload.single('file'), UpdateProfilePicture)
SettingRouter.post("/updateProfileData", upload.single('file'), UpdateProfileSettings)
SettingRouter.post("/addDepartment", AddDepartment)

module.exports = SettingRouter;