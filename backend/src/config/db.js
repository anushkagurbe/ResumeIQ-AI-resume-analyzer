import mongoose from "mongoose";

let connectDb = async() =>{
    try
    {
        console.log("Mongo URL:", process.env.DB_URL);
        await mongoose.connect(process.env.DB_URL);
        console.log("Database connected successfully");
    }
    catch(error)
    {
        console.log(error);
        process.exit(1);
    }
}

export default connectDb;