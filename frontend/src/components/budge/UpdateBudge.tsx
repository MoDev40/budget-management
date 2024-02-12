import { SubmitHandler, useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import {z} from "zod"
import { Input } from "../ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { IoReload } from "react-icons/io5"
import { toast } from "sonner"
import { useAuth } from "@/hooks/AuthUser"
import { useUpdateBudgetMutation, useGetUserBudgetQuery } from "../../../strore/features/budgetSlice"
import { ErrorRes, SuccRes } from "./CreateBudge"

interface ReqBody {
    userId:string;
    amount:number;
}



const UpdateBudge = () => {
    const {user} = useAuth()
    const {data:budget}= useGetUserBudgetQuery({id:user?.uid as string})
    const [UpdateBudget,{isLoading}] = useUpdateBudgetMutation()
    const budgeSchema = z.object({
        userId:z.string(),
        amount:z.string(),
    })
    type Inputs = z.infer<typeof budgeSchema>
    const form = useForm<Inputs>({resolver:zodResolver(budgeSchema),defaultValues:{
        userId:user?.uid,
        amount:budget?.isBudgetExists?.amount
    }})


    const onSubmit : SubmitHandler<Inputs> = async(data)=>{
        const {amount,userId} =  data
        const reqBody : ReqBody = {amount:Number(amount),userId}
        await UpdateBudget({data:reqBody,id:budget?.isBudgetExists?.id}).unwrap().then((data:SuccRes)=>{
            toast(data.message)
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    }

  return (
    <Popover>
        <PopoverTrigger asChild><Button className="md:w-[50%] md:mx-auto" variant="outline">Edit Budget</Button></PopoverTrigger>
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
            <Button type="submit">{ isLoading ?<IoReload size={20} className="animate-spin"/> :"Submit"}</Button>
            </form>
        </Form>
        </PopoverContent>
    </Popover>
  )
}

export default UpdateBudge