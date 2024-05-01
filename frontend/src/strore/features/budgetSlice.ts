import { BudgeInputs, BudgeResponse, UpdateBudge } from "@/types/budgeInterface"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../baseUrl"
import { SuccessResponse } from "@/types/globalInterface"


export const budgetSlice = createApi({
    reducerPath:"budgetApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["budget"],
    endpoints:(builder)=>({
        getUserBudget:builder.query<BudgeResponse,string>({
            query:(id)=>({
                url:`user-budget/${id}`
            }),
            providesTags:["budget"]
        }),
        createBudget:builder.mutation<SuccessResponse,BudgeInputs>({
            query:(data)=>({
                url:"create-budget",
                method:"POST",
                body:data
            }),
            invalidatesTags:["budget"]
        }),
        updateBudget:builder.mutation<SuccessResponse,UpdateBudge>({
            query:({id,data})=>({
                url:`update-budget/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["budget"]
        })
    })
})

export const {useGetUserBudgetQuery,useCreateBudgetMutation,useUpdateBudgetMutation} = budgetSlice
export default budgetSlice