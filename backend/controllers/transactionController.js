import {prisma} from "../config/config.js"
import {randomId} from "../config/getId.js"
import { decreaceBalance, increaceBalance } from "./balanceController.js"

export async function createTransaction(req,res){
    try {
        const {amount,categoryId,userId,description,payedAt} = req.body

        const currentDate = new Date();
        const payed = new Date(payedAt);
        const getYear = currentDate.getFullYear();
        const getMonth = currentDate.getMonth();

        const getPayedYear = payed.getFullYear();
        const getPayedMonth = payed.getMonth();

        const transId = await randomId()
        const endDate = new Date(getYear,getMonth+1,1)

        const existBalance = await prisma.balance.findFirst({
            where:{
                userId,
                toDate:endDate
            }
        })

        if(!existBalance){
            res.status(404).json({message:"Error blance not initialized this month"})
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


        const isTransExists = await prisma.transaction.findFirst({
            where:{
                AND:[{categoryId},{userId},{createdAt:{
                    gt: new Date(getYear, getMonth,1),
                    lt: new Date(getYear, getMonth+1,1)
                }},
                { payedAt:{
                    gt: new Date(getPayedYear, getPayedMonth,1),
                    lt: new Date(getPayedYear, getPayedMonth+1,1)
                }
            }]
            }
        })
        
        if(isTransExists){
            res.status(400).json({message:"Transaction is exists"})
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

        const decreacedBalance = await decreaceBalance(userId,updatedAmount,existBalance.id)
        if(!decreacedBalance){
            await prisma.transaction.delete({
                where:{
                    id:createdTrans.id
                }
            })
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(201).json({createdTrans,decreacedBalance})
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
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
                toDate:endDate
            }
        })

        if(!balance){
            res.status(404).json({message:"Error try again"})
            return
        }

        const amount = isTransExists.amount
        const updatedAmount = amount + balance.amount

        const increacedBalance = await increaceBalance(userId,updatedAmount,balance.id)

        if(!increacedBalance){
            res.status(400).json({message:"Error try again"})
            return
        }

        const canceled = await prisma.transaction.delete({
            where:{
                id:isTransExists.id
            }
        })

        if(!canceled){
            res.status(400).json({message:"Error try again"})
            return
        }

        res.status(200).json({message:"Transaction canceled"})
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
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
                toDate:endDate
            }
        })

        if(!balance){
            res.status(404).json({message:"Error  updating transaction try again"})
            return
        }

        const balanceAmount = balance.amount;

        if(amount > isTransExists.amount){
            const clearAmount = amount - isTransExists.amount
            const updatedAmount = balanceAmount - clearAmount;

            if(updatedAmount < 0){
                res.status(400).json({message:"Error updating transaction try again"})
                return
            }

            const decreacedBalance = await decreaceBalance(userId,updatedAmount,balance.id)
            if(!decreacedBalance){
                res.status(400).json({message:"Error updating transaction try again"})
                return
            }

        }else if(amount < isTransExists.amount){
            const clearAmount = isTransExists.amount - amount
            const updatedAmount = balanceAmount + clearAmount;
            const increacedBalance = await increaceBalance(userId,updatedAmount,balance.id)
            if(!increacedBalance){
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

        res.status(200).json({message:"Successefully updated"})
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
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
        res.status(200).json({message:"Successefully deleted"})
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})       
    }
}