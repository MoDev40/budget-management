import {auth} from "@/lib/firebase"
import { useEffect } from "react"
import NavBar from "./NavBar";
const Home = () => {
  useEffect(()=>{
    console.log(auth.currentUser);
  },[])
  return (
    <div>
      <NavBar user={auth.currentUser}/>
    </div>
  )
}

export default Home