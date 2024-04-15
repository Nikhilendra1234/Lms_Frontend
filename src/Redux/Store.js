import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer from './Slices/AuthSlice.js'
import courseSliceReducer from './Slices/CourseSlice.js'
import LectureSlice from "./Slices/LectureSlice.js";
import RazorpaySlice from "./Slices/RazorpaySlice.js";

const store=configureStore({
    reducer:{
        auth:authSliceReducer,
        course:courseSliceReducer,
        razorpay:RazorpaySlice,
        lecture:LectureSlice
    },
    devTools:true
})
export default store