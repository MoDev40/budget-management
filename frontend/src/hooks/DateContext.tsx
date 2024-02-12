import React,{ useContext,createContext, useState,useEffect} from "react";

type Inputs = {
    dateOne:Date,
}

const initialState : Inputs = {
    dateOne:new Date(),
}

interface ContextType {
    data:Inputs | null;
    setData: React.Dispatch<React.SetStateAction<Inputs | null>>
}

const DateContext = createContext<ContextType|undefined>(undefined)


export function DateDataProvider ({children}:{children:React.ReactNode}){
    const [data,setData] = useState<Inputs | null>(initialState)
    useEffect(()=>{
    },[data])
    return(
        <DateContext.Provider value={{data,setData}}>
            {children}
        </DateContext.Provider>
    )
}

export const useDate = ()=>{
    const context = useContext(DateContext)
    if (!context) {
        throw new Error('Context must be used within a UserProvider');
      }
      return context;
} 