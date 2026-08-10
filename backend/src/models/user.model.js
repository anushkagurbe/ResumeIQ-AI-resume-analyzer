import mongoose from "mongoose";
import bcrypt from "bcryptjs";

let userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [4, "Name must be at least 4 charcters long"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        trim: true,
        minlength: [8, "Password must be at least 8 characters long"],
        select: false
    }
},
{
    timestamps: true
});

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

let userModel = mongoose.model("user", userSchema);

export default userModel;