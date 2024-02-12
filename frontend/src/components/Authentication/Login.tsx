import { Input } from "@/components/ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router-dom"
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

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useEffect } from "react"

import Cookies from "js-cookie"

const Login = () => {
  useEffect(()=>{
    console.log(auth.currentUser);
  },[])

  const navigate = useNavigate()

  const userSchema = z.object({
    email:z.string().email({message:"Enter Valid Email"}),
    password:z.string()
    .min(6,{message:"Minimum Password is 6"})
    .max(12,{message:"Miximum Password is 12"})
  })

  type Inputs = z.infer<typeof userSchema>
  const form = useForm<Inputs>({resolver:zodResolver(userSchema)})

  const onsubmit : SubmitHandler<Inputs> = async(data)=>{
    try {
      
      const {email,password} = data
      const user = await signInWithEmailAndPassword(auth,email,password).then(async (data)=>{
        const token = await data.user.getIdToken()
        Cookies.set("token",token)
        navigate("/")
      })

      console.log(user);
    } catch (error) {
      console.log(error);
    }
  } 
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
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-0">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
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
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage className="p-0 text-right"/>
                </FormItem>
              )}
              />
            <div className="my-2 flex flex-col space-y-3">
            <Label>Forget Password</Label>
            <Button type="submit" className="w-full">Login</Button>
            <p className="text-center w-full">don't have account <Link className="underline text-blue-500" to="/signup">create one</Link></p>
            </div>
          </form>
      </Form>
      </div>
    </div>
    )
}

export default Login
