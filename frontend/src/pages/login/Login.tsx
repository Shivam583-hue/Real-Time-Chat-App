import { motion } from "framer-motion";
import {  LockIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";


const Login = () => {
  return (
    <motion.div initial={{ opacity: 1, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }} className="flex flex-col items-center justify-center min-w-96 mx-auto">
        <div className="w-full p-6 shadow-md  bg-gray-400 rounded-xl bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-20 ">
            <h1 className='text-3xl font-semibold text-center text-gray-300'>
                Login
                <span className='text-green-600'> ChatterApp</span>
            </h1>
            <form>
                <div>
                    <div className="relative my-6">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <UserIcon/>
                        </div>
                        <input 
                            type="text"
                            placeholder="Username"
                            className="w-full pl-10 pr-3 py-2 bg-[#1b1d36] bg-opacity-50 rounded-lg border border-gray-700 focus:border-[#2cf69e] focus:ring-2 focus:ring-[#2cf69e] text-[#2cf69e] placeholder-gray-400 transition duration-200 font-extrabold font-mono"
                        />
                    </div>
                    <div className="relative mt-6 mb-4">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <LockIcon/>
                        </div>
                        <input 
                            type="password"
                            placeholder="Password"
                            className="w-full pl-10 pr-3 py-2 bg-[#1b1d36] bg-opacity-50 rounded-lg border border-gray-700 focus:border-[#2cf69e] focus:ring-2 focus:ring-[#2cf69e] text-[#2cf69e] placeholder-gray-400 transition duration-200 font-extrabold font-mono"
                        />
                    </div>
                </div>
                <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-1 w-full py-3 px-4 text-[#1b1d36] rounded-lg bg-green-600 hover:bg-green-700 font-bold font-mono text-xl"
                >
                    Log In
                </motion.button>
                <a className='text-sm  hover:underline cursor-pointer hover:text-green-600 mt-2 inline-block'>
						{"Don't"} have an account?
				</a>
            </form>
        </div>
    </motion.div>
  )
}

export default Login
