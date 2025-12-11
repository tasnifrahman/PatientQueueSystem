import { Request, Response, NextFunction } from 'express';
import { ZodObject, ZodError } from 'zod';
import { HttpError } from './errorHandler';

// Generic validation middleware
export const validate = (schema: ZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate the request body
            schema.parse(req.body);
            next(); // Validation passed
        } catch (error) {
            if (error instanceof ZodError) {
                // Format Zod errors for a clean 400 response
                const formattedErrors = error.issues.map(issue => ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }));
                
                // Throw a custom 400 error
                const errorMessage = `Validation failed: ${formattedErrors.map(e => `${e.field}: ${e.message}`).join('; ')}`;
                next(new HttpError(400, errorMessage, false));
            } else {
                next(error); // Forward other unexpected errors
            }
        }
    };