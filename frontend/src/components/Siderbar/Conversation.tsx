import { useSocketContext } from "../../context/SocketContext";
import useConversation from "../../zustand/useConversation";

 const Conversation = ({conversation,lastIdx}:any) => {
	const {selectedConversation ,setSelectedConversation}=useConversation()
	const isSelected = selectedConversation?._id === conversation._id;
	const {onlineUsers} = useSocketContext() as { onlineUsers: string[] };
	const isOnline = onlineUsers.includes(conversation.userId);
 	return (
 		<>
 			<div onClick={() => setSelectedConversation(conversation)} className={`flex gap-2 items-center hover:bg-green-700 rounded p-2 py-1 cursor-pointer ${isSelected?"bg-green-500":"" } ` }>
 				<div className={`avatar ${isOnline?"online":""}`}>
 					<div className='w-12 rounded-full'>
 						<img
 							src={conversation.profilePic}
 							alt='user avatar'
 						/>
 					</div>
 				</div>

 				<div className='flex flex-col flex-1'>
 					<div className='flex gap-3 justify-between'>
 						<p className='font-bold text-gray-300'>{conversation.fullName}</p>
 						<span className='text-xl'></span>
 					</div>
 				</div>
 			</div>

 			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
 		</>
 	);
 };
 export default Conversation;
