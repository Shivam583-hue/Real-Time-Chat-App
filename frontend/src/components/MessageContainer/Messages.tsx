import { useEffect, useRef } from "react";
import useGetMessages from "../../hooks/useGetMessages";
import MessageSkeleton from "../Skeletons/MessageSkeleton";
import Message from "./Message";
import { Message as MessageType } from '../../zustand/useConversation';

const Messages = () => {
  const { messages, loading } = useGetMessages(); // Assuming this is of type Message[]
  const lastMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  console.log('All messages:', messages);

  return (
    <div className='px-4 flex-1 overflow-auto'>
      {!loading &&
        Array.isArray(messages) &&
        messages.map((message: MessageType, index: number) => { // 
          if (!message || typeof message.message !== 'string') {
            console.error('Invalid message object in array:', message);
            return null;
          }
          
          return (
            <div
              key={message._id}
              ref={index === messages.length - 1 ? lastMessageRef : undefined}
            >
              <Message message={message} />
            </div>
          );
        })}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && (!messages || messages.length === 0) && (
        <p className='text-center'>Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
