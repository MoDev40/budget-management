import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuth } from "@/hooks/AuthUser"
import { useEffect } from "react"
import { useGetUserTransQuery,useDeleteTransMutation, useCancelTransMutation} from "../../../strore/features/transactionSlice"
import { IoReload } from "react-icons/io5"
import { Button } from "../ui/button"
import { MdCancel, MdDelete } from "react-icons/md"
import { toast } from "sonner"
import { ErrorRes } from "../budge/CreateBudge"
import { Link } from "react-router-dom"
  
    
function TransactionTable() {
  const {user} = useAuth()
  const {data,isLoading} = useGetUserTransQuery({id:user?.uid as string})
  const [deleteMutate,{isLoading:deleteLoad}] = useDeleteTransMutation()
  const [cancelMutate,{isLoading:canceLoad}] = useCancelTransMutation()
  useEffect(()=>{
  },[data])

  const handleDelete : (id:string,userId:string)=> any = async(id:string,userId:string)=>{
      await deleteMutate({id,userId}).unwrap().then((data)=>{
          toast(data.message)
      }).catch((error:ErrorRes)=>{
          toast(error.data.message)
      })
  } 
  const handleCancel : (id:string,userId:string)=> any = async(id:string,userId:string)=>{
      await cancelMutate({id,userId}).unwrap().then((data)=>{
          toast(data.message)
      }).catch((error:ErrorRes)=>{
          toast(error.data.message)
      })
  } 
return (
  <Table>
  <TableCaption>A list of your transaction.</TableCaption>
  <TableHeader>
      <TableRow>
      <TableHead>description</TableHead>
      <TableHead>createdAt</TableHead>
      <TableHead >payedAt</TableHead>
      <TableHead>Price</TableHead>
      </TableRow>
  </TableHeader>
  <TableBody>
      {isLoading || !data? <IoReload  size={30} className="animate-spin text-center"/> : data.transactions.map((transaction) => (
      <TableRow key={transaction.id}>
          <TableCell>{transaction.description ? transaction.description : "No desc" }</TableCell>
          <TableCell>{new Date(transaction.createdAt).toDateString()}</TableCell>
          <TableCell>{new Date(transaction.payedAt).toDateString()}</TableCell>
          <TableCell>{transaction.amount ? transaction.amount  : "0.00"}</TableCell>
          <TableCell><Link className="underline" to={`/dashboard/transaction/${transaction.id}`}>Update</Link></TableCell>
          <TableCell>
            <Button className="md:rounded-r-none" onClick={()=>handleCancel(transaction.id,user?.uid as string)} variant="destructive">{canceLoad ?<IoReload size={15} className="animate-spin"/>:<MdCancel/>}</Button>
            <Button className="md:rounded-l-none" onClick={()=>handleDelete(transaction.id,user?.uid as string)} variant="destructive">{deleteLoad ?<IoReload size={15} className="animate-spin"/>:<MdDelete/>}</Button>
          </TableCell>
      </TableRow>
      ))}
  </TableBody>
  </Table>
)
}

export default TransactionTable