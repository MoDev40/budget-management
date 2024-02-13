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
import { useDeleteCategoryMutation, useGetCategoryQuery } from "../../../strore/features/categorySlice"
import UpadeteCategory from "./UpadeteCategory"
import { IoReload } from "react-icons/io5"
import { Button } from "../ui/button"
import { MdDelete } from "react-icons/md"
import { toast } from "sonner"
import { ErrorRes } from "../budge/CreateBudge"
    
      
function CategoryTable() {
    const {user} = useAuth()
    const {data,isLoading} = useGetCategoryQuery({id:user?.uid as string})
    const [deleteMutate,{isLoading:deleteLoad}] = useDeleteCategoryMutation()
    useEffect(()=>{
        console.log(data)
    },[data])

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
        <TableHead>Name</TableHead>
        <TableHead colSpan={3}>Price</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        {isLoading || !data? <IoReload  size={30} className="animate-spin text-center"/> : data.categories.map((category) => (
        <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.price ? category.price  : "0.00"}</TableCell>
            <TableCell><UpadeteCategory category={category}/></TableCell>
            <TableCell><Button onClick={()=>handleDelete(category.id,user?.uid as string)} variant="destructive">{deleteLoad ?<IoReload size={15} className="animate-spin"/>:<MdDelete/>}</Button></TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
)
}

export default CategoryTable