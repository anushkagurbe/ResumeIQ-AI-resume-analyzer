import { ZodError } from "zod";

export let errorMiddleware = async(error, req, res, next)=>{
    
    if(error instanceof ZodError)
    {
        let errors = {};
        error.issues.forEach((issue)=>{
            errors[issue.path[0]] = issue.message
        })
        console.log(errors);
        return res.status(400).json({
            message: "Validation failed",
            success: false,
            errors
        });
    }

    console.log(error);
    return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal server error"
    })
}