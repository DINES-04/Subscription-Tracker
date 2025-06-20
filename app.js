import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import SubscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjectmiddleware from './middlewares/arcject.middleware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

// built-in middleware
app.use(express.json()); //parse json data
app.use(express.urlencoded({extended: true})); //process the form data sent via HTMl forms in simple format 
app.use(cookieParser()); //parse cookies
app.use(arcjectmiddleware)

// use is a middleware and also says which routes to use
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', SubscriptionRouter)
app.use('/api/v1/workflows', workflowRouter);

//use error middleware (custom middleware) 
app.use(errorMiddleware);

app.get('/',(req,res)=>{
    res.send("Welcome to Subscription Tracker Api");
});

app.listen(PORT,async()=>{
    console.log(`Subscription Tracker Api is on http://Localhost:${PORT}`)

    await connectToDatabase();
});

export default app;