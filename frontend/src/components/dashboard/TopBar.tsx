import { LucideOctagon, Menu } from "lucide-react"

export interface Props {
  togle:boolean;
  setTogle:(togle:boolean)=> void
}
const TopBar : React.FC<Props>= ({togle,setTogle}) => {
  return (
    <div className="bg-[#f6f4f5] md:hidden p-2 flex flex-row justify-between">
        <LucideOctagon size={25}/>
        <Menu size={25} onClick={()=>{setTogle(!togle)}}/>
    </div>

  )
}

export default TopBar