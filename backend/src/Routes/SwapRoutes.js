const express = require("express");
const router = express.Router();
const SwapController = require("../Controller/SwapController");
const authMiddleware = require("../Middleware/AuthMiddleware");

// Create a new swap request - protected
router.post("/", authMiddleware.validateToken, SwapController.createSwapRequest);

// Get all swaps - protected
router.get("/", authMiddleware.validateToken, SwapController.getAllSwaps);

// Get swap by ID - protected
router.get("/:id", authMiddleware.validateToken, SwapController.getSwapById);

// Update swap status - protected
router.put("/:id/status", authMiddleware.validateToken, SwapController.updateSwapStatus);

// Add rating to swap - protected
router.post("/:id/rate", authMiddleware.validateToken, SwapController.addSwapRating);

// Get user's swap history - protected
router.get("/history/:userId?", authMiddleware.validateToken, SwapController.getUserSwapHistory);

module.exports = router;