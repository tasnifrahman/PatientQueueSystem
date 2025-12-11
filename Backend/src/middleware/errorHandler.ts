import { Request, Response, NextFunction } from 'express';

// Custom error structure for better handling
class HttpError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(statusCode: number, message: string, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = isOperational;
        Object.setPrototypeOf(this, HttpError.prototype);
    }
}

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.error(err.stack || err);

    const statusCode = err instanceof HttpError ? err.statusCode : 500;
    const message = err instanceof HttpError ? err.message : 'An unexpected server error occurred.';

    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
    });
};

export { HttpError };