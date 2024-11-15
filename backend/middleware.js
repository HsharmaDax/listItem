require ('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET  = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({ error: "user not logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (error, payload) => {
        if (error) {
            return res.status(401).json({ error: error.message });
        }
        req.user = {
            id: payload.id,
            email: payload.email,
        };
        next();
    })
}