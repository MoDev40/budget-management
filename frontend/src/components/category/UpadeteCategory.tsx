import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Category, ReqBody ,useUpdateCategoryMutation} from "../../../strore/features/categorySlice"
import { toast } from "sonner";
import {FaEdit} from "react-icons/fa"
import { ErrorRes } from "../budge/CreateBudge";
import { IoReload } from "react-icons/io5";

interface Props {
    category:Category
}

const UpadeteCategory : React.FC<Props> = ({category}) => {
    const [updateMutate,{isLoading}] =  useUpdateCategoryMutation()
    const categSchema = z.object({
        name:z.string(),
        userId:z.string().readonly(),
    })
    type Inputs = z.infer<typeof categSchema>

    const form = useForm<Inputs>({resolver:zodResolver(categSchema),defaultValues:{
        userId:category.userId,
        name:category.name,
    }})

    const onSubmit : SubmitHandler<Inputs> = async(data)=>{
        const {userId,name} = data
        const updatedData : ReqBody = {userId,name}
        await updateMutate({id:category.id,data:updatedData}).unwrap().then((data)=>{
            toast(data.message)
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    }

  return (
    <Popover>
        <PopoverTrigger><Button variant="outline"><FaEdit/></Button></PopoverTrigger>
        <PopoverContent>
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
                name="name"
                defaultValue=""
                render={({field})=>(
                <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="Like Rent Fee" {...field}/>
                    </FormControl>
                    <FormMessage className="p-0 text-right"/>
                </FormItem>
                )}
                />
                <Button type="submit">{isLoading ? <IoReload size={20} className="animate-spin"/> :"Submit"}</Button>
                </form>
            </Form>
        </PopoverContent>
    </Popover>
  )
}

export default UpadeteCategory