import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller.js";

const authRouter= Router();

// path: /api/auth/sign-up (POST)
authRouter.post('/sign-up',signUp);//(req,res)=>res.send({title:'sign-up route'}));
authRouter.post('/sign-in',signIn);//(req,res)=>res.send({title:'sign-in route'}));
authRouter.post('/sign-out',signOut);//(req,res)=>res.send({title:'sign-out route'}));

export default authRouter;