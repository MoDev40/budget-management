import { useUpdateCategoryMutation } from "@/strore/features/categorySlice";
import { Category, CategoryInputs, categorySchema } from "@/types/categoryInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ErrorRes } from "@/types/globalInterface";

interface Props {
    category:Category
}

const UpadeteCategory : React.FC<Props> = ({category}) => {
    const [updateMutate,{isLoading}] =  useUpdateCategoryMutation()

    const form = useForm<CategoryInputs>({resolver:zodResolver(categorySchema),defaultValues:{
        userId:category.userId,
        name:category.name,
    }})

    const onSubmit : SubmitHandler<CategoryInputs> = async(data)=>{
        await updateMutate({id:category.id,data}).unwrap().then((data)=>{
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