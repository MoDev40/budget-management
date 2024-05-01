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
import { useGetCategoryQuery } from "@/strore/features/categorySlice"
import { IoReload } from "react-icons/io5"
import DeleteCategory from "./DeleteCategory"
import UpadeteCategory from "./UpadeteCategory"
    
      
function CategoryTable() {
    const {user} = useAuth()
    const {data,isLoading} = useGetCategoryQuery(user?.uid as string)
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
            <TableCell className="text-right"><DeleteCategory id={category.id} userId={user?.uid as string}/></TableCell>
        </TableRow>
        ))}
    </TableBody>
    </Table>
)
}

export default CategoryTable