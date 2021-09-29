const errorHandler = (err, req, res, next) => {
    if(err){
        const statusCode = err.statusCode || 401;
        const message = err.message || 'no message';

        res.status(statusCode).json({message});
    }
    next();
}

module.exports = errorHandler;