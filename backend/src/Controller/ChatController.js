const ChatModel = require("../Model/ChatModel");
const SocketUtil = require("../Utils/SocketUtil");

const saveMessage = async (req, res) => {
    try {
        const { content, roomId, sender } = req.body;

        if (!content || !roomId) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false,
            });
        }

        // Use the authenticated user's ID from the request
        const userId = req.user._id;
        const userName = req.user.name || "Anonymous";
        
        // Create message with validated user data
        const newMessage = await ChatModel.create({
            content,
            room: roomId,
            sender: {
                userId: userId,
                name: userName
            }
        });

        // Broadcast message to room using SocketUtil
        SocketUtil.emitToRoom(roomId, "receive_message", {
            _id: newMessage._id,
            content,
            roomId,
            sender: newMessage.sender,
            timestamp: newMessage.timestamp
        });

        res.status(201).json({
            message: "Message sent successfully",
            success: true,
            data: newMessage
        });
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({
            message: "Error saving message",
            success: false,
            error: error.message
        });
    }
};

const getMessagesByRoomId = async (req, res) => {
    try {
        const { roomId } = req.params;

        if (!roomId) {
            return res.status(400).json({
                message: "Room ID is required",
                success: false,
            });
        }

        // Get messages for this room, sorted by timestamp
        const messages = await ChatModel.find({ room: roomId }).sort({ timestamp: 1 }).limit(100); // Limit to latest 100 messages

        res.status(200).json({
            message: "Messages fetched successfully",
            success: true,
            data: messages,
        });
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({
            message: "Error fetching messages",
            success: false,
            error: error.message,
        });
    }
};

module.exports = {
    saveMessage,
    getMessagesByRoomId
};
