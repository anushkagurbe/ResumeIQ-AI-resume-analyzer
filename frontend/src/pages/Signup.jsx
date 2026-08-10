import { FileSearchCorner } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_API } from "../api/authApi";
import { useState } from "react";
import { toast } from "react-toastify";

let Signup =()=>{

    let [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })
    let [isSubmitting, setIsSubmitting] = useState(false);
    let [errors, setErrors] = useState({});

    let navigate = useNavigate();

    let handleChange =(event)=>{
        let { name, value } = event.target;
        setFormData((formData)=>({
            ...formData,
            [name]: value      
        }));
        setErrors((errors)=>({
            ...errors,
            [name]: ""
        }))
    }


    let handleSubmit = async(event)=>{
        event.preventDefault();
        setIsSubmitting(true);
        setErrors({});
        try
        {
            let response = await AUTH_API.post("/register", formData);
            toast.success(response.data.message);
            setFormData({
                name: "",
                email: "",
                password: ""
            });
            navigate("/login");
        }
        catch(error)
        {
            console.log(error?.response);
            if(error?.response?.data?.errors)
            {
                setErrors(error.response.data.errors);
                return ;
            }
            toast.error(error.response?.data?.message); 
        }
        finally
        {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-[calc(100vh-64px)] bg-[#11121d] flex items-center justify-center px-5 py-12">
            <div className="w-full max-w-md">
                <div className="flex flex-col items-center justify-center">
                    <Link to="/" className="flex items-center mb-4">
                        <span className="w-8 h-8 bg-zinc-900 border border-teal-700 group-hover:border-teal-400/60 transition-colors rounded-lg flex items-center justify-center">
                            <FileSearchCorner size={19} color="#3ee0c4"/>
                        </span>
                    </Link>
                    <h1 className="text-[#faf6ee] font-serif font-medium text-3xl">Create your account</h1>
                    <p className="text-[#8d8a8b] font-medium text-center mt-1">Get AI-scored resume feedback in seconds.</p>

                    <div className="bg-[#fbf6ef] rounded-3xl p-6 sm:p-8 mt-4 w-full">
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm block text-[#4f4d57]" htmlFor="name">Full Name</label>
                                <input 
                                    className="w-full border border-[#e3e2df] rounded-2xl px-4 py-3 text-sm focus:border-teal-700 focus:outline-none" 
                                    type="text" 
                                    id="name" 
                                    name="name"
                                    onChange={handleChange}
                                    value={formData.name}
                                    placeholder="Jane Doe" 
                                />
                                <span className="text-sm text-[#4f4d57]">{errors && errors.name}</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm block text-[#4f4d57]" htmlFor="email">Email</label>
                                <input 
                                    className="w-full border border-[#e3e2df] rounded-2xl px-4 py-3 text-sm focus:border-teal-700 focus:outline-none" 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    onChange={handleChange}
                                    value={formData.email}
                                    placeholder="your@gmail.com" 
                                />
                                <span className="text-sm text-[#4f4d57]">{errors && errors.email}</span>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm block text-[#4f4d57]" htmlFor="password">Password</label>
                                <input 
                                    className="w-full border border-[#e3e2df] rounded-2xl px-4 py-3 text-sm focus:border-teal-700 focus:outline-none" 
                                    type="password" 
                                    id="password" 
                                    name="password"
                                    onChange={handleChange}
                                    value={formData.password}
                                    placeholder="********" 
                                />
                                <span className="text-sm text-[#4f4d57]">{errors && errors.password}</span>
                            </div>

                            <button type="submit" className="bg-[#11121d] font-semibold rounded-full px-4 py-3 text-center text-[#faf6ee] cursor-pointer hover:bg-[#11121d]/90"
                                disabled={isSubmitting}
                            >
                                { !isSubmitting ? "Create account" : "Creating account..."}
                            </button>

                        </form>

                        <p className="text-sm text-[#4f4d57] text-center mt-6">
                            Already have an account? {"   "}
                            <Link to="/login" className="text-teal-700 font-semibold">
                                Login
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup;