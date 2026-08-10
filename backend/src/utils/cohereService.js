import { CohereClientV2 } from "cohere-ai";
import AppError from "./AppError.js";

let cohere = new CohereClientV2({
    token: process.env.COHERE_API_KEY
})

let buildPrompt = (resumeText, jobDescription) => `
You are an expert technical recruiter and ATS (Applicant Tracking System) specialist.

Analyze the resume below${
  jobDescription ? " against the provided job description" : ""
} and respond with ONLY a single valid JSON object (no markdown, no explanation, no extra text) having this exact structure:

{
  "atsScore": <integer 0-100>,
  "overallSummary": "<2-3 sentence summary>",
  "strengths": ["..."],
  "improvementAreas": ["..."],
  "grammarSuggestions": ["..."],
  "matchedSkills": ["..."],
  "missingSkills": ["..."],
  "matchScore": <integer 0-100 or null>
}

Rules:
- Return ONLY valid JSON.
- No markdown.
- No code block.
- No explanation.
- Keep each array maximum 6 items.
- atsScore should consider ATS friendliness, formatting, keywords, quantified achievements and clarity.
- If no job description is provided, set "matchScore" to null.

RESUME
"""
${resumeText.slice(0, 12000)}
"""

${
  jobDescription
    ? `
JOB DESCRIPTION
"""
${jobDescription.slice(0, 6000)}
"""
`
    : ""
}
`;


let safeJSONParse = (rawText)=>{
    let cleaned = rawText.replace(/```json|```/g, "").trim();
    console.log("\ncleaned respnse\n")
    console.log(cleaned);
    let start = cleaned.indexOf("{");
    let end = cleaned.indexOf("}");
    let jsonString = start !== -1 && end !== -1 ? cleaned.slice(start, end+1) : cleaned;
    return JSON.parse(jsonString);    
}

let clampScore = (score)=>{
    let num = Number(score);

    if(Number.isNaN(num))
    {
        return 0;
    }

    return Math.max(0, Math.min(100, Math.round(num)));
}

let toArray = (value)=>{
    if(!value)
    {
        return [];
    }
    return Array.isArray(value) ? value.slice(0, 8) : [String(value)];
}

export let analyzeResume = async(resumeText, jobDescription)=>{
    let response = await cohere.chat({
        model: "command-a-plus-05-2026",
        temperature: 0.3,
        messages: [
            {
                role: "user",
                content: buildPrompt(resumeText, jobDescription),
            },
        ]
    })

    let rawText = response.message?.content.filter((item)=> item.type == "text").map((item)=>item.text)?.join("");
    console.log(rawText);
    let parsed;
    try
    {
        parsed = safeJSONParse(rawText);
    }
    catch(error)
    {
        console.log(error);
        console.log("Failed to parse cohere response");
        throw new AppError("AI analysis returned an unexpected format. Please try again.", 500);
    }
    console.log(parsed);
    return {
        atsScore: clampScore(parsed.atsScore),
        overallSummary: parsed.overallSummary,
        strengths: toArray(parsed.strengths),
        improvementAreas: toArray(parsed.improvementAreas),
        grammarSuggestions: toArray(parsed.grammarSuggestions),
        matchedSkills: toArray(parsed.matchedSkills),
        missingSkills: toArray(parsed.missingSkills),
        matchScore: clampScore(parsed.matchScore)
    }
}