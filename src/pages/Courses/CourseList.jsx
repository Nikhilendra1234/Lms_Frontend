import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"

import CourseCard from "../../Components/CourseCard.jsx";
import HomeLayout from "../../Layout/HomeLayout.jsx"
import { getAllCourses } from "../../Redux/Slices/CourseSlice.js";

function CourseList(){
    const dispatch=useNavigate();

    const {coursedata}=useSelector(state=>state.course);
    
    async function loadCourse(){
       await dispatch(getAllCourses());
    }

    useEffect(()=>{
        loadCourse();
    },[]);
    
    return(
    <HomeLayout>
        <div className="min-h-[90vh] flex flex-col gap-10 pt-12 pl-20 text-white">
                <h1 className="text-center text-3xl font-semibold mb-5 font-3xl">
                    Explore courses made by {" "}
                    <span className="font-bold text-3xl text-yellow-500">industry experts</span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14 ">
                    {
                        coursedata?.map(element=>{
                            return <CourseCard key={element._id} data={element}/>
                        })
                    }
                </div>
        </div>
    </HomeLayout>
    )

}

export default CourseList