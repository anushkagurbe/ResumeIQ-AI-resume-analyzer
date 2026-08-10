
export let validateMiddleware = (schema) =>{
    return async (req, res, next)=>{
        try
        {
            let parsedData = await schema.parseAsync(req.body);
            req.body = parsedData;
            next();
        }
        catch(error)
        {
            next(error);
        }
    }
}