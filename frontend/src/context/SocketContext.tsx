import { createContext, useContext, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import { useEffect } from "react";
import { Socket } from "socket.io-client";

const SocketContext = createContext({}); 

export const useSocketContext = () => {
    return useContext(SocketContext);
}

export const SocketContextProvider = ({children }:any) =>{
    const [socket,setSocket] = useState<Socket | null>(null);
    const [onlineUsers,setOnlineUsers] = useState([])
    const {authUser} = useAuthContext();

    useEffect(()=>{
        if(authUser){
            const socket = io("http://localhost:8000",{
                query:{userId:authUser._id}
            });
            setSocket(socket);

            socket.on("getOnlineUsers",(users)=>{
                setOnlineUsers(users);
            })

            return () => {socket.close();}
        }else{
            setSocket(null);
        }
    },[authUser])

    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    )
}