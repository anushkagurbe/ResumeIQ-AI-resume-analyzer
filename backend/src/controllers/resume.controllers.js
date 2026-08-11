import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import resumeModel from "../models/resume.model.js";
import AppError from "../utils/AppError.js";
import { analyzeResume } from "../utils/cohereService.js";
import { fileParser } from "../utils/pdfParser.js";
import puppeteer from "puppeteer";

export let uploadAndAnalyze = asyncWrapper(async (req, res)=>{
    if(!req.file)
    {
        throw new AppError("Please upload a resume file (PDF, DOCX or TXT).", 400);
    }

    if(!req.body.jobDescription)
    {
        throw new AppError("Please provide a job description", 400);
    }

    let resumeText = await fileParser(req.file.buffer, req.file.originalname);

    if(!resumeText || resumeText.length < 50)
    {
        throw new AppError("Could not read enough text from this file. Try a different export.", 422);
    }

    console.log(resumeText);

    let analysis = await analyzeResume(resumeText, req.body.jobDescription);

    let resume = await resumeModel.create({
        user: req.user._id,
        fileName: req.file.originalname,
        resumeText,
        jobDescription: req.body.jobDescription,
        ...analysis
    });

    return res.status(201).json({
        resume
    });
})

export let getHistory =asyncWrapper(async (req, res)=>{
    let userId = req.user._id;

    let history = await resumeModel.find({
        user: userId 
    }).select("_id fileName atsScore createdAt")
    .sort({ createdAt: -1 })

    return res.status(200).json({
        success: true,
        history
    })
})


export let deleteAnalysis =asyncWrapper(async(req, res)=>{
    let { id } = req.params;

    let resume = await resumeModel.findOneAndDelete({_id: id, user: req.user._id});

    if(!resume)
    {
        throw new AppError("Analysis not found", 404);
    }

    return res.status(200).json({
        success: true,
        message: "Analysis deleted successfully"
    })
})

export let getAnalysis = asyncWrapper(async (req, res)=>{

    let { id } = req.params;

    let analysisDetails = await resumeModel.findOne({
        _id: id,
        user: req.user._id
    });

    if(!analysisDetails)
    {
        throw new AppError("Analysis not found", 404);
    }

    return res.status(200).json({
        success: true,
        analysisDetails
    })

})

export let downloadAnalyis =asyncWrapper(async (req, res)=>{
    let { id } = req.params;
    let analysis = await resumeModel.findOne({
        _id: id,
        user: req.user._id
    });

    if(!analysis)
    {
        throw new AppError("Analysis not found", 404);
    }

    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">

            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    color: #222;
                }

                h1 {
                    color: #111;
                }

                .score {
                    font-size: 40px;
                    font-weight: bold;
                    color: #159f8c;
                }

                .section {
                    margin-top: 25px;
                }

                li {
                    margin-bottom: 8px;
                }
            </style>
        </head>

        <body>

            <h1>ResumeIQ Analysis Report</h1>

            <p>
                <strong>Resume:</strong>
                ${analysis.fileName}
            </p>

            <p>
                <strong>Date:</strong>
                ${new Date(analysis.createdAt).toLocaleDateString()}
            </p>

            <div class="section">
                <h2>ATS Score</h2>

                <div class="score">
                    ${analysis.atsScore}/100
                </div>
            </div>

            <div class="section">
                <h2>Overall Summary</h2>

                <p>
                    ${analysis.overallSummary}
                </p>
            </div>

            <div class="section">
                <h2>Strengths</h2>

                <ul>
                    ${
                        analysis.strengths
                            .map(strength => `<li>${strength}</li>`)
                            .join("")
                    }
                </ul>
            </div>

            <div class="section">
                <h2>Improvement Areas</h2>

                <ul>
                    ${
                        analysis.improvementAreas
                            .map(area => `<li>${area}</li>`)
                            .join("")
                    }
                </ul>
            </div>

            <div class="section">
                <h2>Matched Skills</h2>

                <ul>
                    ${
                        analysis.matchedSkills
                            .map(skill => `<li>${skill}</li>`)
                            .join("")
                    }
                </ul>
            </div>

            <div class="section">
                <h2>Missing Skills</h2>

                <ul>
                    ${
                        analysis.missingSkills
                            .map(skill => `<li>${skill}</li>`)
                            .join("")
                    }
                </ul>
            </div>

            <div class="section">
                <h2>Grammar Suggestions</h2>

                <ul>
                    ${
                        analysis.grammarSuggestions
                            .map(suggestion => `<li>${suggestion}</li>`)
                            .join("")
                    }
                </ul>
            </div>

        </body>
        </html>
    `;

    let browser = await puppeteer.launch({
        headless: true
    });

    let page = await browser.newPage();

    await page.setContent(html, {
        waitUntil: "networkidle0"
    });

    let pdf = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: {
            top: "15mm",
            right: "10mm",
            bottom: "15mm",
            left: "10mm"
        }
    });

    res.set({
        "Content-Type": "application/pdf"
    });

    return res.send(pdf);

    await browser.close();
})