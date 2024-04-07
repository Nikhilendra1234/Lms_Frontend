import { useState } from 'react';
import toast from 'react-hot-toast'
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsPersonCircle } from 'react-icons/bs';
import {useDispatch,useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout';
import { getUserData, updateUser } from '../../Redux/Slices/AuthSlice';
function EditProfile(){

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const[data,setData]=useState({
        fullName:"",
        previewImage:"",
        avatar:undefined,
        userId:useSelector(state=>state?.auth?.data?._id)
    });

    const handleUserInput=(e)=>{
        const{name,value}=e.target;
        setData({
            ...data,
            [name]:value
        });
    }

    const handleImageUpload=(e)=>{
        e.preventDefault();
        const uploadedImage=e.target.files[0];
        if(uploadedImage){
            const fileReader=new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load",function(){
                setData({
                    ...data,
                    previewImage:this.result,
                    avatar:uploadedImage
                });
            })
        }
    }

    const onFormSubmit=async(e)=>{
        e.preventDefault();
        if(!data.fullName || !data.avatar){
            toast.error("All fields are required");
        }
        const formdata=new FormData();
        formdata.append("fullName",data.fullName);
        formdata.append("avatar",data.avatar);

        await  dispatch(updateUser([data.userId,formdata]));

        await dispatch(getUserData());

        navigate('/user/profile');
    }

    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form 
                    onSubmit={onFormSubmit}
                    className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-80 min-h-[26rem] shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-semibold">Edit profile</h1>
                    <label  htmlFor="image_uploads"className="cursor-pointer">
                        {
                            data.previewImage?(
                                <img src={data.previewImage} alt="user image"
                                className="w-28 h-28 rounded-full m-auto" />
                            ):(
                                <BsPersonCircle 
                                className="w-28 h-28 rounded-full m-auto"/>
                            )
                        }
                    </label>
                    <input type="file"
                        id='image_uploads'
                        name='image_uploads'
                        className='hidden'
                        accept='.jpg , .jpeg , .webp , .png , .svg'
                        onChange={handleImageUpload}
                        value={data.previewImage}
                    />
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="fullName"
                        className="text-lg font-semibold">
                            Full Name
                        </label>
                        <input type="text"
                            required
                            id='fullName'
                            name='fullName'
                            className="bg-transparent px-2 py-1 border"
                            placeholder='Enter Your Name..'
                            onChange={handleUserInput}
                            value={data.fullName}
                        />
                    </div>
                    <button type='submit'
                   className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-2 text-lg cursor-pointer" >
                        Update Profile
                    </button>
                    <Link to="/user/profile">
                    <p className="link text-accent cursor-pointer flex items-center justify-center w-full gap-2">
                        <AiOutlineArrowLeft/>Go Back To Profile
                    </p>
                    </Link>
                </form>
            </div>
        </HomeLayout>
    )
}

export default EditProfile