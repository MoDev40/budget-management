import {randomId} from "../config/getId.js"
import {prisma}  from "../config/config.js"

export async function createCategory(req,res){
    try {
        const {name,userId} = req.body
        const id = await randomId()
        const createdCategory = await prisma.category.create({
            data:{
                id,
                name,
                userId
            }
        })
        if(!createdCategory){
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(201).json({message:"Created Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function updateCategory(req,res){
    try {
        const {id} = req.params
        const {name,userId} = req.body

        const isCategoryExists = await prisma.category.findUnique({
            where:{
                id,
                userId
            }
        })

        if(!isCategoryExists){
            res.status(404).json({message: 'Category not found'})
            return
        }

        const updatedCategory = await prisma.category.update({
            data:{
                name,
            },
            where:{
                id,
                userId
            }
        })
        if(!updatedCategory){
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(200).json({message:"Updated Successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function deleteCategory(req,res){
    try {
        const {id,userId} = req.params
        const isCategoryExists = await prisma.category.findUnique({
            where:{
                id,
                userId,
            },include:{
                transactions:true,
            }
        })

        if(!isCategoryExists){
            res.status(404).json({message:"Category not found"})
            return
        }

        if(isCategoryExists.transactions.length > 0){
            res.status(400).json({message:"category have relation with transaction"})
            return
        }
        const deletedCategory = await prisma.category.delete({
            where:{
                id,
                userId
            }
        })
        if(!deletedCategory){
            res.status(404).json({message:"Error deleting category"})
            return
        }
        res.status(200).json({message:"Category deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function getCategory (req,res){
    try {
        const {id} = req.params
        const isCategoryExists = await prisma.category.findMany({
            where:{
                userId:id,
            }
        })

        if(!isCategoryExists){
            res.status(404).json({message:"Category not found"})
            return
        }
        res.status(200).json({categories:isCategoryExists,message:"Founded successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}