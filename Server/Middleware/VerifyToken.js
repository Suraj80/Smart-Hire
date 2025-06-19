const userModel = require("../Models/User_Model");

const VerifyToken = async (req, res, next) => {
    try {
        const findUser = await userModel.findById({ _id: req.user.id });
        if (findUser) {
            req.user = findUser; // Attach user to request object
            next(); // Continue to next middleware/controller
        } else {
            return res.status(401).json({ message: "Invalid token" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = VerifyToken;