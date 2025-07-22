const express = require("express");
const router = express.Router();
const sendInvitation = require("../Controllers/Interview/SendInvitation");

router.post("/send-invitation", sendInvitation);

module.exports = router;
