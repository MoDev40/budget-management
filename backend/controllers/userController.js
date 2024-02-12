import { prisma } from "../config/config.js"
export async function createUser (req,res){
    try{
       const {uid,username} = req.body
       console.log("Comming");
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

export async function getUser(req,res){
    try {
        const {id} = req.params
        const isUserExists = await prisma.user.findUnique({
            where:{
                id
            }
        })
    
        if(!isUserExists){
            res.status(400).json({message:"Error User Not Found"})
            return
        }
        res.status(200).json(isUserExists)
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
    }
}