const { userModel } = require('../../config/userModel');
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const { name, email, password, role,
         } = req.body;
        if (!name || !password || !email) { 
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const userRole = role || "user";
        const user = await userModel.findByQuery({ email: email });
        if (user[0]) {
            return res.status(409).json({ message: 'User already exists' });
        }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await userModel.insert(
              name,
              email,
              hashedPassword,
              userRole,
            );
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        
        }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
    };


module.exports = { register };