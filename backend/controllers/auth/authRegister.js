const { loginModel } = require('../../config/loginModel');
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { userName,email, password, role } = req.body;

        if (!userName || !password || !email) { 
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const userRole = role || "user";

        const user = await loginModel.findByQuery({ email: email });
        if (user[0]) {
            return res.status(409).json({ message: 'User already exists' });
        }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await loginModel.insert(userName, email, hashedPassword, userRole);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        
        }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
    };


module.exports = { register };