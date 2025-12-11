import express from 'express';
import {
    addPatient,
    getQueue,
    markVisited,
    getStats
} from '../controllers/patientController';
import { validate } from '../middleware/validationHandler';
import { AddPatientSchema } from '../validators/patientValidator';

const router = express.Router();

// Get queue (Waiting only, sorted)
router.get('/', getQueue);

// Get summary stats
router.get('/stats', getStats);

// Add new patient (Validated using Zod middleware)
router.post('/', validate(AddPatientSchema), addPatient);

// Mark as visited
router.put('/:id/visit', markVisited);

export default router;