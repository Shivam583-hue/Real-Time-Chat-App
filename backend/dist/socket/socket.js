"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReceiverSocketId = exports.io = exports.server = exports.app = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.server = http_1.default.createServer(exports.app);
exports.io = new socket_io_1.Server(exports.server, {
    cors: { origin: ["http://localhost:3000"],
        methods: ["GET", "POST"] }
});
const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};
exports.getReceiverSocketId = getReceiverSocketId;
const userSocketMap = {}; // {userId : socketId}
exports.io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
    const userId = socket.handshake.query.userId;
    if (userId != "undefined")
        userSocketMap[userId] = socket.id;
    exports.io.emit("getOnlineUsers", Object.keys(userSocketMap)); //used to send events to all connected clients
    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id);
        if (userId != "undefined")
            delete userSocketMap[userId];
        exports.io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});
