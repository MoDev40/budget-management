import { useDeleteCategoryMutation } from '@/strore/features/categorySlice'
import { DeleteCancel, ErrorRes } from '@/types/globalInterface'
import { IoReload } from 'react-icons/io5'
import { Button } from '../ui/button'
import { MdDelete } from 'react-icons/md'
import { toast } from 'sonner'
import { FC } from 'react'


const DeleteCategory  : FC<DeleteCancel> = ({id,userId}) => {
    const [deleteMutate,{isLoading:deleteLoad}] = useDeleteCategoryMutation()

    const handleDelete : (id:string | undefined,userId:string)=> any = async(id,userId)=>{
        await deleteMutate({id,userId}).unwrap().then((data)=>{
            toast(data.message)
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    } 
  return (
<Button onClick={()=>handleDelete(id,userId)} variant="destructive">
    {deleteLoad ?<IoReload size={15} className="animate-spin"/>:<MdDelete/>}
</Button>  )
}

export default DeleteCategory