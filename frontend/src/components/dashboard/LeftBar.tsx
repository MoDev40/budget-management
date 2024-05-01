import { Settings } from "lucide-react";
import { FaHouse, FaMoneyBillTransfer, FaMoneyBills } from "react-icons/fa6";
import { GrDocumentConfig } from "react-icons/gr";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
import { Props } from "./TopBar";
const LeftBar : React.FC<Props>= ({togle,setTogle}) => {
    function handleClose () : void {
      if(togle){
        setTogle(!togle)
      }
    }
  return (
    <div className={togle ? "h-screen block p-5  bg-black" : "md:block hidden p-5  h-screen   bg-black"}>
      <ul className="text-white space-y-8 p-4">
        <li>
          <Link className="flex flex-row items-center space-x-3" onClick={handleClose} to={"/"}>
            <FaHouse size={25}/>
            <Label>Home</Label>
          </Link>
        </li>
        <li>
          <Link className="flex flex-row items-center space-x-3" onClick={handleClose} to={"/dashboard/configure"}>
            <GrDocumentConfig size={25}/>
            <Label>Configure</Label>
          </Link>
        </li>
        <li>
          <Link className="flex flex-row items-center space-x-3" onClick={handleClose} to={"/dashboard/category"}>
            <FaMoneyBills size={25}/>
            <Label>Fee Types</Label>
          </Link>
        </li>
        <li>
          <Link className="flex flex-row items-center space-x-3" onClick={handleClose} to={"/dashboard/history"}>
            <FaMoneyBillTransfer size={25}/>
            <Label>History</Label>
          </Link>
        </li>
        <li>
          {/* <Link className="flex flex-row items-center space-x-3" onClick={handleClose} to={""}>
            <FaUserGroup size={25}/>
            <Label>Users</Label>
          </Link> */}
        </li>
        <li>
          <Link className="flex flex-row items-center space-x-3" onClick={handleClose} to={"/dashboard/profile"}>
            <Settings size={25}/>
            <Label>Setting</Label>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default LeftBar
