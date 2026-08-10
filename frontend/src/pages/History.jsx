import { useEffect, useState } from "react";
import { RESUME_API } from "../api/resumeApi";
import { Link } from "react-router-dom"
import { ChevronRight, FileText, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

let History =()=>{

    let [history, setHistory] = useState([]);
    let [loading, setLoading] = useState(true);
    let accessToken = localStorage.getItem("accessToken");

    useEffect(()=>{
        let fetchHistory = async()=>{
            setLoading(true);
            try
            {
                let response = await RESUME_API.get("/getHistory");
                console.log(response);
                setHistory(response.data.history);

            }
            catch(error)
            {
                console.log(error);
            }
            finally
            {
                setLoading(false);
            }
        }
        fetchHistory();
    },[])

    let handleDelete =async(id, event)=>{
        event.preventDefault();
        event.stopPropagation();
        try
        {
            let response = await RESUME_API.delete(`/${id}`)
            setHistory((oldHistory)=> oldHistory.filter((resume) => resume._id !== id));
            toast.success(response.data.message);
        }
        catch(error)
        {
            console.log(error.response.data);
            toast.error(error.response.data.message);
        }
    }

    return (
        <div className="bg-[#11121d] min-h-screen">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
                <div className="mb-10">
                    <p className="text-sm uppercase tracking-widest text-[#3ee0c4] font-semibold mb-3">history</p>
                    <h1 className="text-3xl sm:text-4xl text-[#faf6ee] font-medium mb-2 font-serif">Past analyses</h1>
                </div>
                <div className="flex flex-col gap-4">
                    {
                        loading ? <h1>Loading...</h1> :
                            (
                                history.length == 0 ? 
                                    (
                                        <div className="rounded-3xl border border-dashed border-[#262a42] p-10 text-center text-[#faf6ee66] h-full flex items-center justify-center font-medium">
                                            No analyses yet.
                                            { "  " } 
                                            <Link to="/dashboard" className="text-[#3ee0c4] ml-2 hover:underline">Scan your first resume</Link>.
                                        </div>
                                    ) : 
                                    (
                                        history.map((historyItem)=>(
                                            <Link to={`/history/${historyItem._id}`} key={historyItem._id} className="bg-[#171a2b] p-4 border border-[#8d8a8b] hover:border-[#3ee0c4] rounded-3xl flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <FileText className="text-[#8d8a8b] shrink-0" size={18} />
                                                    <div className="flex flex-col gap-1">
                                                        <h1 className="text-[#faf6ee] font-medium">{historyItem.fileName}</h1>
                                                        <p className="text-[#8d8a8b] ">{new Date(historyItem.createdAt).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-row gap-4 shrink-0 items-center justify-between">
                                                    <span className="text-[#3ee0c4] font-xl font-medium">{ historyItem.atsScore }</span>
                                                    <button
                                                        onClick={(event)=>handleDelete(historyItem._id, event)}
                                                        className="text-muted text-[#8d8a8b] cursor-pointer hover:text-rose-400 transition-colors"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                    <ChevronRight size={16} className="text-[#8d8a8b] group-hover:text-teal transition-colors" />
                                                </div>
                                            </Link>
                                        ))
                                    )
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default History;