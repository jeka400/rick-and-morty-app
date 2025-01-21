import React, { useState, createContext, useContext } from "react";
import { User } from "firebase/auth";

interface IAuthContextProps {
    children: React.ReactNode;
}

interface IAuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  }
  
const defaultContext: IAuthContextType = {
    user: null,
    setUser: () => {}, 
};

const AuthContext = createContext<IAuthContextType>(defaultContext);

export const AuthProvider: React.FC<IAuthContextProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext);
}
