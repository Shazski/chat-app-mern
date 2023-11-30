import { createApi, fetchBaseQuery } from  "@reduxjs/toolkit/query/react"

// define a service user a base url

const appApi = createApi ({
    reducerPath:"appApi",
    baseQuery: fetchBaseQuery ({
        baseUrl:"http://127.0.0.1:3000",
    }),

    endpoints: (builder) => ({
        //creating the user
        signupUser: builder.mutation({
            query: (user) => ({
                url: "/api/user/signup",
                method:"post",
                body:user,
            })
        }),

        //login user
        loginUser: builder.mutation ({
            query: (user) => ({
                url:"/api/user/login",
                method:"post",
                body:user
            })
        }),

        //user logout

        logoutUser : builder.mutation({
            query: (payload) => ({
                url:"/logout",
                method:"DELETE",
                body:payload,
            }),
        }),

    }),
});

export const {useSignupUserMutation, useLoginUserMutation, useLogoutUserMutation} = appApi

export default appApi