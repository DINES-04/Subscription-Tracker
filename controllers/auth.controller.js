import mongoose from "mongoose"
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";

// what is a req body? -> req.body is an object that contains data sent by the client (post Request)

export const signUp = async(req,res,next)=>{
    // implement sign up logic here
    const session = await mongoose.startSession();
    session.startTransaction();  //atomic operation 
    try{
        // logic to create new user 
        const {name,email, password}= req.body;

        // check the user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            const error= new Error("user already exists");
            error.statusCode= 400;
            throw error;
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);
        
        const newUser = await User.create([{name,email,password: hashpassword}], {session});

        // create token
        const token = jwt.sign({ userid: newUser[0]._id, email: newUser[0].email },JWT_SECRET,{ expiresIn: JWT_EXPIRES_IN });
          

        await session.commitTransaction();
        session.endSession(); 

        res.status(201).json({success: true, message: "user created successfully", data: {token, user: newUser[0]}})
    }catch(error){
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
} 

export const signIn = async(req,res,next)=>{
    // implement sign in logic here
    try{
        const {email,password}= req.body;

        const user = await User.findOne({email})

        if(!user){
            const error= new Error('User not found');
            error.statusCode= 404;
            throw error;
        }

        const ispasswordValid = await bcrypt.compare(password, user.password);

        if(!ispasswordValid){
            const error = new Error('Invalid password');
            error.statusCode = 401;
            throw error; 
        }

        const token=jwt.sign({userid: user._id, email: user.email}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({
            success: true,
            message: "user signed in successfully",
            date:{
                token,
                user,
            }
        })
    }catch(error){
        next(error);
    }
}

export const signOut = async(req,res,next)=>{
    // implement sign out logic here

}