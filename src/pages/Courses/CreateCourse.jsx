import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom";

import HomeLayout from "../../Layout/HomeLayout"
import { createNewCourse } from "../../Redux/Slices/CourseSlice";
function CreateCourse(){

        const dispatch=useDispatch();
        const navigate=useNavigate();

        const[userInput,setUserInput]=useState({
            title:"", 
            createdBy:"",
            category:"",
            description:"",
            previewImage:"",
            thumbnail:null
        });

        const handleUserInput=(e)=>{
            const {name,value}=e.target;
            setUserInput({
                ...userInput,
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
                    setUserInput({
                        ...userInput,
                        thumbnail:uploadedImage,
                        previewImage:this.result
                    })
                })

            }
        }

        const onFormSubmit=async(e)=>{
            e.preventDefault();
            if(!userInput.title || !userInput.createdBy || !userInput.category || !userInput.description || !userInput.previewImage || !userInput.thumbnail){
                toast.error("All fields are required..");
                return;
            }
            const response=await dispatch(createNewCourse(userInput));
            if(response?.payload?.success){
                setUserInput({
                    title:"",
                    createdBy:"",
                    category:"",
                    description:"",
                    previewImage:"",
                    thumbnail:null
                })
                navigate('/courses');
            }
        }
    return(
        <HomeLayout>
            <div className="flex items-center justify-center h-[100vh]">
                <form  
                onSubmit={onFormSubmit}
                className="flex flex-col justify-center gap-5 rounded-lg p-4 text-white w-[700px] my-10 shadow-[0_0_10px_black] relative">
                    <Link to=''className="absolute top-8 text-2xl link text-accent cursor-pointer">
                        <AiOutlineArrowLeft />
                    </Link>

                    <h1 className="text-center text-2xl font-bold">
                            Create New Course
                    </h1>
                    
                    <main className="grid grid-cols-2 gap-x-10">
                        <div className="gap-y-6">
                            <div>
                                <label htmlFor="image_uploads" className="cursor-pointer">
                                    {userInput.previewImage?(
                                        <img 
                                        className="w-full h-44 m-auto border"
                                        src={userInput.previewImage} alt="thumabnail image"    
                                        />
                                    ):(
                                        <div className="w-full h-44 m-auto flex items-center justify-center border">
                                            <h1 className="font-bold text-lg">Upload your course thumbnail</h1>
                                        </div>
                                    )}
                                </label>
                                <input 
                                    type="file"
                                    id="image_uploads"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    accept=".jpg , .jpeg ,.png "
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-lg font-semibold" htmlFor="title">
                                    course title
                                </label>
                                <input 
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    onChange={handleUserInput}
                                    value={userInput.title}
                                    placeholder="Enter course title"
                                    className="bg-transparent px-2 py-1 border"
                                 />
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="category"
                                className="text-lg font-semibold">
                                    course category
                                </label>
                                <input
                                   type="text"
                                    required
                                    placeholder="Enter course category"
                                    className="bg-transparent px-2 py-1 border"
                                    id="category"
                                    name="category"
                                    onChange={handleUserInput}
                                    value={userInput.category}
                                 />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="description"
                                className="text-lg font-semibold">
                                    course Description
                                </label>
                                <input
                                   type="text"
                                    required
                                    placeholder="Enter course description"
                                    className="bg-transparent px-2 h-[24px] resize-none py-1 border"
                                    id="description"
                                    name="description"
                                    onChange={handleUserInput}
                                    value={userInput.description}
                                 />
                            </div>
                        </div>
                    </main>
                    <button type="submit" className="w-full py-2 rounded-sm font-semibold text-lg cursor-pointer bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300">
                        Create Course
                    </button>
                </form>
            </div>
        </HomeLayout>
    )
}

export default CreateCourse