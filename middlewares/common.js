logger = (req, res, next) => {
    console.log(`logged ${req.url} ${req.method} -- ${new Date()}`);
    next();
};

errRoute = (req, res, next) => {
    var error = new Error("Not found. Please try with another route!");
    error.status = 404;
    next(error);
};

errHandler = (err, req, res, next) => {
    var errorObj = {
        status: err.status,
        error: {
            message: err.message
        }
    };
    res.status(err.status).json(errorObj);
};

module.exports = {
    logger,
    errRoute,
    errHandler
}