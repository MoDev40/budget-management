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
import { useGetUserTransQuery } from "@/strore/features/transactionSlice"
import { IoReload } from "react-icons/io5"
import { Link } from "react-router-dom"
import DeleteTransaction from "./DeleteTransaction"
import CancelTransaction from "./CancelTransaction"
  
    
function TransactionTable() {
  const {user} = useAuth()
  const {data,isLoading} = useGetUserTransQuery(user?.uid as string)
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
            <CancelTransaction id={transaction.id} userId={user?.uid as string}/>
            <DeleteTransaction id={transaction.id} userId={user?.uid as string}/>
          </TableCell>
      </TableRow>
      ))}
  </TableBody>
  </Table>
)
}

export default TransactionTable