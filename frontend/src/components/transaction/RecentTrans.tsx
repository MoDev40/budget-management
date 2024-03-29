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
import { IoReload } from "react-icons/io5"
import { useRecentTransQuery } from "../../../strore/features/transactionSlice"

const RecentTrans = () => {
  const {user} = useAuth()
  const {data,isLoading} = useRecentTransQuery({id:user?.uid as string})
  return (
    <Table>
    <TableCaption>A list of your transaction.</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead>description</TableHead>
        <TableHead>createdAt</TableHead>
        <TableHead>payedAt</TableHead>
        <TableHead>Price</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {isLoading || !data? <IoReload  size={25} className="animate-spin text-center"/> : data.transactions.map((transaction) => (
        <TableRow key={transaction.id}>
            <TableCell>{transaction.description ? transaction.description : "No desc" }</TableCell>
            <TableCell>{new Date(transaction.createdAt).toDateString()}</TableCell>
            <TableCell>{new Date(transaction.payedAt).toDateString()}</TableCell>
            <TableCell>{transaction.amount ? transaction.amount  : "0.00"}</TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
  )
}

export default RecentTrans