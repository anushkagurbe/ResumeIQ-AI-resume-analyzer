import { HistoryIcon, ListChecks, PenLine, ScanLine, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';
import atsScanGif from "../assets/ats_scan.gif";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

let features = [
    {
        icon: ScanLine,
        title: "ATS scoring",
        desc: "See exactly how applicant tracking systems will parse and rank your resume, out of 100.",
    },
    {
        icon: ListChecks,
        title: "Missing skills",
        desc: "Spot the keywords and skills your resume is missing for the role you're targeting.",
    },
    {
        icon: PenLine,
        title: "Grammar & wording",
        desc: "Line-level suggestions to tighten phrasing and cut anything that reads as filler.",
    },
    {
        icon: Sparkles,
        title: "Job match score",
        desc: "Paste a job description and get a direct match score against that specific posting.",
    },
    {
        icon: HistoryIcon,
        title: "Saved history",
        desc: "Every scan is saved, so you can track improvement across resume versions over time.",
    },
    {
        icon: ShieldCheck,
        title: "Secure by default",
        desc: "Refresh-token sessions, hashed passwords, and one-click sign-out from every device.",
    },
];

let Landing =()=>{

    let { isLoggedIn } = useContext(AuthContext);

    return (
        <>
            <section className="bg-[#13151e] border-b border-teal-700/40">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 grid lg:grid-cols-2 gap-14 items-center px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-18">
                    <div>
                        <span className="border border-teal-700 inline-flex rounded-full items-center gap-3 text-sm font-semibold uppercase tracking-wides px-4 py-2 text-[#3ee0c4] bg-[#15262d] mb-6">
                            <ScanLine color="#3ee0c4" size={18}/>
                            AI-powered resume scanning
                        </span>

                        <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] mb-5 text-[#faf6ee]">
                            Know exactly what a hiring bot sees <span className="text-[#3ee0c4]">before it sees your resume.</span>
                        </h1>

                        <p className="text-[#8d8a8b] font-medium text-lg">Upload your resume and get an ATS score, missing skills, grammar fixes, and a job-match breakdown — in under a minute.</p>

                        <div className="flex flex-wrap items-center gap-4 mt-6">
                            {
                                isLoggedIn ? 
                                (
                                    <Link to="/dashboard" className="font-semibold text-md bg-[#3ee0c4] rounded-full px-5 py-3 text-[#0e2027] hover:bg-[#84e4d4]">
                                        Go to dashboard →
                                    </Link>
                                ) :
                                (
                                    <>
                                        <Link className="font-semibold text-md bg-[#3ee0c4] rounded-full px-5 py-3 text-[#0e2027] hover:bg-[#84e4d4]">
                                            Scan your resume — free
                                        </Link>
                                        <Link to="/login" className="font-medium text-md text-[#8d8a8b] hover:text-white">
                                            Already have an account? Log in →
                                        </Link>
                                    </>
                                )
                            }
                        </div>
                    </div>

                    <div className="flex justify-center lg:block">
                        <img src={atsScanGif} alt="ResumeIQ" width="100%" className="w-full max-w-lg mx-auto lg:mx-0" />
                    </div>
                </div>
            </section>

            <section className="bg-[#13151e]">
                <div className="max-w-6xl mx-auto px-5 sm:px-8 px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-24" >
                    <p className="text-sm uppercase tracking-widest text-[#3ee0c4] font-semibold mb-3">What you get</p>
                    <h2 className="text-3xl sm:text-4xl mb-12 max-w-xl font-serif text-[#faf6ee] mb-4">Every scan, broken down in full.</h2>
                    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4" >
                        {
                            features.map((feature, index)=>{
                                return (
                                    <div key={index} className="border p-6 border-teal-900 rounded-xl hover:border-teal-400/60 transition-colors bg-[#171b2a]">
                                        <feature.icon className="text-teal mb-4" size={22} color="#3ee0c4"/>
                                        <h3 className="text-[#faf6ee] font-semibold mb-2">{feature.title}</h3>
                                        <p className="text-[#8d8a8b] text-sm font-medium text-paper/55 leading-relaxed">{feature.desc}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        </>
        


    )
}

export default Landing;