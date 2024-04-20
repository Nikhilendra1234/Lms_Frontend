import { useEffect,  useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom"

import HomeLayout from "../../Layout/HomeLayout"
import { addCourseLecture } from "../../Redux/Slices/LectureSlice";

function AddLecture(){

    const navigate=useNavigate();
    const dispatch=useDispatch();

    const courseDetails=useLocation().state;

    const [userInput,setUserInput]=useState({
        id:courseDetails._id,
        lecture:undefined,
        title:"",
        description:"",
        videoSrc:""
    });

    const handleUserInput=(e)=>{
        const {name,value}=e.target;
        setUserInput({
            ...userInput,
            [name]:value
        });
    }

    const handleVideo=(e)=>{
        const video=e.target.files[0];
        const src=window.URL.createObjectURL(video);
        setUserInput({
            ...userInput,
            lecture:video,
            videoSrc:src
        })

    }

    async function onFormSubmit(e){
            e.preventDefault();
            
            if(!userInput.title || !userInput.lecture || !userInput.description){
                toast.error("All fields are required");
                return
            }

            const response=await dispatch(addCourseLecture(userInput));
            if(response?.payload?.success){
                navigate(-1);
                setUserInput({
                    id:courseDetails._id,
                    lecture:undefined,
                    title:"",
                    description:"",
                    videoSrc:""

                })
            }
    }

    useEffect(()=>{
        if(!courseDetails){
            navigate('/courses');
        }
    },[])

    return(
        <HomeLayout>
            
            <div className="min-h-[90vh] text-white flex flex-col items-center justify-center gap-10 mx-16">
                <div className="flex flex-col gap-5 p-2 shadow-[0_0_10px_black] w-96 rounded-lg">
                    <header className="flex items-center justify-center relative">
                        <button
                         className="absolute left-2 text-xl text-green-500"
                         onClick={() => navigate(-1)}>
                          <AiOutlineArrowLeft/>
                        </button>
                        <h1 className="text-xl text-yellow-500 font-semibold"> 
                            Add New Lecture
                        </h1>
                    </header>
                    <form  
                    onSubmit={onFormSubmit} className="flex flex-col gap-3">
                        <input 
                            type="text"
                            placeholder="Enter Your Course Title"
                            name="title"
                            className="bg-transparent px-3 py-1 border"
                            onChange={handleUserInput}
                            value={userInput.title}
                        />
                        <textarea 
                            name="description"
                            type='text'
                            className="bg-transparent px-3 py-1 border resize-none overflow-y-scroll h-36"
                            placeholder="Enter description of your lecture"
                            onChange={handleUserInput}
                            value={userInput.description}
                        />
                        {
                            userInput.videoSrc ?(
                                <video 
                                src={userInput.videoSrc}
                                muted
                                controls
                                controlsList="ondownload nofullscreen"
                                disablePictureInPicture
                                className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                                >                                    
                                </video>
                            ):(
                            <div className="h-48 border flex items-center justify-center cursor-pointer">
                                <label  className="font-semibold text-cl cursor-pointer" htmlFor="lecture">Choose your video</label>
                                <input type="file"
                                id="lecture"
                                name="lecture"
                                className="hidden"
                                onChange={handleVideo}
                                accept="video/mp4 video/x-mp4 "
                                />
                            </div>
                            )
                        }
                        <button type="submit" className="btn btn-primary py-1 font-semibold text-lg">
                            Add New Lecture
                        </button>
                    </form>
                </div>
            </div>

        </HomeLayout>
    )
}

export default AddLecture