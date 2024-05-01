import { useDeleteTransMutation } from "@/strore/features/transactionSlice"
import { DeleteCancel, ErrorRes } from "@/types/globalInterface"
import { FC } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { IoReload } from "react-icons/io5"
import { MdDelete } from "react-icons/md"

const DeleteTransaction : FC<DeleteCancel> = ({id,userId}) => {
    const [deleteMutate,{isLoading}] = useDeleteTransMutation()

    const handleDelete : (id:string | undefined,userId:string)=> any = async(id,userId)=>{
        await deleteMutate({id,userId}).unwrap().then((data)=>{
            toast(data.message)
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    } 
  return (
    <Button className="md:rounded-l-none" onClick={()=>handleDelete(id,userId)} variant="destructive">{isLoading ?<IoReload size={15} className="animate-spin"/>:<MdDelete/>}</Button>
    )
}

export default DeleteTransaction