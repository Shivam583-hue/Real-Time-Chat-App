import useGetConversations from "../../hooks/useGetConversations"
import Conversation from "./Conversation"

const Conversations = () => {
  const{loading,conversations}:any=useGetConversations()
  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation:any,idx:any)=>(
        <Conversation   key={conversation._id} conversation={conversation} lastIdx = {idx === conversations.length -1}/>
      ))}
      {loading?<span className="loading loading-spinner mx-auto"></span>:null}
    </div>
  )
}

export default Conversations
