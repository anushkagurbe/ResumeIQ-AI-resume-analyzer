import { useEffect } from "react";
import { AlertTriangle, CheckCircle2, PenLine, Sparkles, XCircle, ArrowLeft, DownloadIcon } from "lucide-react";
import { RESUME_API } from "../api/resumeApi";
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";

let AnalysisDetails =()=>{

    let [analysis, setAnalysis] = useState(null);
    let accessToken = localStorage.getItem("accessToken");
    let [loading, setLoading] = useState(true);
    let { id } = useParams();
    let [isDownloading, setIsDownloading] = useState(false);

    useEffect(()=>{
        let fetchDetails =async()=>{
            setLoading(true);
            try
                {
                    let response = await RESUME_API.get(`/${id}`, {
                        headers: {
                            "Authorization": `Bearer ${accessToken}`
                        }
                    })
                    console.log(response.data);
                    setAnalysis(response.data.analysisDetails);
                }
                catch(error)
                {
                    console.log(error.response.data);
                }
                finally
                {
                    setLoading(false);
                }
        }
        fetchDetails();

    },[id])

    let downloadAnalysis = async()=>{
        setIsDownloading(true);
        try
        {
            // await new Promise(resolve => setTimeout(resolve, 5000));
            let response = await RESUME_API.get(`/download/${id}`,{
                responseType: "blob"
            });
            let url = window.URL.createObjectURL(response.data);

            let link = document.createElement("a");

            link.href = url;
            link.download = "ResumeIQ-Analysis-Report.pdf";

            link.click();

            window.URL.revokeObjectURL(url);
        }
        catch(error)
        {
            console.log(error);
            toast.error("Unable to download the report")
        }
        finally
        {
            setIsDownloading(false);
        }
    }

    return (
        <div className="bg-[#11121d]">
            <div className="max-w-4xl mx-auto px-5 sm:px-8 py-10 sm:py-14">
                {
                    loading ? <h1 className="h-screen text-[#faf6ee]">Loading...</h1> :
                    <div className="flex flex-col gap-5">

                        <Link to="/history" className="inline-flex items-center text-[#8d8a8b] gap-2 text-sm font-medium hover:text-[#faf6ee] mb-4">
                            <ArrowLeft size={15} /> Back to history
                        </Link>

                        <div className="flex items-center justify-between gap-3 sm:flex-row flex-col">
                            <h1 className="font-serif text-xl sm:text-3xl mb-2 truncate text-[#faf6ee]">{analysis.fileName}</h1>
                            <button onClick={downloadAnalysis} className="text-[#faf6ee] border border-[#8d8a8b] hover:border-[#3ee0c4] rounded-xl px-4 py-2 flex items-center justify-between gap-3 cursor-pointer" disabled={isDownloading}>
                                {
                                    isDownloading ? `Downloading...` : <>Download report <DownloadIcon/></>
                                }
                            </button>
                        </div>

                        <div className="flex sm:flex-row flex-col bg-[#171a2b] border rounded-3xl border-teal-700/40 p-6 gap-5">
                            <div className="self-center sm:self-auto">
                                <div className="h-35 w-35 rounded-full border border-5 border-[#3ee0c4] flex items-center justify-center flex-col gap-1">
                                    <h1 className="text-[#3ee0c4] text-4xl font-medium text-center">{analysis.atsScore}</h1>
                                    <p className="text-[#8d8a8b]">/ 100</p>
                                </div>
                                <p className="text-[#8d8a8b] text-center mt-2 font-medium">ATS Score</p>
                            </div>
                            <div>
                                <p className="text-sm uppercase tracking-widest text-[#3ee0c4] font-semibold mb-3">Summary</p>
                                <p className="text-[#8d8a8b] text-center mt-2 font-medium text-start">{analysis.overallSummary}</p>
                            </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="bg-[#171a2b] border rounded-3xl border-teal-700/40 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 color="#3FE0C5" size={18} />
                                    <p className="text-sm font-semibold text-[#faf6ee]">Strengths</p>
                                </div>
                                <ul className="space-y-2">
                                    {
                                        analysis.strengths.length > 0 ? 
                                        (
                                            analysis.strengths.map((strength, index)=>(
                                                <li key={index} className="text-sm text-[#faf6ee] leading-relaxed flex gap-2">
                                                    <span className="text-[#faf6ee]">
                                                        —
                                                    </span>
                                                    <span>
                                                        {strength}
                                                    </span>
                                                </li>
                                            ))
                                        ) : <p className="text-sm text-[#8d8a8b] font-medium italic">No standout strengths detected.</p>
                                    }
                                </ul>
                            </div>
                            <div className="bg-[#171a2b] border rounded-3xl border-teal-700/40 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <AlertTriangle color="#F2B84B" size={18} />
                                    <p className="text-sm font-semibold text-[#faf6ee]">Improvement areas</p>
                                </div>
                                <ul className="space-y-2">
                                    {
                                        analysis.improvementAreas.length > 0 ? 
                                        (
                                            analysis.improvementAreas.map((improvementArea, index)=>(
                                                <li key={index} className="text-sm text-[#faf6ee] leading-relaxed flex gap-2">
                                                    <span className="text-[#8d8a8b]">
                                                        —
                                                    </span>
                                                    <span>
                                                        {improvementArea}
                                                    </span>
                                                </li>
                                            ))
                                        ) : <p className="text-sm text-[#8d8a8b] font-medium italic">Nothing major to flag.</p>
                                    }
                                </ul>
                            </div>
                            <div className="bg-[#171a2b] border rounded-3xl border-teal-700/40 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <Sparkles color="#3FE0C5" size={18} />
                                    <p className="text-sm font-semibold text-[#faf6ee]">Matched skills</p>
                                </div>
                                <ul className="space-y-2">
                                    {
                                        analysis.matchedSkills.length > 0 ? 
                                        (
                                            analysis.matchedSkills.map((matchedSkill, index)=>(
                                                <li key={index} className="text-sm text-[#faf6ee] leading-relaxed flex gap-2">
                                                    <span className="text-[#8d8a8b]">
                                                        —
                                                    </span>
                                                    <span>
                                                        {matchedSkill}
                                                    </span>
                                                </li>
                                            ))
                                        ) : <p className="text-sm text-[#8d8a8b] font-medium italic">No strong skill matches detected.</p>
                                    }
                                </ul>
                            </div>
                            <div className="bg-[#171a2b] border rounded-3xl border-teal-700/40 p-4">
                                <div className="flex items-center gap-2 mb-3">
                                    <XCircle color="#F2637B" size={18} />
                                    <p className="text-sm font-semibold text-[#faf6ee]">Missing skills</p>
                                </div>
                                <ul className="space-y-2">
                                    {
                                        analysis.missingSkills.length > 0 ? 
                                        (
                                            analysis.missingSkills.map((missingSkill, index)=>(
                                                <li key={index} className="text-sm text-[#faf6ee] leading-relaxed flex gap-2">
                                                    <span className="text-[#8d8a8b]">
                                                        —
                                                    </span>
                                                    <span>
                                                        {missingSkill}
                                                    </span>
                                                </li>
                                            ))
                                        ) : <p className="text-sm text-[#8d8a8b] font-medium italic">No missing skills detected — nicely covered.</p>
                                    }
                                </ul>
                            </div>
                        </div>
                        

                        <div className="bg-[#171a2b] border rounded-3xl border-teal-700/40 p-4">
                            <div className="flex items-center gap-2 mb-3">
                                <PenLine color="#F2637B" size={18} />
                                <p className="text-sm font-semibold text-[#faf6ee]">Grammar suggestions</p>
                            </div>
                            <ul className="space-y-2">
                                {
                                    analysis.grammarSuggestions.length > 0 ? 
                                    (
                                        analysis.grammarSuggestions.map((grammarSuggestion, index)=>(
                                            <li key={index} className="text-sm text-[#faf6ee] leading-relaxed flex gap-2">
                                                <span className="text-[#8d8a8b]">
                                                    —
                                                </span>
                                                <span>
                                                    {grammarSuggestion}
                                                </span>
                                            </li>
                                        ))
                                    ) : <p className="text-sm text-[#8d8a8b] font-medium italic">No grammar issues found.</p>
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default AnalysisDetails;