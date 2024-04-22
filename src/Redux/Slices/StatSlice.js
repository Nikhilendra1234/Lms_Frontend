import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState={
    allUserscount:0,
    subscribedCount:0
}

const getStatsData=createAsyncThunk("stat/get",async()=>{
    try {
        const response= axiosInstance.get('/admin/stat/user');
        toast.promise(response,{
            loading:"Wait stat details loading",
            success:(data)=>{
                return data?.data?.message;    
            },
            error:"Failed to load the stats"
        })
        return (await response).data;
    } catch (error) {
     toast.error(error?.response?.data?.message);   
    }
})

const statSlice=createSlice({
    name:"stat",
    initialState,
    reducers:{},
    extraReducers:()=>{}
})

export default statSlice.reducer