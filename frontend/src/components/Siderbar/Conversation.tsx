
const Conversation = () => {
  return (
    <div className="flex gap-2 items-center hover:bg-green-300 rounded p-2 py-1 cursor-pointer">
      <div className="avatar online">
        <div className="w-12 rounded-full">
            <img src="https://i.pinimg.com/236x/05/c0/fd/05c0fd2e693bd6fb2ec4ffb4c2cae078.jpg" alt="user avatar"/>
        </div>
      </div>
      <div className="flex flex-col flex-1">
        <div className="flex gap-3 justify-between">
            <p className="font-bold text-gray-400">Griffth</p>
        </div>
      </div>
    </div>
  )
}

export default Conversation
