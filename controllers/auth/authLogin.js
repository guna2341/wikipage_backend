const { userModel } = require('../../config/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const login = async (req, res) => { 
    try {
        const { email, password } = req.body;
    
        const user = await userModel.findByQuery({ email });
        if (!user[0]) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user[0].password);
    
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({
            id: user[0].id,
            role: user[0].role
        },
            process.env.JWT_SECRET,
            {
                expiresIn: '1h'
            }
        );
        const resUser = {
            id:user[0].id,
            name: user[0].name,
            role: user[0].role,
        };
        return res.status(200).json({ token, user:resUser });
    }
    catch (err) {
        return res.status(500).json({ message: "Something went wrong", err: err.message });
    }
    };

module.exports = { login };