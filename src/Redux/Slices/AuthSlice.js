import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js"
const initialState={
    isLoggedIn: localStorage.getItem('isLoggedIn') || false,
    role: localStorage.getItem('role') || "",
    data: localStorage.getItem('data') != undefined ? JSON.parse(localStorage.getItem('data')) : {}
}

export const createAccount=createAsyncThunk("/auth/signup",async(data)=>{
    try{
        const res=axiosInstance.post("user/register",data);
    toast.promise(res,{
        loading:"Wait , creating your account..",
        success:(data)=>{
            return data?.data?.message;
        },
        error:"Failed to create account.."
    });
    return (await res).data;
    }catch(error){
        toast.error(error?.response?.data?.message);
    }
    
})

export const login=createAsyncThunk("auth/login",async (data)=>{
    try{
        const res=axiosInstance.post("user/login",data);
        toast.promise(res,{
            loading:"wait , Authentication is on progress...",
            success:(data)=>{
                return data?.data?.message;
            },
            error:"Failed to login..."
        });
        return (await res).data;

    }catch(error){
        toast.error(error?.response?.data?.message);
    }

});

export const logout=createAsyncThunk("auth/logout",async()=>{
    try{
        const res=axiosInstance.post("user/logout");
    toast.promise(res,{
        loading:"Wait , logout in progress ...",
        success:(data)=>{
            return data?.data?.message;    
        },
        error:"Failed to logout..."
    });
    return (await res).data;
    }
    catch(error){
        toast.error(error?.response?.data?.message);
    }
});

export const updateUser=createAsyncThunk("/user/update/profile",async(data)=>{
    try {
            const res= axiosInstance.put(`user/update/${data[0]}`,data[1]);
            toast.promise(res,{
                loading:"Wait , Profile updation processing...",
                success:(data)=>{
                    return data?.data?.message;
                },
                error:"Failed to update user profile.."
            });

            return (await res).data;

    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const getUserData=createAsyncThunk('/user/details',async()=>{
    try {
        const res=axiosInstance.get('user/me');
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(login.fulfilled,(state,action)=>{
            localStorage.setItem("data",JSON.stringify(action?.payload?.user));
            localStorage.setItem("isLoggedIn",true);
            localStorage.setItem("role",action?.payload?.user?.role);

            state.role=action?.payload?.user?.data;
            state.data=action?.payload?.user;
            state.isLoggedIn=true;
        })
        .addCase(logout.fulfilled,(state)=>{
            localStorage.clear();
            state.role="";
            state.isLoggedIn=false,
            state.data={};
        })
        .addCase(getUserData.fulfilled,(state,action)=>{
                if(!action?.payload?.user)return

                localStorage.setItem("data",JSON.stringify(action?.payload?.user));
                localStorage.setItem("role",action?.payload?.user?.role);
                localStorage.setItem("isLoggedIn",true);
                state.role=action?.payload?.user?.role;
                state.isLoggedIn=true;
                state.data=action?.payload?.user;
        });
    }
})
const authSliceReducer=authSlice.reducer

export default authSliceReducer