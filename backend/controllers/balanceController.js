import { prisma } from "../config/config.js"

export async function decreaceBalance (userId,updatedAmount,balanceId){
    try {

        return await prisma.balance.update({
            data:{
                amount:updatedAmount
            },
            where:{
                id:balanceId,
                userId,
            }
        })
    } catch (error) {
        return error
    }
}

export async function increaceBalance (userId,updatedAmount,balanceId){
    try {

        return await prisma.balance.update({
            data:{
                amount:updatedAmount
            },
            where:{
                id:balanceId,
                userId,
            }
        })
    } catch (error) {
        return error
    }
}