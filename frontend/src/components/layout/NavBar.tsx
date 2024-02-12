import { Link } from "react-router-dom"
import { Button } from "../ui/button"

type Props = {
    user : any
} 

const NavBar : React.FC<Props>= ({user}) => {
  return (
    <div className="flex  flex-row justify-between md:max-w-[1120px] mx-auto p-4 items-center">
        <div className="font-black text-2xl">
            <Link to="/"><Button variant="outline">ExpenseExp</Button></Link>
        </div>
        <ul className="flex flex-row space-x-5 items-center capitalize text-[1.2rem] font-normal">
        {!user ? 
            <>
            <li><Link to="/signup"><Button variant="secondary">SignUp</Button></Link></li>
            <li><Link to="/login"><Button variant="secondary">Login</Button></Link></li>
            </>
            :
            <li><Link to="/dashboard"><Button variant="secondary">Dashboard</Button></Link></li>
        }
        </ul>
    </div>
  )
}

export default NavBar