import userModel from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import jwt from 'jsonwebtoken';

export let authMiddleware = async (req, res, next)=>{
    let accessToken = req.headers?.authorization?.replace("Bearer ", "");

    if(!accessToken)
    {
        throw new AppError("Access token is missing. Please login", 401);
    }

    let decodedToken;

    try
    {
        decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }
    catch(error)
    {
        throw new AppError("Access token is invalid or has expired", 401);
    }


    let user = await userModel.findOne({
        _id: decodedToken._id
    });

    if(!user)
    {
        throw new AppError("User not found", 404);
    }

    req.user = user;
    next();
}