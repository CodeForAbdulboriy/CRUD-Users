const jwt = require("jsonwebtoken");
require("dotenv/config");

module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Токен отсутствует."
            });
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(
            token,
            process.env.JWT_KEY
        );

        req.user = decoded;

        next();
    }
    catch(error) {
        return res.status(500).json({
            message: error
        });
    }
}