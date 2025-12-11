import { Patient } from '../models/patient';

// Sample data structure for in-memory storage
const patients: Patient[] = [
    {
        id: 1,
        name: "Rahim Ahmed",
        problem: "High fever",
        priority: "Emergency",
        arrivalTime: "2025-01-12T09:32:00Z",
        status: "Waiting"
    },
    {
        id: 2,
        name: "Nusrat Jahan",
        problem: "Headache",
        priority: "Normal",
        arrivalTime: "2025-01-12T09:35:00Z",
        status: "Waiting"
    }
];

let nextId = patients.length > 0 ? Math.max(...patients.map(p => p.id)) + 1 : 1;

export const PatientRepository = {
    getAll: (): Patient[] => patients,

    getById: (id: number): Patient | undefined => patients.find(p => p.id === id),

    add: (patient: Omit<Patient, 'id'>): Patient => {
        const newPatient: Patient = {
            ...patient,
            id: nextId++,
        };
        patients.push(newPatient);
        return newPatient;
    },

    update: (updatedPatient: Patient): Patient | undefined => {
        const index = patients.findIndex(p => p.id === updatedPatient.id);
        if (index === -1) {
            return undefined;
        }
        patients[index] = updatedPatient;
        return updatedPatient;
    },
};