import { Link, useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import {LuLogOut} from "react-icons/lu"
import { auth } from "@/lib/firebase"
import { useState } from "react"
import {IoReload} from "react-icons/io5"
import { useAuth } from "@/hooks/AuthUser"

const NavBar = () => {
  const {user} = useAuth()
  const navigate = useNavigate()
  const [isPending,setIsPending] = useState<boolean>(false)
  const handleLogout : ()=> void = async()=>{
    setIsPending(true)
    await auth.signOut().then(()=>{
      navigate("/login")
    }).finally(()=>{
      setIsPending(false)
    })
  }
  return (
    <div className="flex  flex-row justify-between md:max-w-[1120px] mx-auto p-4 items-center">
        <div className="font-black text-2xl">
            <Link to="/"><Button variant="outline">ExpenseExp</Button></Link>
        </div>
        <ul className="flex flex-row space-x-5 items-center capitalize text-[1.2rem] font-normal">
        {!user ? 
            <>
            <Link to="/signup"><Button variant="secondary">SignUp</Button></Link>
            <Link to="/login"><Button variant="secondary">Login</Button></Link>
            </>
            :
            <>
            <Link to="/dashboard"><Button variant="secondary">Dashboard</Button></Link>
            <Button variant="destructive" onClick={handleLogout}>{ isPending ?<IoReload className="animate-spin"/> :<LuLogOut size={25}/>}</Button>
            </>
          
        }
        </ul>
    </div>
  )
}

export default NavBar