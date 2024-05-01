import { z } from "zod";
import { Params } from "./globalInterface";

export const transSchema = z.object({
    amount:z.string(),
    userId:z.string(),
    description:z.string().optional(),
    categoryId:z.string(),
    payedAt:z.string(),
})

export type Inputs = z.infer<typeof transSchema> 

export interface TransactionInputs {
    amount:number,
    categoryId:string
    userId:string,
    description:string | undefined,
    payedAt:Date
}



// update transaction inputs
export interface UpdateTransaction extends Params {
    data:TransactionInputs
}

// single transaction type
export interface Transaction {
    id: string;
    amount: number;
    description: string | null;
    createdAt: Date;
    payedAt: Date;
    categoryId: string;
}

export type SingleTransaction = {
    transaction:Transaction
}

// array of transaction
export interface Transactions {
    transactions:Transaction[]
}