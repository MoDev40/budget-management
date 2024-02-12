import {auth} from "@/lib/firebase"
import { Navigate, Outlet } from "react-router-dom"
const PrivateRoute = () => {

  if(!auth.currentUser) return <Navigate to="/login"/>
  
  return (
    <Outlet/>
  )
}

export default PrivateRoute