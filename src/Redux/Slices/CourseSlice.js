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

export const createNewCourse=createAsyncThunk("/course/create",async(data)=>{
    try {
        let formData = new FormData();
        formData.append("title", data?.title);
        formData.append("description", data?.description);
        formData.append("category", data?.category);
        formData.append("createdBy", data?.createdBy);
        formData.append("thumbnail", data?.thumbnail);

        const response=axiosInstance.post('/courses',formData);
        toast.promise(response,{
            loading:"Wait , Creating new Course",
            success:"course created successfully",
            error:"Failed to create new Course"
        })
        return (await response).data;
    } catch (error) {
            toast.error(error?.response?.data?.message);
    }       
})

const CourseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getAllCourses.fulfilled,async (state,action)=>{
            if(action.payload){
                state.courseData=[...action.payload]
            }
        })
    }
})

export default CourseSlice.reducer

