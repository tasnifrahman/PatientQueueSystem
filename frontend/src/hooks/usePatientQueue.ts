// src/hooks/usePatientQueue.ts
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Patient, QueueStats, NewPatientInput } from '@/lib/types';
import { api } from '@/lib/api';

interface UsePatientQueueResult {
    queue: Patient[];
    stats: QueueStats | null;
    isLoading: boolean;
    isError: boolean;
    addPatient: (data: NewPatientInput) => Promise<boolean>;
    markVisited: (id: number) => Promise<boolean>;
    refetch: () => Promise<void>;
}

export const usePatientQueue = (): UsePatientQueueResult => {
    const [queue, setQueue] = useState<Patient[]>([]);
    const [stats, setStats] = useState<QueueStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const fetchAllData = useCallback(async () => {
        setIsLoading(true);
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
            setQueue([]);
            setStats(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const addPatient = async (data: NewPatientInput): Promise<boolean> => {
        try {
            await api.post('/patients', data);
            await fetchAllData(); 
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error("Failed to add patient due to a network or server error.");
        }
    };

    const markVisited = async (id: number): Promise<boolean> => {
        try {
            await api.put(`/patients/${id}/visit`);
            await fetchAllData();
            return true;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data?.message) {
                throw new Error(error.response.data.message);
            }
            throw new Error(`Failed to mark patient ID ${id} as visited.`);
        }
    };

    return {
        queue,
        stats,
        isLoading,
        isError,
        addPatient,
        markVisited,
        refetch: fetchAllData,
    };
};