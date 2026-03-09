const express = require("express");
const router = express.Router();
const procurementController = require("../controllers/procurementController");
const { verifyToken } = require("../middleware/authMiddleware");

router.post("/create", verifyToken, procurementController.createProcurement);
router.get("/my-requests", verifyToken, procurementController.getMyProcurements);

module.exports = router;