import { useCancelTransMutation } from "@/strore/features/transactionSlice"
import { DeleteCancel, ErrorRes } from "@/types/globalInterface"
import { FC } from "react"
import { IoReload } from "react-icons/io5"
import { MdCancel } from "react-icons/md"
import { toast } from "sonner"
import { Button } from "../ui/button"

const CancelTransaction : FC<DeleteCancel> = ({id,userId}) => {
    const [cancelMutate,{isLoading}] = useCancelTransMutation()

    const handleCancel : (id:string | undefined,userId:string)=> any = async(id,userId)=>{
        await cancelMutate({id,userId}).unwrap().then((data)=>{
            toast(data.message)
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    } 
  return (
    <Button className="md:rounded-r-none" onClick={()=>handleCancel(id,userId)} variant="destructive">{isLoading ?<IoReload size={15} className="animate-spin"/>:<MdCancel/>}</Button>
    )
}

export default CancelTransaction