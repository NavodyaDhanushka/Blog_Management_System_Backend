const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const { name, email, password } = req.body;
    const hashed = bcrypt.hashSync(password, 10);

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?, ?)",
        [name, email, password],
        () => res.json({ message: "Successfully registered" }),
    );
};

exports.login = (req, res) => {
    const { email, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if (!result.length) return res.status(401).json( { message: "Incorrect email" });

        const user = result[0];
        if (!bcrypt.compareSync(password, user.password))
            return res.status(401).json({ message: "Incorrect password" });

        const token = jwt.sign({
            id: user.id, role: user.role
        }, process.env.JWT_SECRET);
        res.json({token});
        }
    );
};