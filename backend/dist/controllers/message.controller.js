var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        if (!message || message.trim() === "") {
            return res.status(400).json({ error: "Message cannot be empty." });
        }
        let conversation = yield Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = yield Conversation.create({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        yield Promise.all([conversation.save(), newMessage.save()]);
        //Socket logic 
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            // used to send events to a specific client
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
export const getMessages = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        const conversation = yield Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages").exec();
        if (!conversation) {
            return res.status(404).json({
                error: "Conversation not found",
                messages: [""]
            });
        }
        if (!conversation.messages || conversation.messages.length === 0) {
            return res.status(200).json([""]);
        }
        res.status(200).json(conversation.messages);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}));
