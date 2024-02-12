import { LucideBadgeDollarSign, Wallet } from "lucide-react"
import { Button } from "../ui/button"

const BottomBar = () => {
  const date = new Date()
  return (
    <div className="w-full md:px-4 mt-5 space-y-10 px-10">
      <div className="flex flex-row  md:px-2 items-center justify-between">
        <div className="flex flex-col  space-y-1">
          <Button className="flex flex-row space-x-3" variant="outline"><LucideBadgeDollarSign/><span>$0.00</span><p className="hidden md:block">Your Budget/Month</p></Button>
          <p className="font-thin text-sm">Ends: {date.toDateString()}</p>
        </div>
        <div className="flex my-2 flex-col space-y-1">
          <Button className="flex flex-row space-x-3" variant="outline"><LucideBadgeDollarSign/><span>$0.00</span><p className="hidden md:block">Your Balance/Month</p></Button>
          <p className="font-thin text-sm">Ends: {date.toDateString()}</p>
        </div>
      </div>
      <div className="flex  flex-col md:flex-row justify-between md:space-y-0 space-y-5 md:space-x-4 h-64 md:h-96">
        <div className="flex flex-col justify-center space-y-8 border border-[#ccc] p-10 rounded w-full">
          <Wallet size={50} className="w-[50%] mx-auto"/>
          <Button className="md:w-[50%] md:mx-auto" variant="outline">Create Budget</Button>
        </div>
        <div className="flex flex-col justify-center bg-black border border-[#ccc] p-10 rounded w-full">
          <ul className="text-white">
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
            <li>Hello</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default BottomBar