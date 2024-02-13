import { useAuth } from "@/hooks/AuthUser";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form"
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ReqBody, useCreateCategoryMutation } from "../../../strore/features/categorySlice"
import { toast } from "sonner";
import { ErrorRes } from "../budge/CreateBudge";
import { IoReload } from "react-icons/io5";
const CreateCategory = () => {
    const {user} = useAuth()
    const [createMutate,{isLoading}] = useCreateCategoryMutation()
    const categSchema = z.object({
        name:z.string(),
        price:z.string().optional(),
        userId:z.string().readonly(),
    })
    type Inputs = z.infer<typeof categSchema>

    const form = useForm<Inputs>({resolver:zodResolver(categSchema),defaultValues:{
        userId:user?.uid,
    }})
    
    const onsSubmit : SubmitHandler<Inputs> = async(data)=>{
        const {userId,name,price} = data
        const createdData : ReqBody = {userId,name,price:Number(price)}
        await createMutate(createdData).unwrap().then((data)=>{
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
                <form className="flex flex-col space-y-3" onSubmit={form.handleSubmit(onsSubmit)}>
                <FormField
                control={form.control}
                name="userId"
                render={({field})=>(
                <FormItem>
                    <FormLabel>id</FormLabel>
                    <FormControl>
                        <Input type="text" {...field}/>
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
                <FormField
                control={form.control}
                name="price"
                defaultValue=""
                render={({field})=>(
                <FormItem>
                    <FormLabel>price</FormLabel>
                    <FormControl>
                        <Input type="text" placeholder="0.00" {...field}/>
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