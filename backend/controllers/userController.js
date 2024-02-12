import { prisma } from "../config/config.js"
export async function createUser (req,res){
    try{
       const {uid,username} = req.body

       const isUserExists = await prisma.user.findUnique({
        where:{
            id:uid
        }
        })

        if(isUserExists){
        res.status(400).json({message:"Error User is Exists"})
        return
        }
        
       const user = await prisma.user.create({
        data:{
            id:uid,
            username:username
        }
       })


       if(!user){
        res.status(400).json({message:"Error Try again"})
        return
       }

       res.status(201).json({message:"User created successfully"})
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
    }
} 