import { Input } from "@/components/ui/input"
import { Button } from "../ui/button"
import { Link, Navigate, useNavigate } from "react-router-dom"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {z} from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm,SubmitHandler} from "react-hook-form";

import {UserCredential, createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "@/lib/firebase";
import axios from "axios"
import { useState } from "react"
import { IoReload } from "react-icons/io5"
import { useAuth } from "@/hooks/AuthUser"

type ReqBody = {
  username:string,
  uid:string
}

const createUser : (data:ReqBody)=>Promise<UserCredential> = async(data:ReqBody)=>{
  return await axios.post("http://localhost:8000/api/create-user",data)
}
const Signup = () => {
  const {user} = useAuth()

  const userSchema = z.object({
    username:z.string().min(2,{message:"Username must be at least 2 characters."}),
    email:z.string().email({message:"Enter Valid Email"}),
    password:z.string()
    .min(6,{message:"Minimum Password is 6"})
    .max(12,{message:"Miximum Password is 12"})
  })

  const [isPending,setIsPending] = useState<boolean>(false)

  type Inputs = z.infer<typeof userSchema>
  const form = useForm<Inputs>({resolver:zodResolver(userSchema)})
  const navigate = useNavigate()

  const onsubmit : SubmitHandler<Inputs> = async(data)=>{
      setIsPending(true)
      
      const {email,password,username} = data
      try {
        
        const user = await createUserWithEmailAndPassword(auth,email,password)
        const reqBody : ReqBody = {username,uid:user.user.uid}
  
        await createUser(reqBody).then(()=>{
          navigate("/login")
        }).catch(async()=>{
          await deleteUser(user.user)
        })
        setIsPending(false)

      } catch (error) {
        console.log(error);
      }
  }
  
  if(user) return <Navigate to="/"/> 
  return (
      <div className="flex flex-col md:flex-row md:max-w-[1120px] md:mx-auto md:p-10">
      <div className="w-full hidden md:block">
        <img className="w-full bg-[#f6f4f5] shadow-md h-full object-contain" src="/images/man.WEBP" alt=""/>
      </div>
      <div className="w-full flex flex-col justify-center bg-[#fff] shadow-md   ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onsubmit)} className="p-10 md:p-16 space-y-3">
              <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
                  </FormControl>
                  <FormMessage className="p-0 text-right"/>
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} type="email"/>
                  </FormControl>
                  <FormMessage className="p-0 text-right"/>
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} type="password"/>
                  </FormControl>
                  <FormMessage className="p-0 text-right"/>
                </FormItem>
              )}
              />
            <div className="my-2 flex flex-col space-y-3">
            <Button type="submit">{ isPending ?<IoReload size={20} className="animate-spin"/> :"SignUp"}</Button>
            <p className="text-center w-full">already have an account <Link className="underline text-blue-500" to="/login">Login</Link></p>
            </div>
          </form>
      </Form>
      </div>
    </div>
    )
}

export default Signup
