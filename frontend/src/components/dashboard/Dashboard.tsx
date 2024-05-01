import { Navigate, Outlet } from "react-router-dom"
import LeftBar from "./LeftBar"
import TopBar from "./TopBar"
import { useState } from "react"
import { useAuth } from "@/hooks/AuthUser"
const Dashboard = () => {
  const {user} = useAuth()
  const [toggle,setToggle] = useState<boolean>(false)
  if(!user?.uid) return <Navigate to="/login"/>
  return (
    <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row">
      <TopBar toggle={toggle} setToggle={setToggle}/>
      <LeftBar toggle={toggle} setToggle={setToggle}/>
      <Outlet/>
    </div>
  )
}

export default Dashboard