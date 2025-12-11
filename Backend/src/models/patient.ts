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