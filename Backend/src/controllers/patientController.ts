import { Request, Response, NextFunction } from 'express';
import { PatientService } from '../services/patientService';
import { AddPatientRequest } from '../validators/patientValidator';
import { HttpError } from '../middleware/errorHandler';

export const addPatient = (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientData: AddPatientRequest = req.body;
        const newPatient = PatientService.addPatient(patientData);
        res.status(201).json({ success: true, data: newPatient });
    } catch (error) {
        next(error);
    }
};

export const getQueue = (req: Request, res: Response, next: NextFunction) => {
    try {
        const queue = PatientService.getFullQueue();
        res.status(200).json({ success: true, data: queue });
    } catch (error) {
        next(error);
    }
};

export const markVisited = (req: Request, res: Response, next: NextFunction) => {
    try {
        const patientId = parseInt(req.params.id);
        if (isNaN(patientId)) {
            throw new HttpError(400, 'Invalid patient ID format.');
        }

        const updatedPatient = PatientService.markVisited(patientId);

        if (!updatedPatient) {
            throw new HttpError(404, `Patient with ID ${patientId} not found.`);
        }

        res.status(200).json({ success: true, message: `Patient ${patientId} marked as visited.`, data: updatedPatient });
    } catch (error) {
        next(error);
    }
};

export const getStats = (req: Request, res: Response, next: NextFunction) => {
    try {
        const stats = PatientService.getStats();
        res.status(200).json({ success: true, data: stats });
    } catch (error) {
        next(error);
    }
};