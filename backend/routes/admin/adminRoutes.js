const express = require('express');
const router = express.Router();

// imports
const { verifyToken } = require("../../middleware/authMiddleware");
const { authorizeRole } = require("../../middleware/roleMiddleware");
const { regulation } = require("../../controllers/admin/regulation");
const { usersList } = require('../../controllers/admin/usersList');
const { deleteUser } = require('../../controllers/admin/deleteusers');
const { editUsers } = require('../../controllers/admin/editUsers');

// middlewares
router.use(verifyToken, authorizeRole("admin"));

// routes
router.post("/regulation", regulation);
router.get("/users", usersList);
router.put("/editUser", editUsers);
router.delete("/deleteUser", deleteUser);

// home
router.use("/", (req, res) => {
    return res.json("Welcome to admin");
});

module.exports = router;