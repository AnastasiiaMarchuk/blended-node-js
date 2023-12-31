const globalErrorHandler = (error, req, res, next) => {
   const {message = 'Something went wrong. Please try again later', statusCode = 500} = error;
   res.status(statusCode).json({message});   
}

module.exports = {globalErrorHandler}