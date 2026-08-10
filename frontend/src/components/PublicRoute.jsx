import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Navigate } from "react-router-dom";

let PublicRoute =({children})=>{
    let { isLoggedIn, loading } = useContext(AuthContext);

    if(loading)
    {
        return <h1>Loading...</h1>
    }

    if(isLoggedIn)
    {
        return <Navigate to="/dashboard" />
    }
    return children;
}

export default PublicRoute;