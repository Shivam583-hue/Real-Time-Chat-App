import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

interface SignUpParams {
  fullName: string;
  username: string;
  profilePic: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignUp = () => {
  const [loading, setLoading] = useState(false);
  const {setAuthUser} = useAuthContext()

  const signup = async ({ fullName, username, profilePic, password, confirmPassword, gender }: SignUpParams) => {
    const success = handleInputErrors({ fullName, username, profilePic, confirmPassword, password, gender });
    if (!success) return;

    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", { fullName, username, profilePic, password,confirmPassword, gender });
      console.log(response.data);

      if(response.data.error) {throw new Error(response.data.error)}
      
      localStorage.setItem("chat-user",response.data)

      setAuthUser(response.data)
      
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Signup failed");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignUp;

function handleInputErrors({ fullName, username, profilePic, confirmPassword, password, gender }: SignUpParams) {
  if (!fullName || !username || !profilePic || !confirmPassword || !password || !gender) {
    toast.error("Please fill in all the fields");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Entered passwords don't match");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }

  return true;
}
