

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    }
};

module.exports = { authorizeRole };