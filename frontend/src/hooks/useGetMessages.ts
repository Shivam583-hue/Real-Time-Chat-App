import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
import axios from "axios";

import { Message } from '../zustand/useConversation'; // Import types

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    if (!selectedConversation?._id) return;
    
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get<Message[]>(`/api/messages/${selectedConversation._id}`);
        
        
        setMessages(res.data);
        
      } catch (error: any) {
        toast.error(error.message);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };

    getMessages();
  }, [selectedConversation?._id, setMessages]);

  return { messages, loading };
};

export default useGetMessages;