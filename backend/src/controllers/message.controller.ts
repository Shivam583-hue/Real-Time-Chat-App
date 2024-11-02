import express,{Request,Response} from "express"
import Conversation from "../models/conversation.model";
import Message from "../models/message.model";

export const sendMessage = (async (req: Request, res: Response) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        if (!message || message.trim() === "") {
            return res.status(400).json({ error: "Message cannot be empty." });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] } 
        });

        if (!conversation) {
            conversation = await Conversation.create({
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

        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json({ message: newMessage, conversationId: conversation._id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}) as express.RequestHandler;


export const getMessages = (async (req: Request, res: Response) => {
    try {
        const { id: userToChatId } = req.params;
        const senderId = req.user._id;
        console.log(req.user)

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] }
        }).populate("messages").exec();
        

        console.log("Found Conversation :", conversation);
        console.log("Messages : ",conversation?.messages)

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
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}) as express.RequestHandler;
