let io;

const initializeSocket = (socketServer) => {
    io = socketServer;
    return io;
};

const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};

const emitToAll = (event, data) => {
    getIO().emit(event, data);
};

const emitToRoom = (room, event, data) => {
    getIO().to(room).emit(event, data);
};

const emitToClient = (socketId, event, data) => {
    getIO().to(socketId).emit(event, data);
};

module.exports = {
    initializeSocket,
    getIO,
    emitToAll,
    emitToRoom,
    emitToClient,
};
