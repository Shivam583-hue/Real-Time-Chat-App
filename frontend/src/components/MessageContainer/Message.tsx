
const Message = () => {
  return (
    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full ">
          <img src="https://i.pinimg.com/236x/05/c0/fd/05c0fd2e693bd6fb2ec4ffb4c2cae078.jpg" alt=""/>
        </div>
      </div>
      <div className={"chat-bubble text-white bg-green-600 "}> Hi what's up?</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">1:02</div>
    </div>
  )
}

export default Message
