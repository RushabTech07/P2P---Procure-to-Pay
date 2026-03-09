const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/dashboard", verifyToken, (req, res) => {
    res.json({
        message: "Protected data accessed",
        user: req.user
    });
});

module.exports = router;