import  { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controller.js';
import {authorize} from "../middlewares/auth.middleware.js";

const userRouter = Router();

//GET /users -> get all users
//GET /users/:id -> get user by id //123


userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req,res)=>{
    res.send({title:'Create all users'});
})

userRouter.put('/:id', (req,res)=>{
    res.send({title:'Update user'});
})

userRouter.delete('/:id', (req,res)=>{
    res.send({title:'delete user'});
})

export default userRouter;