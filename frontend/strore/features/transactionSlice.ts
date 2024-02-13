import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../baseUrl"
import { ResponseData } from "./categorySlice"

export interface ReqBody {
    amount:number,
    categoryId:string
    userId:string,
    description:string | undefined,
    payedAt:Date
}

type Params = {
    id:string | undefined,
}


interface UpdateParams extends Params {
    data:ReqBody
}


export interface Transaction {
    
    id: string;
    amount: number;
    description: string | null;
    createdAt: Date;
    payedAt: Date;
    categoryId: string;
}

type Trans = {
    transaction:Transaction
}

interface Transactions {
    transactions:Transaction[]
}
interface DeleteCancelParams extends Params {
    userId:string
}
export const transactionSlice = createApi({
    
    reducerPath:"transApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["trans"],
    endpoints:(builder)=>({
        getUserTrans:builder.query<Transactions,Params>({
            query:({id})=>({
                url:`get-transactions/${id}`
            }),
            providesTags:["trans"]
        }),
        recentTrans:builder.query<Transactions,Params>({
            query:({id})=>({
                url:`recent-transactions/${id}`
            }),
            providesTags:["trans"]
        }),
        getSingleTrans:builder.query<Trans,Params>({
            query:({id})=>({
                url:`single-transaction/${id}`
            }),
            providesTags:["trans"]
        }),
        createTrans:builder.mutation<ResponseData,ReqBody>({
            query:(data)=>({
                url:"create-transaction",
                method:"POST",
                body:data
            }),
            invalidatesTags:["trans"]
        }),
        updateTrans:builder.mutation<ResponseData,UpdateParams>({
            query:({id,data})=>({
                url:`update-transaction/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["trans"],
        }),
        cancelTrans:builder.mutation<ResponseData,DeleteCancelParams>({
            query:({id,userId})=>({
                url:`cancel-transaction/${id}/${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["trans"]
        }),
        deleteTrans:builder.mutation<ResponseData,DeleteCancelParams>({
            query:({id,userId})=>({
                url:`delete-transaction/${id}/${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["trans"]
        })
    })
})

export const {useCreateTransMutation,useGetUserTransQuery,useRecentTransQuery,useCancelTransMutation,useUpdateTransMutation,useDeleteTransMutation,useGetSingleTransQuery} = transactionSlice
export default transactionSlice

