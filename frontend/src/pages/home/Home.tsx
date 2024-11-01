import {motion} from "framer-motion"
import Sidebar from "../../components/Siderbar/Sidebar"
import MessageContainer from "../../components/MessageContainer/MessageContainer"
const Home = () => {
  return (
    <motion.div initial={{ opacity: 1, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }} className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </motion.div>
  )
}

export default Home
