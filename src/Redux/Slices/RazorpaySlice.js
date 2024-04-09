import  { createAsyncThunk,createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

import axiosInstance from '../../Helpers/axiosInstance'

const initialState={
    key:"",
    subscription_id:"",
    isPaymentVerified:"",
    allPayments:{},
    finalMonths:{},
    monthlySalesRecord:[]
}
export const getRazorpayId=createAsyncThunk("/razorpay/getId",async()=>{
    try {
        const response=await axiosInstance.get('razorpay/payment-key');
         return  response.data;
    } catch (error) {
        toast.error("Failed to get the payment id");
    }
    
})

export const purchaseCourseBundle=createAsyncThunk('/purchaseDetails',async()=>{
    try {
        const response=await axiosInstance.post('/payments/subscribe');
        return response.data;
    } catch (error) {
       toast.error(error?.response?.data?.message); 
    }
})

export const verifyUserPayment=createAsyncThunk('/payments/varify',async(data)=>{
    try {
        const response=await axiosInstance.post('/payments/verify',{
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_subscription_id:data.razorpay_subscription_id,
            razorpay_signature:data.razorpay_signature
        });
        return response.data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
    
})

export const getPaymentRecord=createAsyncThunk('/payments/record',async()=>{
    try {
        const response=axiosInstance.get('/payment?count=100');
        toast.promise(response,{
            loading:"Wait , Fetching the payment records",
            success:(data)=>{
                return data?.data?.message
            },
            error:"Failed to get payment record"
        });
        return (await response).data;
    } catch (error) {
        toast.error("operation failed");
    }
})

export const cancelCourseBundle=createAsyncThunk("/payments/cancel",async()=>{
    try {
        const response=axiosInstance.post('/payments/unsubscribe');
        toast.promise(response,{
            loading:"wait , unsubscribing the bundle",
            success:(data)=>{
                return data?.data?.message
            },
            error:"failed to unsubscribe"
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})
const razorpaySlice=createSlice({
    name:"razorpay",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(getRazorpayId.fulfilled,(state,action)=>{
            state.key=action?.payload?.key
        })
        .addCase(purchaseCourseBundle.fulfilled,(state,action)=>{
            state.subscription_id=action?.payload?.subscription_id
        })
        .addCase(verifyUserPayment.fulfilled,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(verifyUserPayment.rejected,(state,action)=>{
            toast.success(action?.payload?.message);
            state.isPaymentVerified=action?.payload?.success;
        })
        .addCase(getPaymentRecord.fulfilled,(state,action)=>{
            state.allPayments=action?.payload?.allPayments;
            state.finalMonths=action?.payload?.finalMonths;
            state.monthlySalesRecord=action?.payload.monthlySalesRecord;
        })
    }
})

export default razorpaySlice.reducer
