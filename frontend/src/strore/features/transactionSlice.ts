import { DeleteCancel, SingleTransaction, TransactionInputs, Transactions, UpdateTransaction } from "@/types/transactionInterface"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../baseUrl"
import { SuccessResponse } from "@/types/globalInterface"


export const transactionSlice = createApi({
    
    reducerPath:"transApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["trans"],
    endpoints:(builder)=>({
        getUserTrans:builder.query<Transactions,string>({
            query:(id)=>({
                url:`get-transactions/${id}`
            }),
            providesTags:["trans"]
        }),
        recentTrans:builder.query<Transactions,string>({
            query:(id)=>({
                url:`recent-transactions/${id}`
            }),
            providesTags:["trans"]
        }),
        getSingleTrans:builder.query<SingleTransaction,string>({
            query:(id)=>({
                url:`single-transaction/${id}`
            }),
            providesTags:["trans"]
        }),
        createTrans:builder.mutation<SuccessResponse,TransactionInputs>({
            query:(data)=>({
                url:"create-transaction",
                method:"POST",
                body:data
            }),
            invalidatesTags:["trans"]
        }),
        updateTrans:builder.mutation<SuccessResponse,UpdateTransaction>({
            query:({id,data})=>({
                url:`update-transaction/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["trans"],
        }),
        cancelTrans:builder.mutation<SuccessResponse,DeleteCancel>({
            query:({id,userId})=>({
                url:`cancel-transaction/${id}/${userId}`,
                method:"DELETE",
            }),
            invalidatesTags:["trans"]
        }),
        deleteTrans:builder.mutation<SuccessResponse,DeleteCancel>({
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

