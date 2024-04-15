import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance"

const initialState={
    lectures:[]
}

export const getCourseLectures=createAsyncThunk("/course/lecture/get",async(cid)=>{
    try {
        const response=await axiosInstance.get(`/courses/${cid}`);
        
        toast.promise(response,{
            loading:"Fetching the course lectures",
            success:"Lectures fetched successfully",
            error:"Failed to fetch lectures"
        })
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }    
})

export const addCourseLecture= createAsyncThunk("/course/lecture/add",
                                                                async(data)=>{

            try {
                const formdata=new FormData();
                formdata.append("lecture",data.lecture);
                formdata.append("titel",data.title);
                formdata.append("description",data.description);
               const response=await axiosInstance.post(`/courses/${data.id}`);
               
               toast.promise(response,{
                loading:"Adding course lectures",
                success:"Added course lectures",
                error:"Failed to add lectures"
               });
               return (await response).data;
            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
    })

export const deleteCourseLectures=createAsyncThunk("/course/lecture/delete",async(data)=>{
    try {
           const response=await axiosInstance.delete(`/courses?courseId=${data.courseId}&lectureId=${data.lectureId}`);
           toast.promise(response,{
            loading:"Deleting course lecture",
            success:"Course lecture deleted ",
            error:"Failed to delete lectures"
           });
           return (await response).data;
            
    } catch (error) {
        toast.error(error?.response?.data?.message);   
    }
})
const lectureSlice=createSlice({
    name:"lectures",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getCourseLectures.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.lectures;
        })
        .addCase(addCourseLecture.fulfilled,(state,action)=>{
            state.lectures=action?.payload?.course?.lectures;
        })
    }
})

export default lectureSlice.reducer