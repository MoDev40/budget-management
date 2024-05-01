import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {BASE_URL} from "../baseUrl"
import { Categories, CategoryInputs, DeleteCategory, SuccessResponse, UpdateCategory } from "@/types/interfaces"



const categorySlice = createApi({
    reducerPath:"categoryApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["category"],
    endpoints:(builder)=>({
        createCategory:builder.mutation<SuccessResponse,CategoryInputs>({
            query:(data)=>({
                url:"create-category",
                method:"POST",
                body:data
            }),
            invalidatesTags:["category"]
        }),
        updateCategory:builder.mutation<SuccessResponse,UpdateCategory>({
            query:({id,data})=>({
                url:`update-category/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["category"]
        }),
        deleteCategory:builder.mutation<SuccessResponse,DeleteCategory>({
            query:({id,userId})=>({
                url:`delete-category/${id}/${userId}`,
                method:"DELETE"
            }),
            invalidatesTags:["category"]
        }),
        getCategory:builder.query<Categories,string>({
            query:(id)=>({
                url:`get-category/${id}`
            }),
            providesTags:["category"]
        })

    })
})

export const {useCreateCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useGetCategoryQuery} = categorySlice

export default categorySlice