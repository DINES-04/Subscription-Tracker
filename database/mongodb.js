import mongoose from 'mongoose';
import { DB_URL, NODE_ENV} from '../config/env.js';

if(!DB_URL){
    throw new Error("please define the mongoDB_URL environment variable inside the .env<development/>production>.local");   
}

const connectToDatabase = async() =>{
    try{
        await mongoose.connect(DB_URL);
        console.log(`MongoDB connected successfully in ${NODE_ENV} mode`);
    }catch(error){
        console.error("Error connecting to mongoDB", error);
        process.exit(1);
    }
}

export default connectToDatabase;