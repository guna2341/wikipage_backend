

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        console.log(req.role)
        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ message: 'Access denied' });
        }
        next();
    }
};

module.exports = { authorizeRole };