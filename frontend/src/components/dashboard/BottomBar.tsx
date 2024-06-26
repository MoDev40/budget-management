import { useAuth } from "@/hooks/AuthUser"
import { LucideBadgeDollarSign, Wallet } from "lucide-react"
import { useGetUserBudgetQuery } from "@/strore/features/budgetSlice"
import CreateBudge from "../budge/CreateBudge"
import UpdateBudge from "../budge/UpdateBudge"
import CreateTransaction from "../transaction/CreateTransaction"
import RecentTrans from "../transaction/RecentTrans"
import { Button } from "../ui/button"

const BottomBar = () => {
  const {user} = useAuth()
  const {data:budget,isFetching}= useGetUserBudgetQuery(user?.uid as string)
  
  return (
    <div className="w-full md:px-4 mt-5 space-y-10 px-10">
      <div className="flex flex-row  md:px-2 items-center justify-between">
        <div className="flex flex-col  space-y-1">
          <Button className="flex flex-row space-x-3" variant="outline"><LucideBadgeDollarSign/><span>${isFetching ? "...." : budget&& budget.isBudgetExists.amount}</span><p className="hidden md:block">Your Budget/Month</p></Button>
          <p className="font-thin text-sm">Ends: {budget&& new Date(budget?.isBudgetExists?.endDate).toDateString()}</p>
        </div>
        <div className="flex my-2 flex-col space-y-1">
          <Button className="flex flex-row space-x-3" variant="outline"><LucideBadgeDollarSign/><span>${isFetching ? "...." : budget&& budget.isBudgetExists.balance[0].amount }</span><p className="hidden md:block">Your Balance/Month</p></Button>
          <p className="font-thin text-sm">Ends: {budget&& new Date(budget.isBudgetExists.balance[0]?.toDate).toDateString()}</p>
        </div>
      </div>
      <div className="flex  flex-col md:flex-row justify-between md:space-y-0 space-y-5 md:space-x-4 h-64 md:h-96">
        <div className="flex flex-col justify-center space-y-8 border border-[#ccc] p-10 rounded w-full">
          <Wallet size={50} className="w-[50%] mx-auto"/>
          {
            budget?.isBudgetExists?.amount 
            ?
            <UpdateBudge/>
            :
            <CreateBudge/>
          }
        </div>
        <div className="flex flex-col justify-center border border-[#ccc] p-10 rounded w-full">
          <div className="flex flex-col w-full space-y-2">
          <CreateTransaction/>
          <RecentTrans/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BottomBar
