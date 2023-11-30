import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice ({
    name: "user",
    initialState:null,
    reducers: {
        addNotifications: () => {},
        resetNotifications: () => {}
    },

    extraReducers: (builder) => {
        // save user after signup
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (_, {payload}) => payload);
        // save after login
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (_, {payload}) => payload);
        // logout: destroy user session
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => null)
    },

 })

 export const {addNotifications, resetNotifications} = userSlice.actions;
 export default userSlice.reducer