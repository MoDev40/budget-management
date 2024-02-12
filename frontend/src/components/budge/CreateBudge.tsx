import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {z} from "zod"
import { Input } from "../ui/input"
import { DatePicker } from "../DatePicker"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoReload } from "react-icons/io5"
import { useDate } from "@/hooks/DateContext"
import axios from "axios"
import { toast } from "sonner"
import { useState } from "react"
import { useAuth } from "@/hooks/AuthUser"

interface ReqBody {
    userId:string;
    amount:number;
    startDate:Date;
}

type ErrorRes = {
    message:string,
    response:{
        data:{
            message:string
        }
    }
}
const createBudge : (data:ReqBody)=>Promise<{meesage:string}> = async(data:ReqBody)=>{
    const res = await axios.post("http://localhost:8000/api/create-budget",data)
    return await res.data
}
const CreateBudge = () => {
    const {user} = useAuth()
    const [isPending,setIsPending] = useState<boolean>(false)
    const {data:dates} = useDate()
    const budgeSchema = z.object({
        userId:z.string(),
        amount:z.string(),
    })
    type Inputs = z.infer<typeof budgeSchema>
    const form = useForm<Inputs>({resolver:zodResolver(budgeSchema),defaultValues:{
        userId:user?.uid
    }})


    const onSubmit : SubmitHandler<Inputs> = async(data)=>{
        setIsPending(true)
        const {amount,userId} =  data
        const reqBody : ReqBody = {amount:Number(amount),userId,startDate:dates?.dateOne as Date}
        await createBudge(reqBody).then((data)=>{
            toast(data.meesage)
        }).catch((error:ErrorRes)=>{
            toast(error.response.data.message)
        }).finally(()=>{
            setIsPending(false)
        })
    }

  return (
    <Popover>
        <PopoverTrigger asChild><Button className="md:w-[50%] md:mx-auto" variant="outline">Create Budget</Button></PopoverTrigger>
        <PopoverContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}  className="flex flex-col space-y-4">
            <FormField
            control={form.control}
            name="userId"
            render={({field})=>(
                <FormItem>
                    <FormLabel>User</FormLabel>
                    <FormControl>
                      <Input placeholder="id" readOnly {...field} type="text" />
                    </FormControl>
                    <FormMessage className="p-0 text-right"/>
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="amount"
            render={({field})=>(
                <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" {...field} type="number" />
                    </FormControl>
                    <FormMessage className="p-0 text-right"/>
                </FormItem>
            )}
            />
            <DatePicker/>
            <Button type="submit">{ isPending ?<IoReload size={20} className="animate-spin"/> :"Submit"}</Button>
            </form>
        </Form>
        </PopoverContent>
    </Popover>
  )
}

export default CreateBudge