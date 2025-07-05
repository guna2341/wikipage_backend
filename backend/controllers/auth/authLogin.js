const { loginModel } = require('../../config/loginModel');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs");

const login = async (req, res) => { 
    const { email, password } = req.body;
    
    const user = await loginModel.findByQuery({email});
    if (!user[0]) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);
    
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({
        id: user[0].userName,
        role: user[0].role
    },
        process.env.JWT_SECRET,
        {
        expiresIn: '1h'
    }
    )
    return res.status(200).json({ token });
};

module.exports = { login };