import { asyncWrapper } from "../middlewares/asyncWrapper.js";
import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import AppError from "../utils/AppError.js";
import { generateAccessToken, generateRefreshToken } from "../utils/tokens.js";
import crypto from "crypto";
import sessionModel from "../models/session.model.js";
import { cookieOptions } from "../config/cookie.js";
import jwt from "jsonwebtoken";

export let register = asyncWrapper(async (req, res)=>{
    let { name, email, password } = req.body;

    let isUserExists = await userModel.findOne({
        $or: [
            { name },
            { email }
        ]
    });

    if(isUserExists)
    {
        throw new AppError("An account with the provided email or name already exists", 409);
    }

    let salt = await bcrypt.genSalt(12);
    let hashedPassword = await bcrypt.hash(password, salt);

    await userModel.create({
        email,
        name,
        password: hashedPassword
    });

    return res.status(201).json({
        success: true,
        message: "User registered successfully"
    });

})


export let login = asyncWrapper(async (req, res)=>{
    let { email, password } = req.body;

    let user = await userModel.findOne({ 
        email
    }).select("+password");

    if(!user)
    {
        throw new AppError("Invalid email or password", 401);
    }

    let isPasswordCorrect = await user.comparePassword(password);
    if(!isPasswordCorrect)
    {
        throw new AppError("Invalid email or password", 401);
    }

    let refreshToken = generateRefreshToken(user._id);

    let refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    let session = await sessionModel.create({
        user_id: user._id,
        ipAddress: req.ip,
        refreshTokenHash,
        userAgent: req.headers["user-agent"]
    })
    
    let accessToken = generateAccessToken(user._id, session._id);

    res.cookie("refreshToken", refreshToken, cookieOptions);
    return res.status(200).json({
        success: true,
        message: "Login successfully",
        user: {
            _id: user._id,
            email: user.email,
            name: user.name
        },
        accessToken
    })

})

export let refreshToken = asyncWrapper(async (req, res)=>{
    let refreshToken = req.cookies?.refreshToken;

    if(!refreshToken)
    {
        throw new AppError("Refresh token not found", 401);
    }

    let decodedToken;

    try
    {
        decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    }
    catch(error)
    {
        res.clearCookie("refreshToken");
        throw new AppError("Invalid or expired refresh token", 401);
    }

    let refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

    let session = await sessionModel.findOne({
        refreshTokenHash,
        revoked: false
    });

    if(!session)
    {
        res.clearCookie("refreshToken", cookieOptions);
        throw new AppError("Invalid refresh token", 401);
    }

    let accessToken = generateAccessToken(decodedToken._id, session._id);
    let newRefreshToken = generateRefreshToken(decodedToken._id);

    let newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex");

    await sessionModel.findByIdAndUpdate(session._id, {
        $set: {
            refreshTokenHash: newRefreshTokenHash
        }
    })

    return res.status(200).cookie("refreshToken", newRefreshToken, cookieOptions).json({
        success: true,
        message: "Access token refreshed successfully",
        accessToken
    })
})


export let getMe = asyncWrapper(async (req, res)=>{
    let userId = req.user._id;

    let user = await userModel.findById(userId);

    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    })
})

export let logout = asyncWrapper(async (req, res)=>{
    let refreshToken = req.cookies?.refreshToken;

    if(refreshToken)
    {
        let refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");
    
        let session = await sessionModel.findOne({
            refreshTokenHash,
            revoked: false
        });
    
        if(!session)
        {
            throw new AppError("Invalid refresh token", 401);
        }
    
        await sessionModel.findByIdAndUpdate(session._id, {
            $set: {
                revoked: true
            }
        })
    }



    return res.status(200).clearCookie("refreshToken").json({
        success: true,
        message: "Logout successfully"
    })
})

