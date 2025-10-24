const errorHandling = (err, req, res, next) => {
    const statusCode = err?.statusCode || 500;

    res?.status(statusCode).json({
        sucess: false,
        message: err.message || "Internal Eerver Error",
    });
};

export default errorHandling;