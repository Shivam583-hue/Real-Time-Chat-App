import { Search } from "lucide-react";
import { useState } from "react";
import useConversation from "../../zustand/useConversation";
import useGetConversations from "../../hooks/useGetConversations";
import toast from "react-hot-toast";



const SearchInput = () => {
	const [search,setSearch] = useState("")
	const {setSelectedConversation}= useConversation()
	const{conversations} = useGetConversations()
	const handleSubmit = async(e:any) => {
		e.preventDefault()
		if(!search) return;
		if(search.length < 3){
			return toast.error("Search query must be more than 3 chara")
		}
		const conversation = conversations.find((c:any) => c.fullName.toLowerCase().includes(search.toLowerCase()))
		if(conversation){
			setSelectedConversation(conversation)
			setSearch('');
		}else{toast.error("No user found")}
	}
    return (
 		<form onSubmit={handleSubmit} className='flex items-center gap-2'>
 			<input type='text'  value={search} onChange={(e:any) => setSearch(e.target.value)} placeholder='Search…' className='input input-bordered rounded-full' />
 			<button type='submit' className='btn btn-circle bg-green-300 text-white'>
 				<Search className="w-6 h-6 outline-none"/>
 			</button>
 		</form>
 	);
 };
export default SearchInput;