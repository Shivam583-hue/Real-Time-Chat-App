import { LogOut } from "lucide-react"
import useLogout from "../../hooks/useLogout"

const LogoutButton = () => {
  const{loading,logout} = useLogout()
  return (
    <div className="mt-auto pl-2 cursor-pointer">
      <LogOut onClick={logout}/>
    </div>
  )
}

export default LogoutButton
