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
import { ErrorRes } from "@/types/interfaces"
import { IoReload } from "react-icons/io5"
import { MdDelete } from "react-icons/md"
import { toast } from "sonner"
import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../../strore/features/categorySlice"
import { Button } from "../ui/button"
import UpadeteCategory from "./UpadeteCategory"
    
      
function CategoryTable() {
    const {user} = useAuth()
    const {data,isLoading} = useGetCategoryQuery(user?.uid as string)
    const [deleteMutate,{isLoading:deleteLoad}] = useDeleteCategoryMutation()

    const handleDelete : (id:string,userId:string)=> any = async(id:string,userId:string)=>{
        await deleteMutate({id,userId}).unwrap().then((data)=>{
            toast(data.message)
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    } 
return (
    <Table>
    <TableCaption>A list of your fee categoies.</TableCaption>
    <TableHeader>
        <TableRow>
        <TableHead colSpan={5}>Name</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {isLoading || !data? <IoReload  size={30} className="animate-spin text-center"/> : data.categories.map((category) => (
        <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell className="text-right"><UpadeteCategory category={category}/></TableCell>
            <TableCell className="text-right"><Button onClick={()=>handleDelete(category.id,user?.uid as string)} variant="destructive">{deleteLoad ?<IoReload size={15} className="animate-spin"/>:<MdDelete/>}</Button></TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
)
}

export default CategoryTable