import React,{ useContext,createContext, useState,useEffect} from "react";

type Inputs = {
    payetAt:Date,
    categoryId:string
}

const initialState : Inputs = {
    payetAt:new Date(),
    categoryId:""
}

interface ContextType {
    data:Inputs | null;
    setData: React.Dispatch<React.SetStateAction<Inputs | null>>
}

const TransContext = createContext<ContextType|undefined>(undefined)


export function TransDataProvider ({children}:{children:React.ReactNode}){
    const [data,setData] = useState<Inputs | null>(initialState)
    useEffect(()=>{
    },[data])
    return(
        <TransContext.Provider value={{data,setData}}>
            {children}
        </TransContext.Provider>
    )
}

export const useTranData = ()=>{
    const context = useContext(TransContext)
    if (!context) {
        throw new Error('Context must be used within a UserProvider');
      }
      return context;
} 