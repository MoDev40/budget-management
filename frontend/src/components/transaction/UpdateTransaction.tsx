import { useAuth } from "@/hooks/AuthUser";
import { ErrorRes, TransactionInputs } from "@/types/interfaces";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { Params, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { useGetCategoryQuery } from "@/strore/features/categorySlice";
import { useGetSingleTransQuery, useUpdateTransMutation } from "@/strore/features/transactionSlice";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Textarea } from "../ui/textarea";



const UpdateTransaction = () => {
    const {user} = useAuth()
    const navigate = useNavigate()
    const params = useParams<Params>()
    const [updateTranMutate,{isLoading}] = useUpdateTransMutation()
    const {data:categories} = useGetCategoryQuery(user?.uid as string)
    const {data:transaction,isLoading:isFetching} = useGetSingleTransQuery(params.id as string)

    const transSchema = z.object({
        amount:z.string(),
        userId:z.string(),
        description:z.string().optional(),
        categoryId:z.string(),
        payedAt:z.string(),
    })

    type Inputs = z.infer<typeof transSchema>
    const form = useForm<Inputs>({resolver:zodResolver(transSchema),defaultValues:{
        userId:user?.uid,
    }})

    const onSubmit : SubmitHandler<Inputs> = async (data)=>{
        const {userId,amount,description,payedAt,categoryId} = data
        const updatedTrans : TransactionInputs = {
            amount:Number(amount),
            description,
            userId,
            categoryId,
            payedAt: new Date(payedAt),
        } 
        await updateTranMutate({data:updatedTrans,id:transaction?.transaction?.id as string}).unwrap().then((data)=>{
            toast(data.message)
            navigate("/dashboard/history")
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    }
    return (
        isFetching
        ?
        <Loader className="animate-spin"/>
        :
        <div className="w-full md:w-[1120px] md:mx-auto p-5 ">
        <Form {...form}>
            <form className="flex flex-col space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name="userId"
            render={({field})=>(
            <FormItem>
                <FormLabel>id</FormLabel>
                <FormControl>
                    <Input type="text" {...field} readOnly/>
                </FormControl>
                <FormMessage className="p-0 text-right"/>
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="description"
            defaultValue={transaction?.transaction.description as string}
            render={({field})=>(
            <FormItem>
                <FormLabel>description</FormLabel>
                <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about "
                  {...field}
                />
                </FormControl>
                <FormMessage className="p-0 text-right"/>
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="amount"
            defaultValue={transaction?.transaction.amount.toString()}
            render={({field})=>(
            <FormItem>
                <FormLabel>amount</FormLabel>
                <FormControl>
                    <Input type="text" placeholder="0.00" {...field}/>
                </FormControl>
                <FormMessage className="p-0 text-right"/>
            </FormItem>
            )}
            />
                        <FormField
            control={form.control}
            name="payedAt"
            defaultValue={transaction?.transaction.payedAt.toString()}
            render={({field})=>(
            <FormItem>
                <FormLabel>payedAt</FormLabel>
                <FormControl>
                    <Input type="date" {...field}/>
                </FormControl>
                <FormMessage className="p-0 text-right"/>
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="categoryId"
            defaultValue={transaction?.transaction.categoryId}
            render={({field})=>(
                <FormItem>
                    <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                            <SelectValue placeholder="Pick category"/>
                        </SelectTrigger>
                        <SelectContent>
                            {   
                                categories&&
                                categories.categories.map((category)=>(
                                    <SelectItem key={category.id} value={category.id}>{category.name}</SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                    </FormControl>
                </FormItem>
            )}
            />
            <Button type="submit">{ isLoading ?<IoReload size={20} className="animate-spin"/> :"Submit"}</Button>
            </form>
        </Form>
        </div>
  )
}

export default UpdateTransaction
