const express = require('express');
const router = express.Router();

// imports
const { verifyToken } = require("../../middleware/authMiddleware");
const { authorizeRole } = require("../../middleware/roleMiddleware");
const { regulation } = require("../../controllers/admin/regulation");

// middlewares
router.use(verifyToken, authorizeRole("admin"));


router.post("/regulation", regulation);

router.use("/", (req, res) => {
    return res.json("Welcome to admin");
});

module.exports = router;