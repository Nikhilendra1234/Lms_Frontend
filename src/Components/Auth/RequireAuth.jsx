import { useSelector } from "react-redux"
import { Navigate,Outlet } from "react-router-dom"

// eslint-disable-next-line react/prop-types
function RequiereAuth({allowedrole}){

    const {isLoggedIn,role}=useSelector(state=>state.auth);
   
    // eslint-disable-next-line react/prop-types
    return isLoggedIn && allowedrole.find(myRole=>myRole==role) ?(
        <Outlet />
    ):isLoggedIn?(<Navigate to="/denied"/>):(<Navigate to="/login"/>)
}

export default RequiereAuth