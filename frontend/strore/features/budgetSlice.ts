import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../baseUrl"
type Params = {
    id:string,
}

interface UpdateParams extends Params {
    data:{
        userId:string;
        amount:number;
    }
}
export const budgetSlice = createApi({
    reducerPath:"budgetApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["budget"],
    endpoints:(builder)=>({
        getUserBudget:builder.query({
            query:({id}:Params)=>({
                url:`/user-budget/${id}`
            }),
            providesTags:["budget"]
        }),
        createBudget:builder.mutation({
            query:(data)=>({
                url:"create-budget",
                method:"POST",
                body:data
            }),
            invalidatesTags:["budget"]
        }),
        updateBudget:builder.mutation({
            query:({id,data}:UpdateParams)=>({
                url:`/update-budget/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["budget"]
        })
    })
})

export const {useGetUserBudgetQuery,useCreateBudgetMutation,useUpdateBudgetMutation} = budgetSlice
export default budgetSlice