import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import {BASE_URL} from "../baseUrl"

interface UserAuth {
    user:{
        id: string;
        username: string;
        isAdmin: boolean;
    }
}
const authSlice = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({baseUrl:BASE_URL}),
    tagTypes:["auth"],
    endpoints:(builder)=>({
        curentUser:builder.query<UserAuth,string>({
            query:(id)=>({
                url:`auth-user/${id}`
            }),
            providesTags:["auth"]
        }),
    })
})

export const {useCurentUserQuery} = authSlice
export default authSlice