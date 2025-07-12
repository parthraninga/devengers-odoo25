/*
Example of using module.exports and require in Node.js
    -> use for communicating between files

nodemon => a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
-------
    -> npm install -g nodemon

*/

// ================= Server ==================
const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const cors = require("cors");
const emailWorker = require("./src/Redis/Worker/EmailWorker");
const SocketUtil = require("./src/Utils/SocketUtil");
const ChatModel = require("./src/Model/ChatModel");
const PassportUtil = require("./src/Utils/PassportUtil"); 

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS support
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL, 
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// Initialize SocketUtil with the io instance
SocketUtil.initializeSocket(io);

// for handling authentication
io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        // Allow connection but mark as unauthenticated
        socket.auth = false;
        return next();
    }

    try {
        // Verify token (use your existing JWT verification)
        const jwtUtils = require("./src/Utils/JwtUtil");
        const user = jwtUtils.verifyAccessToken(token);

        // Store user data in socket for future use
        socket.user = user;
        socket.auth = true;
        next();
    } catch (error) {
        // Allow connection but mark as unauthenticated
        socket.auth = false;
        next();
    }
});

// Socket.IO connection event
io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}, Authenticated: ${socket.auth ? "Yes" : "No"}`);

    // handing joining rooms
    socket.on("join_room", (data) => {
        const { roomId, userName } = data;
        socket.join(roomId);
        console.log(`User ${userName} (${socket.id}) joined room: ${roomId}`);

        // Notify everyone in the room about the new user joined
        socket.to(roomId).emit("user_joined", {
            message: `${userName} has joined the room`,
            userName: userName,
            socketId: socket.id,
            timestamp: new Date(),
        });

        // Confirm to the joining user that they've joined successfully
        socket.emit("room_joined", {
            message: `You have joined room: ${roomId}`,
            roomId,
            timestamp: new Date(),
        });
    });

    // handling sending messages
    socket.on("send_message", async (data) => {
        console.log(`Message received: `, data);

        try {
            // Validate user ID - ensure it's a valid MongoDB ObjectId
            let userId = data.sender.userId;

            // If user is authenticated, use their ID from the socket
            if (socket.auth && socket.user && socket.user.userId) {
                userId = socket.user.userId;
            }

            // save message to MongoDB
            const newMessage = await ChatModel.create({
                content: data.content,
                room: data.roomId,
                sender: {
                    userId: userId,
                    name: data.sender.name,
                },
                timestamp: new Date(),
            });

            console.log(`Message saved to MongoDB with ID: ${newMessage._id}`);

            // Include MongoDB _id in the broadcasted message
            const messageToSend = {
                _id: newMessage._id,
                content: data.content,
                roomId: data.roomId,
                sender: newMessage.sender,
                timestamp: newMessage.timestamp,
            };

            // Broadcast to everyone in the room except sender
            socket.to(data.roomId).emit("receive_message", messageToSend);

            // Also send confirmation back to sender with the saved message
            socket.emit("message_saved", messageToSend);
        } catch (error) {
            console.error("Error saving message:", error);
            // Notify sender of error
            socket.emit("message_error", {
                error: "Failed to save message",
                originalMessage: data,
            });
        }
    });

    // handling disconnection
    socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
    });
});

app.use(cors());
app.use(express.json());
app.use(PassportUtil.initialize()); 

const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const PORT = 3001;

// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });

// Important: Change app.listen to server.listen
// app.listen(PORT, () => {...});

// Use this instead:
server.listen(PORT, () => {
    console.log(`Server with Socket.io is running on port ${PORT}`);
});

// ==================== MVC ====================

const userRoutes = require("./src/Routes/UserRoutes");
const roleRoutes = require("./src/Routes/RoleRoutes");
const authRoutes = require("./src/Routes/AuthRoutes");
const uploadRoutes = require("./src/Routes/UploadRoutes");
const chatRoutes = require("./src/Routes/ChatRoutes");
const passport = require("./src/Utils/PassportUtil");
const itemRoutes = require("./src/Routes/ItemRoutes");
const swapRoutes = require("./src/Routes/SwapRoutes");

app.use("/auth", authRoutes); // use before other routes
app.use("/users", userRoutes);
app.use("/role", roleRoutes);
app.use("/upload", uploadRoutes); // for file upload
app.use("/chat", chatRoutes); // for Socket.IO chat functionality
app.use("/items", itemRoutes); // for item-related operations
app.use("/swaps", swapRoutes); // for swap-related operations

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("MongoDB connected...");
    })
    .catch((err) => {
        console.log("MongoDB connection error: ", err);
    });

console.log(`EmailWorker initialized and ready to process jobs`);
