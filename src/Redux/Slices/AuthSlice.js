import { createSlice } from "@reduxjs/toolkit";

const initialState={
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') || {}
}

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{}
})
const authSliceReducer=authSlice.reducer

export default authSliceReducer