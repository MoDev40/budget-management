import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/AuthUser"
import { zodResolver } from "@hookform/resolvers/zod"
import {SubmitHandler, useForm } from "react-hook-form"
import { useCurentUserQuery } from "../../../strore/features/authSlice"
import { z } from "zod"
import { useEffect } from "react"

const Profile = () => {
  const {user} = useAuth()
  const {data} = useCurentUserQuery({id:user?.uid as string})
  useEffect(()=>{

  },[data])
  const userSchema = z.object({
    username:z.string().min(2,{message:"Username must be at least 2 characters."}),
    email:z.string().email({message:"Enter Valid Email"}),
    password:z.string()
    .min(6,{message:"Minimum Password is 6"})
    .max(12,{message:"Miximum Password is 12"})
  })

  type Inputs = z.infer<typeof userSchema>
  const form = useForm<Inputs>({resolver:zodResolver(userSchema)})

  const onsubmit : SubmitHandler<Inputs> = async(data)=>{
    console.log(data);
  }

  return (
    <div className="flex flex-col md:w-[1120px] md:mx-auto md:p-10">
        <div className="bg-[#212023] shadow-md w-full rounded-tr rounded-tl py-2 h-2">
        </div>
        <div className="w-full bg-white shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onsubmit)} className="p-10  md:p-16 space-y-3">
            <FormField
              control={form.control}
              name="username"
              defaultValue={data?.user.username}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" type="text" {...field} readOnly />
                  </FormControl>
                  <FormMessage className="p-0 text-right"/>
                </FormItem>
              )}
              />
              <FormField
              control={form.control}
              name="email"
              defaultValue={user?.email as string}
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} readOnly/>
                  </FormControl>
                  <FormMessage className="p-0 text-right"/>
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="password"
              defaultValue="........"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} readOnly type="password"/>
                  </FormControl>
                  <FormMessage className="p-0 text-right"/>
                </FormItem>
              )}
              />
            {/* <div className="my-2">
            <Button type="submit" >Update</Button>
            </div> */}
            </form>
          </Form>
        </div>
    </div>
  )
}

export default Profile