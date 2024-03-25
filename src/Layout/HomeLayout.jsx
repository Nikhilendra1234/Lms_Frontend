import {AiFillCloseCircle} from 'react-icons/ai'
import {FiMenu}from 'react-icons/fi'
import {Link} from 'react-router-dom'

import Footer from '../Components/Footer.jsx'

// eslint-disable-next-line react/prop-types
function HomeLayout({children}){


    const changeWidth=()=>{
        const drawer=document.getElementsByClassName("drawer-side");
        drawer[0].style.width="auto";
    }

    const hideDrawer=()=>{
        const toggle=document.getElementsByClassName("drawer-toggle");
        toggle[0].checked=false;

        const drawerSide= document.getElementsByClassName("drawer-side");
        drawerSide[0].style.width='0';
    }

return(
    <div className="min-h-[90vh]">
        <div className="drawer absolute left-0 z-50 w-fit">
                <input className="drawer-toggle" id="my-drawer" type="checkbox" />
                <div className="drawer-content">
                        <label htmlFor="my-drawer" className="relative cursor-pointer">
                        <FiMenu 
                            onClick={changeWidth}
                            size={"32px"}
                            className="text-white font-bold m-4"
                        />
                        </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" className="drawer-overlay">
                    </label>
                    <ul className="menu p-4 w-48 sm:w-80 bg-base-200 text-base-content relative">
                        <li className='w-fit absolute right-2 z-50'>
                            <button onClick={hideDrawer}>
                                    <AiFillCloseCircle 
                                        size={"24px"}
                                    />
                            </button>
                        </li>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/courses">All Courses</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact Us</Link>
                        </li>
                        <li>
                             <Link to="/about">About Us</Link>
                        </li>
                    </ul>
                </div>
        </div>  
        {children}
        
        <Footer />
    </div>
)

}

export default HomeLayout