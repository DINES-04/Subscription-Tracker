import { workflowClient } from "../config/upstash.js";
import Subscription from "../models/subscription.model.js";
import { SERVER_URL } from "../config/env.js";
export const createSubscription = async (req, res, next) => {
    try{
        const subscription = await Subscription.create({
            ...req.body,
            user: req.user._id //which user is creating the subscription
        });

        await workflowClient.trigger({
            url: `${SERVER_URL}/api/v1/workflows/subscription/reminder`,
            body:{
                subscriptionId: subscription.id,
            },
            headers:{
                'content-type': 'application/json',
            },
            retries:0,
        })
        res.status(201).json({ success: true, data: subscription });
    }catch(error){
        next(error);
    }
}

export const getSubscriptions = async (req,res, next) =>{
    try{
        if(req.user.id !== req.params.id){
            return res.status(403).json({ success: false, message: "Unauthorized" });
        }

        const subscriptions = await Subscription.find({ user:req.params.id});
        res.status(200).json({ success: true, data: subscriptions});
    }catch(error){
        next(error);
    }
}

export const allSubscriptions = async (req,res,next) =>{
    try{
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions});
    }catch(error){
        next(error);
    }
}