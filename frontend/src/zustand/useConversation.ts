import { create } from "zustand";

export interface User {
    _id: string;
    fullName: string;
    username: string;
    gender: string;
    profilePic: string;
}

export interface Conversation {
    _id: string;
    fullName: string;
    username: string;
    senderId: string;
    receiverId: string;
    userToChatId: string;
    profilePic:string
}

export interface Message {
    _id: string;
    senderId: string;
    receiverId: string;
    message: string;
    createdAt: string;
    shouldShake?: boolean;
}

export interface ConversationStore {
    selectedConversation: Conversation | null;
    setSelectedConversation: (conversation: Conversation | null) => void;
    messages: Message[]; 
    setMessages: (messages: Message[]) => void;
}

const useConversation = create<ConversationStore>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
}));

export default useConversation;