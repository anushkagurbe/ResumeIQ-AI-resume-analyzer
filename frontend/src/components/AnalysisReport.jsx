import { AlertTriangle, CheckCircle2, PenLine, Sparkles, XCircle } from "lucide-react";

let AnalysisReport =({analysis})=>{
    return (
        <div className="flex flex-col gap-5">

            <div className="flex sm:flex-row flex-col bg-[#171a2b] border rounded-3xl border-teal-700/40 p-6 gap-5">
                <div className="self-center sm:self-auto">
                    <div className="h-35 w-35 rounded-full border border-5 border-[#3ee0c4] flex items-center justify-center flex-col gap-1">
                        <h1 className="text-[#3ee0c4] text-4xl font-medium text-center">{analysis.resume.atsScore}</h1>
                        <p className="text-[#8d8a8b]">/ 100</p>
                    </div>
                    <p className="text-[#8d8a8b] text-center mt-2 font-medium">ATS Score</p>
                </div>
                <div>
                    <p className="text-sm uppercase tracking-widest text-[#3ee0c4] font-semibold mb-3">Summary</p>
                    <p className="text-[#8d8a8b] text-center mt-2 font-medium text-start">{analysis.resume.overallSummary}</p>
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
                            analysis.resume.strengths.length > 0 ? 
                            (
                                analysis.resume.strengths.map((strength, index)=>(
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
                            analysis.resume.improvementAreas.length > 0 ? 
                            (
                                analysis.resume.improvementAreas.map((improvementArea, index)=>(
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
                            analysis.resume.matchedSkills.length > 0 ? 
                            (
                                analysis.resume.matchedSkills.map((matchedSkill, index)=>(
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
                            analysis.resume.missingSkills.length > 0 ? 
                            (
                                analysis.resume.missingSkills.map((missingSkill, index)=>(
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
                        analysis.resume.grammarSuggestions.length > 0 ? 
                        (
                            analysis.resume.grammarSuggestions.map((grammarSuggestion, index)=>(
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
    )
}

export default AnalysisReport;