import mongoose from "mongoose";

let sessionSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: [true, "User is required"]
    },
    refreshTokenHash: {
        type: String,
        required: [true, "Refresh token is required"]
    },
    ipAddress: {
        type: String,
        required: [true, "IP address is required"]
    },
    userAgent: {
        type: String,
        required: [true, "User agent is required"]
    },
    revoked: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
})

let sessionModel = mongoose.model("session", sessionSchema);

export default sessionModel;