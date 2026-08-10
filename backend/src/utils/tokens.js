import jwt from "jsonwebtoken";

export let generateAccessToken = (id, sessionid) =>{
    return jwt.sign({
        _id: id,
        sessionid: sessionid
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
    )
}

export let generateRefreshToken = (id) =>{
    return jwt.sign({
        _id: id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
    )
}