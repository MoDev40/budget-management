import { auth } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { useContext,createContext, useState,useEffect,  ReactNode} from "react";

type ContextType = {
    user:User | null
}

const AuthContext = createContext<ContextType | undefined>(undefined)

export function AuthProvider ({children}:{children:ReactNode}){
    const [user,setUser] = useState<User|null>(null)
    useEffect(()=>{
        onAuthStateChanged(auth,(currentUser)=>{
            setUser(currentUser)
        })
    },[])

    return (
        <AuthContext.Provider value={{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth (){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("Context must be used within a UserProvider'")
    }
    return context
}