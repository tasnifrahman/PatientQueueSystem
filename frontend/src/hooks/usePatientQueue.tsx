// src/hooks/usePatientQueue.ts
'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import axios from 'axios';
import { Patient, QueueStats, NewPatientInput } from '@/lib/types';
import { api } from '@/lib/api';

// 1. Define the Shape of the Context
interface PatientQueueContextType {
    queue: Patient[];
    stats: QueueStats | null;
    isLoading: boolean;
    isError: boolean;
    addPatient: (data: NewPatientInput) => Promise<boolean>;
    markVisited: (id: number) => Promise<boolean>;
    refetch: () => Promise<void>;
}

// 2. Create the Context
const PatientQueueContext = createContext<PatientQueueContextType | undefined>(undefined);

// 3. Create the Provider Component
// This component will hold the "Single Source of Truth" state
export const PatientQueueProvider = ({ children }: { children: ReactNode }) => {
    const [queue, setQueue] = useState<Patient[]>([]);
    const [stats, setStats] = useState<QueueStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    // Core Fetching Logic
    const fetchAllData = useCallback(async () => {
        // Only set loading true if we don't have data yet (prevents flickering on updates)
        if (queue.length === 0) setIsLoading(true);
        setIsError(false);
        try {
            const [queueRes, statsRes] = await Promise.all([
                api.get('/patients'),
                api.get('/patients/stats'),
            ]);

            setQueue(queueRes.data.data);
            setStats(statsRes.data.data);
        } catch (error) {
            console.error("API Fetch Failed:", error);
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    }, []); // Removed queue.length dependency to prevent loops

    // Initial Load
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // Mutation: Add Patient
    const addPatient = async (data: NewPatientInput): Promise<boolean> => {
        try {
            await api.post('/patients', data);
            await fetchAllData(); // Updates the SHARED state
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Failed to add patient.");
        }
    };

    // Mutation: Mark Visited
    const markVisited = async (id: number): Promise<boolean> => {
        try {
            await api.put(`/patients/${id}/visit`);
            await fetchAllData(); // Updates the SHARED state
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Failed to mark patient as visited.");
        }
    };

    const value = {
        queue,
        stats,
        isLoading,
        isError,
        addPatient,
        markVisited,
        refetch: fetchAllData,
    };

    return (
        <PatientQueueContext.Provider value={value}>
            {children}
        </PatientQueueContext.Provider>
    );
};

// 4. Update the Hook to Consume the Context
// Components will call this hook exactly as before, but now they get shared data.
export const usePatientQueue = (): PatientQueueContextType => {
    const context = useContext(PatientQueueContext);
    if (!context) {
        throw new Error('usePatientQueue must be used within a PatientQueueProvider');
    }
    return context;
};