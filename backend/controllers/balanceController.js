import { prisma } from "../config/config.js"

export async function decreaseBalance (userId,amount,balanceId){
    try {

        return await prisma.balance.update({
            data:{
                amount:{
                    decrement:amount,
                }
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

export async function increaseBalance (userId,amount,balanceId){
    try {

        return await prisma.balance.update({
            data:{
                amount:{
                    increment:amount
                }
            },
            where:{
                userId,
                id:balanceId
            }
        }) 
    } catch (error) {
        return error
    }
}