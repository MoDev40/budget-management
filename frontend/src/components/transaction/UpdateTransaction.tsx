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
import { toast } from "sonner";
import { useGetSingleTransQuery, useUpdateTransMutation } from "../../../strore/features/transactionSlice";
import { IoReload } from "react-icons/io5";
import { ErrorRes } from "../budge/CreateBudge";
import { Params, useNavigate, useParams } from "react-router-dom";
import { useEffect} from "react";
import { Loader } from "lucide-react";

export interface ReqBody {
    amount:number,
    categoryId:string
    userId:string,
    description:string | undefined,
    payedAt:Date
}

const UpdateTransaction = () => {
    const navigate = useNavigate()
    const params = useParams<Params>()
    const {data:trans,setData} = useTranData()
    const [updateTranMutate,{isLoading}] = useUpdateTransMutation()
    const {data:transaction,isLoading:isFetching} = useGetSingleTransQuery({id:params.id as string})
    useEffect(()=>{
    },[transaction?.transaction])
    const {user} = useAuth()
    const transSchema = z.object({
        amount:z.string(),
        userId:z.string(),
        description:z.string().optional(),
    })

    type Inputs = z.infer<typeof transSchema>
    const form = useForm<Inputs>({resolver:zodResolver(transSchema),defaultValues:{
        userId:user?.uid,
    }})

    const onSubmit : SubmitHandler<Inputs> = async (data)=>{
        if(trans?.categoryId == ""){
            return toast("Category ID")
        }
        const {userId,amount,description} = data
        const updatedTrans : ReqBody = {userId,amount:Number(amount),description,payedAt:new Date(trans?.payetAt as Date),categoryId:trans?.categoryId as string}
        await updateTranMutate({data:updatedTrans,id:transaction?.transaction?.id as string}).unwrap().then((data)=>{
            toast(data.message)
            setData(null)
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
            <CategoryDropDown defaultVal={transaction?.transaction?.categoryId as string}/>
            <Button type="submit">{ isLoading ?<IoReload size={20} className="animate-spin"/> :"Submit"}</Button>
            </form>
        </Form>
        </div>
  )
}

export default UpdateTransaction
