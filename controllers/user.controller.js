import User from '../models/user.model.js';

export const getUsers = async (req,res,next)=>{
    try{
        const users = await User.find();
        res.status(200).json({
            success: true,
            message:"users fetched successfully",
            data: users
        })
    }catch(error){
        next(error);
    }
}

export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id).select('-password'); //get user don't care password

        if(!user){
            const error= new Error('user not found');
            error.statusCode= 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message:"user fetched successfully",
            data: user
        })
    }catch(error){
        next(error);
    }
}