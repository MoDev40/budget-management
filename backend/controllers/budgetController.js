import { cryptoRandomStringAsync } from "crypto-random-string"
import { prisma } from "../config/config.js"
import { decreaceBalance, increaceBalance } from "./balanceController.js"

export async function createBudget(req,res){
    try {
        const {amount,startDate,userId} = req.body
        const id = await cryptoRandomStringAsync({length:26,type:"alphanumeric"})

        const currentDate = new Date(startDate)

        const getMonth = currentDate.getMonth()
        const getYear = currentDate.getFullYear()

        const initialtDate = new Date(getYear,getMonth,1)
        const endDate = new Date(getYear,getMonth+1,1)

        const isBudgetExists = await prisma.budget.findFirst({
            where:{
                // this aproach is also works
                // OR:[{startDate:initialtDate},{endDate:endDate}],
                OR:[
                    {                    
                        startDate:{
                        gte:initialtDate,
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
        res.status(500).json({mesaage:error.mesaage,error})
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

        const balanceAmount = isBudgetExists.balance[0].amount

        if(amount > isBudgetExists.amount){
            const updatedAmount = isBudgetExists.balance[0].amount + (amount - isBudgetExists.amount)
            const increasedBalance = await increaceBalance(userId,updatedAmount,isBudgetExists.balance[0].id)
            if(!increasedBalance){
                res.status(400).json({message:"Error updating budget Try again"})
                return
            }
        }else if(amount < isBudgetExists.amount){
            const updatedAmount = isBudgetExists.balance[0].amount - (isBudgetExists.amount - amount)
            const decreasedBalance = await decreaceBalance(userId,updatedAmount,isBudgetExists.balance[0].id)
            if(!decreasedBalance){
                res.status(400).json({message:"Error updating budget Try again"})
                return
            }
        }

        const currentDate = new Date()
        const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth()+1,1)

        const updatedBudget = await prisma.budget.update({
            data:{
                amount,
            },
            where:{
                id,
                userId,
                endDate
            }
        })
        if(!updatedBudget){
            await prisma.balance.update({
                data:{
                    amount:balanceAmount
                },
                where: {
                    id:isBudgetExists.balance[0].id
                }
            })
            console.log(balanceAmount);
            res.status(400).json({message:"Error updating budget Try again"})
            return
        }
        res.status(201).json({message:"Updated successfully"})
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
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
            res.status(404).json({message:"Budget not found"+currentDate})
            return
        }
        res.status(200).json({message:"Budget Found",isBudgetExists})
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
    }
}