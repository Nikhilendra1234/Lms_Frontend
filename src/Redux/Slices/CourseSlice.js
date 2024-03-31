import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance.js";
const initialState={
    courseData:[]
}

export const getAllCourses=createAsyncThunk("/course/get",async()=>{
    try{
        const response=axiosInstance.get("/courses");
    toast.promise(response,{
        loading:"Wait ,Course Loading in Progress..",
        success:"All Courses loaded successfully",
        error:"Failed to load Courses"
    });
    return (await response).data.courses;
    }
    catch(error){
            toast.error(error?.response?.data?.message);
    }
})

const CourseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{

    }
})

export default CourseSlice.reducer

