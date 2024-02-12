import { Outlet } from "react-router-dom"
import LeftBar from "./LeftBar"
import TopBar from "./TopBar"
import { useEffect, useState } from "react"
const Dashboard = () => {
  const [togle,setTogle] = useState<boolean>(false)
  useEffect(()=>{
    console.log(togle);
  },[togle])
  return (
    <div className="flex flex-col space-y-10 md:space-y-0 md:flex-row">
      <TopBar togle={togle} setTogle={setTogle}/>
      <LeftBar togle={togle} setTogle={setTogle}/>
      <Outlet/>
    </div>
  )
}

export default Dashboard