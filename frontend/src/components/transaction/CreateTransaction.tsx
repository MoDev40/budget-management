import { useAuth } from "@/hooks/AuthUser"
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useTranData } from "@/hooks/TransContext"
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod"
import { Textarea } from "../ui/textarea";
import CategoryDropDown from "./CategoryDropDown";
import { DatePicker } from "../DatePicker";
import { toast } from "sonner";
import { useCreateTransMutation } from "../../../strore/features/transactionSlice";
import { IoReload } from "react-icons/io5";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { ErrorRes } from "../budge/CreateBudge";

export interface ReqBody {
    amount:number,
    categoryId:string
    userId:string,
    description:string | undefined,
    payedAt:Date
}

const CreateTransaction = () => {
    const [createTranMutate,{isLoading}] = useCreateTransMutation()
    const {data:trans,setData} = useTranData()
    const {user} = useAuth()
    const transSchema = z.object({
        amount:z.string(),
        userId:z.string(),
        description:z.string().optional(),
    })

    type Inputs = z.infer<typeof transSchema>
    const form = useForm<Inputs>({resolver:zodResolver(transSchema),defaultValues:{
        userId:user?.uid
    }})

    const onSubmit : SubmitHandler<Inputs> = async (data)=>{
        if(trans?.categoryId == ""){
            return toast("Category ID")
        }
        const {userId,amount,description} = data
        const createdTrans : ReqBody = {userId,amount:Number(amount),description,payedAt:new Date(trans?.payetAt as Date),categoryId:trans?.categoryId as string}
        await createTranMutate(createdTrans).unwrap().then((data)=>{
            toast(data.message)
            setData(null)
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
                    <Input type="text" {...field} readOnly/>
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
            <CategoryDropDown defaultVal=""/>
            <DatePicker/>
            <Button type="submit">{ isLoading ?<IoReload size={20} className="animate-spin"/> :"Submit"}</Button>
            </form>
        </Form>
    </DialogContent>
    </Dialog>
  )
}

export default CreateTransaction