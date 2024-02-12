import {prisma} from "../config/config.js"
import {randomId} from "../config/getId.js"
export async function createGoal(req,res){
    try {

        const {dueDate,achieved,amount,userId} = req.body

        const currentDate = new Date(dueDate);
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const goalId = await randomId()
        const isGoalExists = await prisma.goal.findFirst({
            where:{
                dueDate:{
                  gt: new Date(currentYear, currentMonth,1),
                  lt: new Date(currentYear, currentMonth+1,1)
                },userId
            }
        })
        if(isGoalExists){
            res.status(400).json({message:"Goal Exists"})
            return
        }
        const goal = await prisma.goal.create({
            data:{
                id:goalId,
                userId,
                amount,
                achieved,
                dueDate:new Date(dueDate)
            }
        })
        if(!goal){
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(201).json({goal}) 
    } catch (error) {
        res.status(500).json({mesaage:error.mesaage,error})
    }
}

export async function updateGoal(req,res){
    try {
        const {id} = req.params
        const {dueDate,achieved,amount,userId} = req.body

        const isGoalExists = await prisma.goal.findUnique({
            where:{
                id,
                userId
            }
        })
        if(!isGoalExists){
            res.status(404).json({message:"Goal not found"})
            return
        }

        const updatedGoal = await prisma.goal.update({
            data:{
                amount,
                achieved,
                dueDate:new Date(dueDate)
            },where:{
                id,
                userId
            }
        })
        if(!updatedGoal){
            res.status(400).json({message:"Error try again"})
            return
        }
        res.status(200).json({message:"Goal updated successfully"})
    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}

export async function deleteGoal(req, res) {
    try {
        const {id,userId} = req.params
        const isGoalExists = await prisma.goal.findUnique({
            where:{
                id,
                userId
            }
        })
        if(!isGoalExists){
            res.status(404).json({message:"Goal not found"})
            return
        }
        const deletedGoal = await prisma.goal.delete({where:{id, userId}})
        if(!deletedGoal){
            res.status(400).json({message:"Error deleting goal"})
            return
        }
        res.status(200).json({message:"Goal deleted successfully"})

    } catch (error) {
        res.status(500).json({message:error.message,error})
    }
}