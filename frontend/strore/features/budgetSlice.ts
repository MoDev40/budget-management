import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../baseUrl"
import { ReqBody as CreateParams} from "@/components/budge/CreateBudge"
import { ReqBody as DataShape} from "@/components/budge/UpdateBudge"

type Params = {
    id:string,
}


interface UpdateParams extends Params {
    data:DataShape
}

interface ResData {
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

export const budgetSlice = createApi({
    reducerPath:"budgetApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["budget"],
    endpoints:(builder)=>({
        getUserBudget:builder.query<ResData,Params>({
            query:(id)=>({
                url:`/user-budget/${id}`
            }),
            providesTags:["budget"]
        }),
        createBudget:builder.mutation<any,CreateParams>({
            query:(data)=>({
                url:"create-budget",
                method:"POST",
                body:data
            }),
            invalidatesTags:["budget"]
        }),
        updateBudget:builder.mutation<any,UpdateParams>({
            query:({id,data})=>({
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