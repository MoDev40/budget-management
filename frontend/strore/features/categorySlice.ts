import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {BASE_URL} from "../baseUrl"

interface Params {
    id:string;
}

export interface ReqBody {
    name:string;
    price:number | undefined;
    userId:string;
}


interface UpdateDataParams extends Params{
    data:ReqBody
}

interface DeleteParams extends Params{
    userId:string
}

export interface ResponseData {
    message:string;
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

const categorySlice = createApi({
    reducerPath:"categoryApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["category"],
    endpoints:(builder)=>({
        createCategory:builder.mutation<ResponseData,ReqBody>({
            query:(data)=>({
                url:"create-category",
                method:"POST",
                body:data
            }),
            invalidatesTags:["category"]
        }),
        updateCategory:builder.mutation<ResponseData,UpdateDataParams>({
            query:({id,data})=>({
                url:`update-category/${id}`,
                method:"PUT",
                body:data
            }),
            invalidatesTags:["category"]
        }),
        deleteCategory:builder.mutation<ResponseData,DeleteParams>({
            query:({id,userId})=>({
                url:`delete-category/${id}/${userId}`,
                method:"DELETE"
            }),
            invalidatesTags:["category"]
        }),
        getCategory:builder.query<Categories,Params>({
            query:({id})=>({
                url:`get-category/${id}`
            }),
            providesTags:["category"]
        })

    })
})

export const {useCreateCategoryMutation,useUpdateCategoryMutation,useDeleteCategoryMutation,useGetCategoryQuery} = categorySlice

export default categorySlice