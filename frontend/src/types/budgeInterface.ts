import { z } from "zod";
import { Params } from "./globalInterface";

export const budgeSchema = z.object({
    userId:z.string(),
    amount:z.string(),
})

export type Inputs = z.infer<typeof budgeSchema>

export interface UpdateBudgeInputs {
    userId:string;
    amount:number;
}

export interface BudgeInputs extends UpdateBudgeInputs {
    startDate:Date;
}

// in budgeSlice
export interface UpdateBudge extends Params {
    data:UpdateBudgeInputs
}

export interface BudgeResponse {
    message:string;
    isBudgetExists:{
        balance:{
                id: string;
                amount: number;
                userId: string;
                fromDate: Date;
                toDate: Date;
                budgetId: string;
        }[]}&{
            id: string;
            amount: number;
            startDate: Date;
            endDate: Date;
            userId: string;
    }
  }