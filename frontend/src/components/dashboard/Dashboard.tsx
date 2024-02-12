import { Navigate, Outlet } from "react-router-dom"
import LeftBar from "./LeftBar"
import TopBar from "./TopBar"
import { useState } from "react"
import { useAuth } from "@/hooks/AuthUser"
const Dashboard = () => {
  const {user} = useAuth()
  const [togle,setTogle] = useState<boolean>(false)
  if(!user?.uid) return <Navigate to="/login"/>
  return (
    <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row">
      <TopBar togle={togle} setTogle={setTogle}/>
      <LeftBar togle={togle} setTogle={setTogle}/>
      <Outlet/>
    </div>
  )
}

export default Dashboard