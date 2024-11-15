const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    console.log("Received Token:", token); // Log the token
    if (!token) return res.status(403).json({ message: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


module.exports = verifyToken;
