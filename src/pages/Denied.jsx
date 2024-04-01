
import { useNavigate} from "react-router-dom";

function Denied(){
    const navigate=useNavigate();
    return(
        <div className="w-full flex flex-col justify-center items-center h-screen bg-[#1A2238]">
            <h1 className="font-extrabold text-white text-9xl tracking-widest">
                403
            </h1>
            <div className="bg-black px-2 text-sm rounded rotate-12 text-white absolute border-1 border-white">
              Access Denied ....
            </div>
            <button className="mt-5">
                <a  className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus:ring">
                    <span  onClick={()=>navigate(-1)} className="relative block px-8 py-3 bg-[#1A2238] border border-current">
                        Go Back
                    </span>
                </a>
            </button>
        </div>
    ); 
}

export default Denied