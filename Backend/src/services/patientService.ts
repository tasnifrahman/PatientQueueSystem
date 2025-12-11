import { Patient, PatientStatus, PatientPriority } from '../models/patient';
import { PatientRepository } from '../data/patientRepository';
import { AddPatientRequest } from '../validators/patientValidator';

const sortQueue = (p1: Patient, p2: Patient): number => {
    const priorityOrder: Record<PatientPriority, number> = { 'Emergency': 0, 'Normal': 1 };
    const priorityDiff = priorityOrder[p1.priority] - priorityOrder[p2.priority];
    if (priorityDiff !== 0) {
        return priorityDiff;
    }

    return p1.arrivalTime.localeCompare(p2.arrivalTime);
};

export const PatientService = {
    getFullQueue: (): Patient[] => {
        const waitingPatients = PatientRepository.getAll().filter(p => p.status === 'Waiting');
        return waitingPatients.sort(sortQueue);
    },

    addPatient: (data: AddPatientRequest): Patient => {
        const newPatientData: Omit<Patient, 'id'> = {
            ...data,
            arrivalTime: new Date().toISOString(),
            status: 'Waiting' as PatientStatus,
        };
        return PatientRepository.add(newPatientData);
    },

    markVisited: (id: number): Patient | null => {
        const patient = PatientRepository.getById(id);
        if (!patient) return null;

        if (patient.status === 'Visited') return patient;

        const updatedPatient: Patient = {
            ...patient,
            status: 'Visited',
        };

        const result = PatientRepository.update(updatedPatient);
        return result || null;
    },

    getStats: () => {
        const allPatients = PatientRepository.getAll();
        const waiting = allPatients.filter(p => p.status === 'Waiting');
        const emergencyWaiting = waiting.filter(p => p.priority === 'Emergency');
        const visited = allPatients.filter(p => p.status === 'Visited');

        return {
            totalPatientsWaiting: waiting.length,
            totalEmergencyCases: emergencyWaiting.length,
            totalVisitedPatients: visited.length,
        };
    },
};