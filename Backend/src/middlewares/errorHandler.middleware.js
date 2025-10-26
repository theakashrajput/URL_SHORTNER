const errorHandling = (err, req, res, next) => {
    console.error("🔥 Error caught:", err?.message || err);

    // If headers already sent, delegate to default express handler
    if (res.headersSent) {
        return next(err);
    }

    const statusCode = err?.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        message: err.message || "Internal Server Error",
    });

    return;
};

export default errorHandling;