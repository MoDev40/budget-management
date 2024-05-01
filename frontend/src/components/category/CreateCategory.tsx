import { useAuth } from "@/hooks/AuthUser";
import { useCreateCategoryMutation } from "@/strore/features/categorySlice";
import { CategoryInputs, categorySchema } from "@/types/categoryInterface";
import { ErrorRes } from "@/types/globalInterface";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoReload } from "react-icons/io5";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
const CreateCategory = () => {
    const {user} = useAuth()
    const [createMutate,{isLoading}] = useCreateCategoryMutation()


    const form = useForm<CategoryInputs>({resolver:zodResolver(categorySchema),defaultValues:{
        userId:user?.uid,
    }})
    
    const onSubmit : SubmitHandler<CategoryInputs> = async(data)=>{
        await createMutate(data).unwrap().then((data)=>{
            toast(data.message)
            form.reset()
        }).catch((error:ErrorRes)=>{
            toast(error.data.message)
        })
    }

  return (
    <Popover>
        <PopoverTrigger><Button variant="outline">+</Button></PopoverTrigger>
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
                        <Input type="text" {...field} readOnly />
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
                <Button type="submit">{ isLoading ?<IoReload size={20} className="animate-spin"/> :"Submit"}</Button>
                </form>
            </Form>
        </PopoverContent>
    </Popover>
  )
}

export default CreateCategory