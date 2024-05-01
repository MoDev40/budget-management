import { useAuth } from "@/hooks/AuthUser"
import { useCreateBudgetMutation } from "@/strore/features/budgetSlice"
import { BudgeInputs, Inputs, budgeSchema } from "@/types/budgeInterface"
import { ErrorRes, SuccessResponse } from "@/types/globalInterface"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { IoReload } from "react-icons/io5"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"


const CreateBudge = () => {
    const [createBudge,{isLoading}] = useCreateBudgetMutation()
    const {user} = useAuth()

    const form = useForm<Inputs>({resolver:zodResolver(budgeSchema),defaultValues:{
        userId:user?.uid
    }})


    const onSubmit : SubmitHandler<Inputs> = async(data)=>{
        const {amount,userId} =  data
        const reqBody : BudgeInputs = {amount:Number(amount),userId,startDate:new Date()}
        await createBudge(reqBody).unwrap().then((data:SuccessResponse)=>{
            toast(data.message)
            form.reset()
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
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
            defaultValue=""
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

export default CreateBudge