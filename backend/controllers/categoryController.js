import {randomId} from "../config/getId.js"
import {prisma}  from "../config/config.js"

export async function createCategory(req,res){
    try {
        const {name,price,userId} = req.body
        const id = await randomId()
        const createdCategory = await prisma.category.create({
            data:{
                id,
                name,
                price,
                userId
            }
        })
        if(!createdCategory){
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(201).json(createdCategory)
    } catch (error) {
        res.status(500).json({message:error.mesaage,error})
    }
}

export async function updateCategory(req,res){
    try {
        const {id} = req.params
        const {name,price,userId} = req.body

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
                price,
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
        res.status(200).json(updatedCategory)
    } catch (error) {
        res.status(500).json({message:error.mesaage,error})
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