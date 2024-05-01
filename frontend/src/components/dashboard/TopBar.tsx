import { LucideOctagon, Menu } from "lucide-react"

export interface Props {
  toggle:boolean;
  setToggle:(toggle:boolean)=> void
}
const TopBar : React.FC<Props>= ({toggle: toggle,setToggle: setToggle}) => {
  return (
    <div className="bg-[#f6f4f5] md:hidden p-2 flex flex-row justify-between">
        <LucideOctagon size={25}/>
        <Menu size={25} onClick={()=>{setToggle(!toggle)}}/>
    </div>

  )
}

export default TopBar