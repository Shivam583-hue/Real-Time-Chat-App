import { createContext, useContext, useState, ReactNode } from "react";

interface AuthUser {
  _id: string;
  username: string;
  fullName: string;
  profilePic: string;
  gender: string;
}

interface AuthContextType {
  authUser: AuthUser | null;
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser | null>>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthContextProvider");
  }
  return context;
};

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => {
    try {
      return JSON.parse(localStorage.getItem("chat-user") || "null");
    } catch {
      return null; 
    }
  });

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
