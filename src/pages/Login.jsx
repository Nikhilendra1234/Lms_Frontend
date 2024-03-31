import { useState } from "react";
import toast from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";

import HomeLayout from "../Layout/HomeLayout";
import login from '../Redux/Slices/AuthSlice.js'
function Login(){
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const[logindata,setLogindata]=useState({
        email:"",
        password:"",
    });

//method to handle on change event of the userinput
    const handleOnChange=(e)=>{
        const{name,value}=e.target;
        setLogindata({
            ...logindata,
            [name]:value
        });
    }

    //validating data and creating new account
    const handleOnLogin=async(e)=>{
        e.preventDefault();

        //check if all the field are filled or not
        if(!logindata.name || !logindata.email){
            toast.error("Fill all the fields...");
            return;
        }

        //dispatch the createAccount action
        const response=await dispatch(login(logindata));

        if(response?.payload?.success)
            navigate('/');

        setLogindata({
            email:"",
            password:"",
        });

    }
    return(
        <HomeLayout>
          <div className="flex overflow-x-auto items-center justify-center h-[100vh]">
            <form noValidate onSubmit={handleOnLogin} className="flex flex-col justify-center gap-3 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                <h1 className="text-center text-2xl font-bold">Login Page</h1>
                <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="font-semibold">Email</label>
                        <input type="text" 
                          required
                          id="email"
                          name="email"
                          className="bg-transparent px-2 py-1 border"
                          placeholder="Enter Your Email..."
                          onChange={handleOnChange}
                          value={logindata.email}
                        />
                </div>
                <div className='flex flex-col gap-1'>
                        <label htmlFor="password" className='font-semibold'> Password </label>
                        <input 
                            type="password" 
                            required
                            name="password"
                            id="password"
                            placeholder="Enter your password.."
                            className="bg-transparent px-2 py-1 border"
                            onChange={handleOnChange}
                            value={logindata.password}
                        />
                 </div>
                 <button type="submit"  className='mt-2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer'>
                      Login
                 </button>
                 <p className="text-center">
                    Do not have an account ? <Link to='/signup' className="link text-accent cursor-pointer">SignUp</Link> 
                 </p>
            </form>
         </div>  
        </HomeLayout>
    );
}

export default Login