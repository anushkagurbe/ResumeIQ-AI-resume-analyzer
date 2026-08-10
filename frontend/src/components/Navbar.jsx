import { Link, NavLink, useNavigate } from "react-router-dom";
import { FileSearchCorner, LogOutIcon, Menu, X } from "lucide-react";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

let Navbar=()=>{

    let { isLoggedIn, logout } = useContext(AuthContext);
    let [isMobileOpen, setIsMobileOpen] = useState(false);
    let navigate = useNavigate();

    let handleLogout = async()=>{
        await logout();
        navigate("/login", {
            replace: true
        })
    }

    return (
        <header className="bg-[#13151e] sticky z-40 top-0 border-b border-teal-700/40">

            <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
                 <Link to="/" className="flex flex-row gap-2 group">
                    <span className="w-8 h-8 bg-zinc-900 border border-teal-700 group-hover:border-teal-400/60 transition-colors rounded-lg flex items-center justify-center">
                        <FileSearchCorner size={19} color="#3ee0c4"/>
                    </span>
                    <span className="text-xl text-[#faf6ee] font-serif font-medium">
                        Resume<span className="text-[#3ee0c4]">IQ</span>
                    </span>
                 </Link>

                { isLoggedIn && <div className="hidden sm:flex items-center gap-4">
                    <NavLink to="/dashboard" className={({isActive})=> `font-medium text-md
                        ${isActive ? 'text-[#3ee0c4]' : 'text-[#8d8a8b]'}`}>
                        Analyze
                    </NavLink>
                    <NavLink to="/history" className={({isActive})=> `font-medium text-md
                        ${isActive ? 'text-[#3ee0c4]' : 'text-[#8d8a8b]'}`}>
                        History
                    </NavLink>  
                </div>}

                 <div className="hidden sm:flex items-center gap-4 justify-between">
                    { 
                        !isLoggedIn ?
                        <>
                            <Link to="/login" className="font-medium text-md text-[#8d8a8b] hover:text-white">
                                Log in
                            </Link>
                            <Link to="/signup" className="font-semibold text-md bg-[#3ee0c4] rounded-full px-4 py-2 text-[#0e2027] hover:bg-[#84e4d4]">
                                Get started
                            </Link>  
                        </>
                        :
                        <Link onClick={handleLogout} className="font-medium text-md text-[#8d8a8b] hover:text-white flex items-center gap-2">
                            <LogOutIcon size={18} />
                            Logout
                        </Link>
                    }
                 </div>
                 <button className="block sm:hidden text-[#faf6ee] cursor-pointer" onClick={()=>setIsMobileOpen((isMobileOpen)=>!isMobileOpen)}>
                    {
                        isMobileOpen ? <X size={22} /> : <Menu size={22} />
                    }
                 </button>
            </div>

            {
                isMobileOpen && 
                (
                    <div className="flex sm:hidden flex-col gap-4 border-t border-teal-700/40 p-4">
                        {
                            isLoggedIn ? (
                                <>
                                    <NavLink to="/dashboard" onClick={()=>setIsMobileOpen(false)} className={({isActive})=> `font-medium text-md
                                        ${isActive ? 'text-[#3ee0c4]' : 'text-[#8d8a8b]'}`}>
                                        Analyze
                                    </NavLink>
                                    <NavLink to="/history" onClick={()=>setIsMobileOpen(false)} className={({isActive})=> `font-medium text-md
                                        ${isActive ? 'text-[#3ee0c4]' : 'text-[#8d8a8b]'}`}>
                                        History
                                    </NavLink> 
                                    <Link onClick={()=>{
                                            handleLogout();
                                            setIsMobileOpen(false)
                                        }} className="font-medium text-md text-[#8d8a8b] hover:text-white flex items-center gap-2">
                                            <LogOutIcon size={18} />
                                            Logout
                                    </Link>
                                </>
                            ) : 
                            (
                                <>
                                    <Link to="/login" onClick={()=>setIsMobileOpen(false)} className="font-medium text-md text-[#8d8a8b] hover:text-white">
                                        Log in
                                    </Link>
                                    <Link to="/signup" onClick={()=>setIsMobileOpen(false)} className="font-semibold text-md bg-[#3ee0c4] rounded-full px-4 py-2 text-[#0e2027] hover:bg-[#84e4d4]">
                                        Get started
                                    </Link>  
                                </>
                            )
                        }
                    </div> 
                )
            }

        </header>
    )
}


export default Navbar;