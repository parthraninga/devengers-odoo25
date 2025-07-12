const router = require("express").Router();
const chatController = require("../Controller/ChatController");
const authMiddleware = require("../Middleware/AuthMiddleware");

router.use(authMiddleware.validateToken);

// get messages by roomId
router.get("/messages/:roomId", chatController.getMessagesByRoomId);

// save message
router.post("/messages", chatController.saveMessage);

module.exports = router;