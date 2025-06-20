import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{ 
        type:String, 
        required: [true, "user name is required"],
        trim: true,
        minlength: [2, "alteast 2 character"],
        maxlength: [50, "maximum 50 character"],
    },
    email:{
        type: String,
        required: [true, "email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "please provide a valid email"],
    },
    password:{
        type: String,
        required:[true, "password is required"],
        trim: true,
        minlength: [6, "password must be alteast 6 character"],
    }

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;

// eg: name: "jana" ,email: "jana@gmail.com", password: 'password'