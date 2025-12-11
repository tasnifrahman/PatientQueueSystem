import * as dotenv from 'dotenv'
dotenv.config()

import config from './config';
import express, { json } from 'express';
import patientRoutes from './routes/patientRoutes';
import { errorHandler } from './middleware/errorHandler';
import cors from 'cors';

const app = express();
const PORT = config.PORT;

const allowedOrigins = [
    'http://localhost:3000',
];

const corsOptions: cors.CorsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Check if the request origin is in the allowed list
        // Allow requests with no origin (like mobile apps, curl, or same-origin requests)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
};

app.use(cors(corsOptions));

app.use(json());

app.use('/patients', patientRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`⚡️ Server is running at http://localhost:${PORT}`);
});