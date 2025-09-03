const express = require("express");
const router = express.Router();
const { register } = require('../../controllers/auth/authRegister');
const { login } = require('../../controllers/auth/authLogin');

router.post("/register", register);
router.post("/login", login);

module.exports = router;