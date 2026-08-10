import dns from "dns";

dns.setServers([
    "1.1.1.1",
    '8.8.8.8'
])

import "dotenv/config";
import app from "./app.js";
import connectDb from "./src/config/db.js";

let PORT = process.env.PORT || 8080;

let startServer = async() =>{
    try
    {
        await connectDb();
        app.listen(PORT, ()=>{
            console.log("Server is running on port ", PORT);
        })
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}

startServer();
