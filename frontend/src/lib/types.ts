// src/lib/types.ts
export type PatientPriority = 'Normal' | 'Emergency';
export type PatientStatus = 'Waiting' | 'Visited';

export interface Patient {
    id: number;
    name: string;
    problem: string;
    priority: PatientPriority;
    arrivalTime: string;
    status: PatientStatus;
}

export interface NewPatientInput {
    name: string;
    problem: string;
    priority: PatientPriority;
}

export interface QueueStats {
    totalPatientsWaiting: number;
    totalEmergencyCases: number;
    totalVisitedPatients: number;
}

export interface ApiResponse<T> {
    success: boolean;
    data: T;
    message?: string;
}