module.exports = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) return res.sendStatus(401).send("No token provided");
        next();
    }
}