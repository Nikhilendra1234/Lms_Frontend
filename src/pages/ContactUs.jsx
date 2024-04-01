import { useState } from "react"
import toast from "react-hot-toast";

import axiosInstance from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import HomeLayout from "../Layout/HomeLayout"

function Contact(){

    const[inputdata,setInputdata]=useState({
        name:"",
        email:"",
        message:""
    });

    function handleInputChange(e){
        const{name,value}=e.target;
            setInputdata({
                ...inputdata,
                [name]:value
            });
    }

    async function OnFormSubmit(e){
        e.preventDefault();
        if(!inputdata.name || !inputdata.email || !inputdata.message){
            toast.error("Fill up all the fields...");
            return;
        }
        if(!isEmail(inputdata.email)){
            toast.error("Invalid Email");
            return;
        }

        try{
            const response=axiosInstance.post("/contact",inputdata);
            toast.promise(response,{
                loading:"Wait , Message submission prossecing ...",
                success:"Message send successfully",
                error:"Failed to send message"
            });
            const responsedata=await response;
            if(responsedata?.data?.success){
                setInputdata({
                    name:"",
                    email:"",
                    message:""
                });
            }
        }
        catch(error){
                    toast.error("operation Failed....");
        }
        
    }

    return(
        <HomeLayout>
            <div className="h-[100vh] flex items-center justify-center">
                <form onSubmit={OnFormSubmit} noValidate className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]">
                    <h1 className="text-3xl font-semibold">
                            Contact Form
                    </h1>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="name" className="font-xl font-semibold">
                            Name
                        </label>
                         <input type="text"
                            required
                            placeholder="Enter Your Name..."
                            id="name"
                            name="name"
                            onChange={handleInputChange}
                            value={inputdata.name}
                            className="bg-transparent border px-2 py-1 rounded-sm"
                         />   
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="email" className="font-xl font-semibold">
                           Email
                        </label>
                         <input type="email"
                            required
                            placeholder="Enter your Email..."
                            id="email"
                            name="email"
                            onChange={handleInputChange}
                            value={inputdata.email}
                            className="bg-transparent border px-2 py-1 rounded-sm"
                         />   
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                        <label htmlFor="message" className="font-xl font-semibold">
                            Message
                        </label>
                         <textarea 
                            required
                            placeholder="Enter your message..."
                            id="message"
                            name="message"
                            onChange={handleInputChange}
                            value={inputdata.message}
                            className="bg-transparent border px-2 py-1 rounded-sm h-40"
                         />   
                    </div>
                    <button type="submit" 
                    className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer">
                            Submit
                    </button>
                </form>
            </div>  
        </HomeLayout>
    )

}

export default Contact