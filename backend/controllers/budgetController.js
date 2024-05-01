import { cryptoRandomStringAsync } from "crypto-random-string"
import { prisma } from "../config/config.js"
import { decreaseBalance, increaseBalance } from "./balanceController.js"

export async function createBudget(req,res){
    try {
        const {amount,startDate,userId} = req.body
        const id = await cryptoRandomStringAsync({length:26,type:"alphanumeric"})

        const currentDate = new Date(startDate)

        const getMonth = currentDate.getMonth()
        const getYear = currentDate.getFullYear()

        const initialDate = new Date(getYear,getMonth,1)
        const endDate = new Date(getYear,getMonth+1,1)

        const isBudgetExists = await prisma.budget.findFirst({
            where:{
                OR:[
                    {                    
                        startDate:{
                        gte:initialDate,
                        lte:endDate
                        }
                    },
                    {    
                        endDate:endDate
                    }
                    ],
                    userId:userId
                }
            })
        if(isBudgetExists){
            res.status(400).json({message:"Budget already created"})
            return
        }
        const createdBudget = await prisma.budget.create({
            data:{
                id,
                startDate:currentDate,
                endDate,
                amount,
                userId
            }
        })
        if(!createdBudget){
         res.status(400).json({message:"Error creating budget Try again"})
         return
        }

        const balanceId = await cryptoRandomStringAsync({length:26,type:"alphanumeric"})

        const initializeBalance = await prisma.balance.create({
            data:{
                id:balanceId,
                amount:createdBudget.amount,
                fromDate:currentDate,
                toDate:endDate,
                userId,
                budgetId:createdBudget.id
            }
        })

        if(!initializeBalance){
            await prisma.budget.delete({
                where:{
                    id:id
                }
            })
            res.status(400).json({message:"Error initializing balance Try again"})
            return
        }

        res.status(201).json({message:"Budge created successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function updateBudget(req,res){
    try {

        const {id} = req.params
        const {amount,userId} = req.body

        const isBudgetExists = await prisma.budget.findUnique({
            where:{
                id,
                userId:userId
            },include:{
                balance:true
            }
        })

        if(!isBudgetExists){
            res.status(404).json({message:"Budget not found"})
            return
        }

        
        if(amount > isBudgetExists.amount){
            const updatedAmount = amount - isBudgetExists.amount
            const updatedBalance = await increaseBalance(userId,updatedAmount,isBudgetExists.balance[0].id)
            if(!updatedBalance){
                res.status(400).json({message:"Error updating budget Try again"})
                return
            }
        }else if(amount < isBudgetExists.amount){
            const updatedAmount = isBudgetExists.amount - amount
            const decreasedBalance = await decreaseBalance(userId,updatedAmount,isBudgetExists.balance[0].id)
            if(!decreasedBalance){
                res.status(400).json({message:"Error updating budget Try again"})
                return
            }
        }

        const updatedBudget = await prisma.budget.update({
            data:{
                amount,
            },
            where:{
                id,
                userId,
            }
        })

        if(!updatedBudget){
            await prisma.balance.update({
                data:{
                    amount:isBudgetExists.balance[0].amount
                },
                where: {
                    id:isBudgetExists.balance[0].id
                }
            })
            res.status(400).json({message:"Error updating budget Try again"})
            return
        }
        res.status(200).json({message:"Updated successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function getBudget (req,res){
    try {
        
        const {id} = req.params
        const currentDate = new Date()
        const getFullYear = currentDate.getFullYear()
        const getMonth = currentDate.getMonth()

        const isBudgetExists = await prisma.budget.findFirst({
            where:{
                userId:id,
                endDate:{
                    lte:new Date(getFullYear,getMonth+1,1)
                }
            },include:{
                balance:true
            }
        })

        if(!isBudgetExists){
            res.status(404).json({message:"Budget not found"})
            return
        }
        res.status(200).json({message:"Budget Found",isBudgetExists})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}