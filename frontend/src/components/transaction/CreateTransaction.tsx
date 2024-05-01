import { useAuth } from "@/hooks/AuthUser"
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { useCreateTransMutation } from "@/strore/features/transactionSlice";
import { IoReload } from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { useGetCategoryQuery } from "@/strore/features/categorySlice"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ErrorRes, TransactionInputs } from "@/types/interfaces";

const CreateTransaction = () => {
    const [createTranMutate,{isLoading}] = useCreateTransMutation()
    const {user} = useAuth()
    const {data:categories} = useGetCategoryQuery(user?.uid as string)

    const transSchema = z.object({
        amount:z.string(),
        userId:z.string(),
        categoryId:z.string(),
        payedAt:z.string(),
        description:z.string().optional(),
    })

    type Inputs = z.infer<typeof transSchema>
    const form = useForm<Inputs>({resolver:zodResolver(transSchema),defaultValues:{
        userId:user?.uid || "hidQODq"
    }})

    const onSubmit : SubmitHandler<Inputs> = async (data)=>{
        const {payedAt,description,categoryId,userId,amount} = data
        const transData : TransactionInputs = {
            amount:Number(amount),
            description,
            userId,
            categoryId,
            payedAt: new Date(payedAt),
        } 
        await createTranMutate(transData).unwrap().then((data)=>{
            toast(data.message)
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    }
    return (
    <Dialog>
    <DialogTrigger ><Button variant="outline" className="w-full">+</Button></DialogTrigger>
    <DialogContent>
        <Form {...form}>
            <form className="flex flex-col space-y-3" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name="userId"
            render={({field})=>(
            <FormItem>
                <FormLabel>id</FormLabel>
                <FormControl>
                    <Input type="text" {...field} readOnly />
                </FormControl>
                <FormMessage className="p-0 text-right"/>
            </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="description"
            defaultValue=""
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
            defaultValue=""
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
            defaultValue=""
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
    </DialogContent>
    </Dialog>
  )
}

export default CreateTransaction