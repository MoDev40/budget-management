// Global interfaces
export type Params = {
    id:string | undefined,
}

export type ErrorRes = {
    data:{
        message:string
    }
}

export type SuccessResponse = {
    message:string
}

// Transaction interfaces

// create transaction input types
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
// cancel transaction inputs
export interface DeleteCancel extends Params {
    userId:string
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



// Budge Interfaces

// budge inputs
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

// category interface

export interface CategoryInputs {
    name:string;
    userId:string;
}

export interface UpdateCategory extends Params{
    data:CategoryInputs
}

export interface DeleteCategory extends Params{
    userId:string
}

export interface Category { 
    id: string;
    name: string;
    userId: string;
    price: number | null;
}

export interface Categories {
    categories:Category[]
}