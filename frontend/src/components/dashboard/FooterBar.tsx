import { Copyright } from "lucide-react"
import { Label } from "../ui/label"
import {FaGithub,FaFacebook, FaX} from "react-icons/fa6"
const FooterBar = () => {
  return (
    <div className="bg-[#f6f4f5] p-5 hidden md:flex md:flex-row md:justify-between">
        <div className="flex flex-row space-x-2">
            <FaGithub size={25}/>
            <FaFacebook size={25}/>
            <FaX size={25}/>
        </div>
        <div className="flex flex-row justify-between">
            <Label className="flex flex-row items-center space-x-2 capitalize"><Copyright/><p>2025</p><p>All rigths reserver</p></Label>
        </div>
    </div>
  )
}

export default FooterBar