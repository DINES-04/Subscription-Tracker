import { Router } from "express";
import {authorize} from "../middlewares/auth.middleware.js";
import { allSubscriptions, createSubscription, getSubscriptions } from "../controllers/subscription.controller.js";

const SubscriptionRouter= Router();

SubscriptionRouter.get('/',authorize, allSubscriptions);

SubscriptionRouter.get('/:id',(req,res)=> res.send({title: 'get  subscription details'}));

SubscriptionRouter.post('/',authorize, createSubscription );

SubscriptionRouter.put('/:id',(req,res)=> res.send({title: 'update subscription'}));

SubscriptionRouter.delete('/:id',(req,res)=> res.send({title: 'delete subscription'}));

SubscriptionRouter.get('/user/:id', authorize, getSubscriptions);

SubscriptionRouter.put('/:id/cancel',(req,res)=> res.send({title: 'cancel subscription'}));

SubscriptionRouter.get('/upcoming-renewals',(req,res)=> res.send({title: 'get upcoming renewal subscription'}));

export default SubscriptionRouter;