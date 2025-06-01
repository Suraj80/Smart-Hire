// const jwt = require('jsonwebtoken');
// const secretKey = 'mysecretkey'; // replace with your secret key

// function AuthMiddleware(req, res, next) {
//     var authHeader = req.headers.authorization;
//     if (authHeader && authHeader.startsWith('Bearer ')) {
//         // check if the header starts with "Bearer " prefix
//         const token = authHeader.split(' ')[1]; // split the header and get the token part
//         authHeader = token;
//     }
//     jwt.verify(authHeader, process.env.KEY, (error, data) => {
//         if (error) {
//             return res.status(400).send({ message: "invalid token" })
//         }

//         else {
//             req.body.userID = data.id;
//             next();
//         }
//     })
// }

// module.exports = AuthMiddleware;

const jwt = require('jsonwebtoken');

function AuthMiddleware(req, res, next) {
    // 🔓 Skip auth in development
    if (process.env.NODE_ENV === 'development') {
        console.log("🧪 Development mode: Skipping auth middleware");
        req.body.userID = "test-user-id"; // You can set a dummy user ID
        return next();
    }

    // 🔐 Production auth logic
    let authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.KEY, (error, data) => {
            if (error) {
                return res.status(400).send({ message: "Invalid token" });
            }
            req.body.userID = data.id;
            next();
        });
    } else {
        return res.status(401).send({ message: "Authorization header missing or malformed" });
    }
}

module.exports = AuthMiddleware;
