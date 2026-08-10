import { FileText, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import { RESUME_API } from "../api/resumeApi";
import AnalysisReport from "../components/AnalysisReport";
import { toast } from "react-toastify";

let Dashboard =()=>{

    let inputRef = useRef(null);
    let [resume, setResume] = useState(null);
    let [description, setDescription] = useState("");
    let [analysis, setAnalysis] = useState(null);
    let [isSubmitting, setIsSubmitting] = useState(false);

    let handleFileChange =(e)=>{
        let selectedFile = e.target.files[0];
        if(!selectedFile)
        {
            return ;
        }
        let allowedFileTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain",
        ]
        if(!allowedFileTypes.includes(selectedFile.type))
        {
            alert("Only PDF, DOCX and TXT files are allowed.");
            return ;
        }
        setResume(selectedFile);
    }

    let removeFile = ()=>{
        setResume(null);
        inputRef.current.value =null;
    }

    let handleSubmit =async()=>{
        setIsSubmitting(true);
        let formData = new FormData();

        formData.append("resume", resume);
        formData.append("jobDescription", description);

        try
        {
            let accessToken = localStorage.getItem("accessToken");
            let response = await RESUME_API.post("/analyze", formData, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            })
            console.log(response.data);
            setAnalysis(response.data);
            // alert("analysis completed");
        }
        catch(error)
        {
            console.log(error.response);
            toast.error(error.response.data.message);
        }
        finally
        {
            setIsSubmitting(false);
        }

    }

    return (
        <div className="bg-[#11121d]">
            <div className="max-w-5xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
                <div className="mb-10">
                    <p className="text-sm uppercase tracking-widest text-[#3ee0c4] font-semibold mb-3">Analyze</p>
                    <h1 className="text-3xl sm:text-4xl text-[#faf6ee] font-medium mb-2 font-serif">Scan a resume</h1>
                    <p className="max-w-lg text-[#8d8a8b] font-medium text-md">Upload a resume to get an ATS score, missing skills, grammar notes, and a job-match breakdown.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="bg-[#faf6ee] p-6 sm:p-8 rounded-xl">
                        <h2 className="font-serif text-2xl mb-1">Scan your resume</h2>
                        <p className="text-[#8d8a8b] text-sm mb-6">PDF, DOCX, or TXT — under 5MB.</p>

                        {
                            !resume ?
                            <div className="flex flex-col items-center border-2 border-dashed border-[#b0adae] p-8 sm:p-12      hover:border-[#8d8a8b] cursor-pointer rounded-lg" 
                                onClick={()=> inputRef.current.click()}
                            >
                            <input 
                                type="file" 
                                ref={inputRef}
                                accept=".pdf,.doc,.docx,.txt"
                                hidden
                                onChange={handleFileChange}
                            />

                            <UploadCloud size={32} color="rgb(16 18 28 / 0.4)" className="mb-2 mx-auto" />
                            <p className="font-medium text-[#10121ccc] text-center">Drop your resume here, or click to browse</p>
                            <p className="text-xs text-[#10121c66] text-center mt-1">One file at a time</p>
                            </div> :
                            <div className="flex rounded-xl border border-black/10 p-4 justify-between items-center">
                                <div className="flex gap-4">
                                    <FileText size={20} color="#3ee0c4" className="flex-shrink-0" />
                                    <span className="truncate text-sm font-medium text-[#10121ccc]">{resume.name}</span>
                                </div>
                                <div>
                                    <button className="cursor-pointer flex items-center justify-between text-[#7f7f81] hover:text-rose-500 flex-shrink-0"
                                    onClick={removeFile}
                                    >
                                        <X size={18} className=""/>
                                    </button>
                                </div>
                                
                            </div>
                        }

                        <label className="block mt-6 mb-2 text-sm font-medium text-[#10121cb2]">Job description <span class="text-[#10121c66] font-normal">(optional — improves match scoring)</span></label>
                        <textarea rows="4" placeholder="Paste the job posting to see how well you match it…" className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3 text-sm text-[#10121ccc] placeholder:text-[#10121c66] focus:border-teal-dim focus:outline-none resize-none"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        ></textarea>

                        <button 
                            className="cursor-pointer mt-6 w-full rounded-full bg-[#10121c] text-[#faf6ee] font-semibold py-3.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-ink/90 transition-colors flex items-center justify-center gap-2"
                            disabled={ !resume || !description.trim() }
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                        >
                            { isSubmitting ? 'Analyzing' : 'Analyze Resume'}
                        </button>
                    </div>

                    <div>
                        {
                            !analysis ?
                            <div className="rounded-3xl border border-dashed border-[#262a42] p-10 text-center text-[#faf6ee66] h-full flex items-center justify-center font-medium">
                            Your analysis will appear here once you scan a resume.
                            </div> :
                            <AnalysisReport analysis={analysis} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;