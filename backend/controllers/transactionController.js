import {prisma} from "../config/config.js"
import {randomId} from "../config/getId.js"
import { decreaseBalance, increaseBalance } from "./balanceController.js"

export async function createTransaction(req,res){
    try {
        const {amount,categoryId,userId,description,payedAt} = req.body

        const currentDate = new Date();

        const getYear = currentDate.getFullYear();
        const getMonth = currentDate.getMonth();

        const transId = await randomId()

        const existBalance = await prisma.balance.findFirst({
            where:{
                userId,
                toDate:new Date(getYear,getMonth+1,1)
            }
        })

        if(!existBalance){
            res.status(404).json({message:"Error balance not initialized this month"})
            return
        }
        const isCategoryExists = await prisma.category.findUnique({
            where:{
                id:categoryId,
                userId
            }
        })

        if(!isCategoryExists){
            res.status(404).json({message:"Category not exists"})
            return
        }

        
        const createdTrans = await prisma.transaction.create({
            data:{
                id:transId,
                amount,
                description,
                categoryId,
                userId,
                payedAt:new Date(payedAt)
            }
        })
        if(!createdTrans){
            res.status(400).json({message:"Error try again"})
            return
        }

        const updatedAmount = existBalance.amount - amount;

        if(updatedAmount < 0){
            await prisma.transaction.delete({
                where:{
                    id:createdTrans.id
                }
            })
            res.status(400).json({message:"Error try again"})
            return
        }

        const decreasedBalance = await decreaseBalance(userId,amount,existBalance.id)
        if(!decreasedBalance){
            await prisma.transaction.delete({
                where:{
                    id:createdTrans.id
                }
            })
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(201).json({message:"Created successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function cancelTransaction(req,res){
    try {
        const {id,userId} = req.params
        const isTransExists = await prisma.transaction.findUnique({
            where:{
                id,
                userId
            }
        })

        if(!isTransExists){
            res.status(404).json({message:"Transaction not found"})
            return
        }

        const date = new Date(isTransExists.createdAt)
        const getYear = date.getFullYear();
        const getMonth = date.getMonth();
        const endDate = new Date(getYear,getMonth+1,1)

        const balance = await prisma.balance.findFirst({
            where:{
                userId,
                toDate:{
                    lte:endDate
                }
            }
        })

        if(!balance){
            res.status(404).json({message:"Error balance try again"})
            return
        }

        const amount = isTransExists.amount

        const increasedBalance = await increaseBalance(userId,amount,balance.id)

        if(!increasedBalance){
            res.status(400).json({message:"Error increase balance try again"})
            return
        }

        const canceled = await prisma.transaction.delete({
            where:{
                id:isTransExists.id
            }
        })

        if(!canceled){
            await decreaseBalance(userId,amount,balance.id)
            res.status(400).json({message:"Error cancel transaction try again"})
            return
        }

        res.status(200).json({message:"Transaction canceled"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function updateTransition(req,res){
    try {
        const {id} = req.params
        const {amount,categoryId,userId,description,payedAt} = req.body

        const isTransExists = await prisma.transaction.findUnique({
            where:{
                id,
                userId
            }
        })

        if(!isTransExists){
            res.status(404).json({message:"Transaction not found"})
            return
        }

        const date = new Date(isTransExists.createdAt)
        const getYear = date.getFullYear();
        const getMonth = date.getMonth();
        const endDate = new Date(getYear,getMonth+1,1)

        const balance = await prisma.balance.findFirst({
            where:{
                userId,
                toDate:{
                    lte:endDate
                }
            }
        })

        if(!balance){
            res.status(404).json({message:"Error  updating transaction try again"})
            return
        }

        const balanceAmount = balance.amount;

        if(amount > isTransExists.amount){
            const clearAmount = amount - isTransExists.amount
            const isBalanceNegative = balanceAmount - clearAmount;

            if(isBalanceNegative < 0){
                res.status(400).json({message:"Error updating transaction try again"})
                return
            }

            const decreasedBalance = await decreaseBalance(userId,clearAmount,balance.id)
            if(!decreasedBalance){
                res.status(400).json({message:"Error updating transaction try again"})
                return
            }

        }else if(amount < isTransExists.amount){
            const clearAmount = isTransExists.amount - amount
            const increasedBalance = await increaseBalance(userId,clearAmount,balance.id)
            if(!increasedBalance){
                res.status(400).json({message:"Error updating transaction try again"})
                return
            }

        }

        const updatedTransaction = await prisma.transaction.update({
            data:{
                amount,
                description,
                categoryId,
                payedAt:new Date(payedAt)
            },
            where:{
                id:isTransExists.id
            }
        })

        if(!updatedTransaction){
            await prisma.balance.update({
                data:{
                    amount:balance.amount
                },
                where:{
                    id:balance.id
                }
            })
            res.status(400).json({message:"Error updating transaction try again"})
            return
        }

        res.status(200).json({message:"Successfully updated"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function deleteTransaction(req,res){
    try {
        const {id,userId} = req.params
        const deleted = await prisma.transaction.delete({
            where:{
                id,
                userId
            }
        })
        if(!deleted){
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(200).json({message:"Successfully deleted"})
    } catch (error) {
        res.status(500).json({message:error.message,error})       
    }
}

export async function getUserTrans(req,res){
    try {
        const {id} = req.params
        const date = new Date()
        const getYear = date.getFullYear();
        const getMonth = date.getMonth();

        const isTransExists = await prisma.transaction.findMany({
            orderBy:[{createdAt:"desc"}],
            where:{
                userId:id,
                createdAt:{
                    lte: new Date(getYear,getMonth+1,1),
                    gte: new Date(getYear,getMonth,1)
                }
            }
        })

        if(!isTransExists){
            res.status(404).json({message:"Transaction not found"})
            return
        }
        res.status(200).json({message:"Found successfully",transactions:isTransExists})
    } catch (error) {
        res.status(500).json({message:error.message,error})       
    }
}

export async function singleTrans(req,res){
    try {
        const {id} = req.params

        const date = new Date()
        const getYear = date.getFullYear();
        const getMonth = date.getMonth();

        const isTransExists = await prisma.transaction.findUnique({
            where:{
                id,
                createdAt:{
                    lte: new Date(getYear,getMonth+1,1),
                    gte: new Date(getYear,getMonth,1)
                }
            }
        })

        if(!isTransExists){
            res.status(404).json({message:"Transaction not found"})
            return
        }
        res.status(200).json({message:"Found successfully",transaction:isTransExists})
    } catch (error) {
        res.status(500).json({message:error.message,error})       
    }
}


export async function recentTrans(req,res){
    try {
        const {id} = req.params
        const date = new Date()
        const getYear = date.getFullYear();
        const getMonth = date.getMonth();

        const isTransExists = await prisma.transaction.findMany({
            skip:0,
            take:3,
            orderBy:[{createdAt:"desc"}],
            where:{
                userId:id,
                createdAt:{
                    lte: new Date(getYear,getMonth+1,1),
                    gte: new Date(getYear,getMonth,1)
                }
            }
        })

        if(!isTransExists){
            res.status(404).json({message:"Transaction not found"})
            return
        }
        res.status(200).json({message:"Found successfully",transactions:isTransExists})
    } catch (error) {
        res.status(500).json({message:error.message,error})       
    }
} 
