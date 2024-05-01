// create transaction input types
export interface TransactionInputs {
    amount:number,
    categoryId:string
    userId:string,
    description:string | undefined,
    payedAt:Date
}

export type Params = {
    id:string | undefined,
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

export type ErrorRes = {
    data:{
        message:string
    }
}
