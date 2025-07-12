const express = require("express");
const router = express.Router();
const ItemController = require("../Controller/ItemController");
const authMiddleware = require("../Middleware/AuthMiddleware");
const upload = require("../utils/multerConfig");

// Create a new item - protected
router.post(
    "/",
    authMiddleware.validateToken,
    upload.array("images", 5),
    ItemController.createItem
);

// Get all items - public
router.get("/", ItemController.getAllItems);

// Get item by ID - public
router.get("/:id", ItemController.getItemById);

// Update item - protected
router.put(
    "/:id",
    authMiddleware.validateToken,
    upload.array("images", 5),
    ItemController.updateItem
);

// Delete item - protected
router.delete("/:id", authMiddleware.validateToken, ItemController.deleteItem);

// Get user's items - protected
router.get("/user/:userId?", authMiddleware.validateToken, ItemController.getUserItems);

// Toggle like on item - protected
router.post("/:id/toggle-like", authMiddleware.validateToken, ItemController.toggleLike);

module.exports = router;