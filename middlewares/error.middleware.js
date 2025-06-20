//create subscription -> middleware (check the renewal  date) -> middleware (check for error) ->next -> controller

const errorMiddleware = (err,req,res,next) =>{  //err=> previous error, req=> request, res=> response, next=> next middleware
    try{
        let error ={...err};
        error.message = err.message; //error message
        console.error(err);

        // mongoose bad object id
        if(err.name === 'CastError'){
            const message = 'Resource not found';
            error = new Error(message);
            error.statusCode = 404;
        }

        // mongoose duplicate key error
        if(err.code === 11000){
            const message = 'Duplicate field value entered';
            error = new Error(message);
            error.statusCode = 400;
        }

        // mongoose validation error
        if(err.name === 'ValidationError'){
            const message = Object.values(err.errors).map((val) => val.message);
            error = new Error(message.join(', '));
            error.statusCode = 400;
        }

        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || 'server error',
        });
    }catch(error){
        next(error);
    }
};

export default errorMiddleware;