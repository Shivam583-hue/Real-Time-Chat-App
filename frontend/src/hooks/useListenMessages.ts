import { Socket } from 'socket.io-client';
import { useSocketContext } from '../context/SocketContext';
import useConversation from '../zustand/useConversation';
import { useEffect } from 'react';

const useListenMessages = () => {
    const {socket} = useSocketContext() as {socket:Socket};
    const {messages,setMessages} = useConversation();

    useEffect(() => {
        socket?.on("newMessage", (newMessage) => {
            setMessages([...messages, newMessage]);
        });
        
        const cleanup = () => {
            socket?.off("newMessage");
        };
        
        return cleanup;
    }, [socket, setMessages, messages]);
}

export default useListenMessages
