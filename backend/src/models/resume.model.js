import mongoose from "mongoose";

let resumeSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    fileName: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    resumeText: {
        type: String,
        required: true
    },
    atsScore: {
        type: Number,
        min: 0,
        max: 100,
        required: true
    },
    overallSummary: {
        type: String,
        default: ""
    },
    missingSkills: {
        type: [ String ],
        default: []
    },
    matchedSkills: {
        type: [ String ],
        default: []
    },
    grammarSuggestions: {
        type: [ String ],
        default: []
    },
    improvementAreas: {
        type: [ String ],
        default: []
    },
    strengths: {
        type: [String],
        default: []
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100,
        default: null
    },
    rawAnalysis: {
        type: mongoose.Schema.Types.Mixed
    }
},
{
    timestamps: true
});

let resumeModel = mongoose.model("resume", resumeSchema);

export default resumeModel;