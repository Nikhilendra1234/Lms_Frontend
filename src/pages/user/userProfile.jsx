// import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast";
import {useDispatch, useSelector} from "react-redux"
import {Link, useNavigate} from 'react-router-dom'

import HomeLayout from "../../Layout/HomeLayout.jsx"
import { getUserData } from "../../Redux/Slices/AuthSlice.js";
import { cancelCourseBundle } from "../../Redux/Slices/RazorpaySlice.js";
function Profile(){

    const  dispatch=useDispatch();
    const navigate=useNavigate();
    const  userdata=useSelector(state=>state?.auth);

    async function handleCancellation(){
        toast("initiating cancellation");
        await dispatch(cancelCourseBundle());
        await dispatch(getUserData());
        toast.success("Cancellation completed..");
        navigate('/');
    }

    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex items-center justify-center">
                <div className="my-10 flex flex-col gap-4 rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <img 
                    className="w-40 m-auto rounded-full border border-black"
                    src={userdata?.avatar?.secure_url} 
                    alt="user avatar" 
                    />
                    <h3  className="text-xl font-semibold text-center capitalize">
                        {userdata?.fullName}
                    </h3>
                    <div className="grid grid-cols-2">
                        <p>Email :</p><p>{userdata?.email}</p>
                        <p>Role :</p><p>{userdata?.role}</p>
                        <p>Subscription :</p>
                        <p>{userdata?.subscription?.status ==="active"?"Active":"Inactive"}</p>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                        <Link to='/changepassword'
                        className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                        <button>Change Password</button>
                        </Link>
                        <Link to='user/editprofile'
                        className="w-1/2 bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center"
                        >
                        <button>Edit Profile</button>
                        </Link>
                    </div>
                    {
                     userdata?.subscription?.status==="active"  && (
                        <button onClick={handleCancellation}
                        className="w-full bg-red-600 hover:bg-red-500 transition-all ease-in-out duration-300 rounded-sm font-semibold py-2 cursor-pointer text-center">
                            Cancel Subscription
                        </button>
                    )}
                </div>
            </div>
        </HomeLayout>
    )
}

export default Profile