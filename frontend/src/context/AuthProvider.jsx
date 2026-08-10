import { useEffect, useState } from "react"
import { AUTH_API } from "../api/authApi";
import AuthContext from "./AuthContext";
import { toast } from "react-toastify";

export let AuthProvider = ({ children })=>{

    let [user, setUser] = useState(null);
    let [isLoggedIn, setIsLoggedIn] = useState(false);
    let [loading, setLoading] = useState(true);

    let login =(user, token)=>{
        setUser(user);
        setIsLoggedIn(true);
        localStorage.setItem("accessToken", token);
    }

    let logout =async()=>{
        try
        {
            let response = await AUTH_API.post("/logout");
            toast.success(response.data.message);
        }
        catch(error)
        {
            console.log(error);
        }
        finally
        {
            localStorage.removeItem("accessToken");
            setUser(null);
            setIsLoggedIn(false);
        }
    }

    
    useEffect(()=>{
        let accessToken = localStorage.getItem("accessToken");
        let getLoggedInUser = async()=>{
            if(!accessToken)
            {
                setUser(null);
                setIsLoggedIn(false);
                setLoading(false);
                return ;
            }

            try
            {
                let response = await AUTH_API.get("/get-me", {
                    headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }
                });
                console.log(response.data);
                setIsLoggedIn(true);
                setUser(response.data.data);
            }
            catch(error)
            {
                console.log(error);
                localStorage.removeItem("accessToken");
                setUser(null);
                setIsLoggedIn(false);
            }
            finally
            {
                setLoading(false);
            }
        }

        
        getLoggedInUser();

        window.addEventListener("auth:logout", logout);

        return ()=>{
            window.removeEventListener("auth:logout", logout);
        }
    },[])


    return (
        <AuthContext.Provider value={{ user, login, logout, loading, setUser, isLoggedIn }}>
            {
                children
            }
        </AuthContext.Provider>
    )
}