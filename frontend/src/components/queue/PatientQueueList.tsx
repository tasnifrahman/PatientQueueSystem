// src/components/queue/PatientQueueList.tsx
'use client';

import { usePatientQueue } from '@/hooks/usePatientQueue';
import { QueueItem } from './QueueItem';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Loader2 } from 'lucide-react';

export function PatientQueueList() {
    const { queue, isLoading } = usePatientQueue();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-40">
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                <p>Loading patient queue...</p>
            </div>
        );
    }

    if (queue.length === 0) {
        return (
            <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Queue Empty</AlertTitle>
                <AlertDescription>
                    There are currently no patients waiting. Time for a coffee break!
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Waiting Queue ({queue.length} Patients)</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 space-y-4 max-h-[600px] overflow-y-auto pr-4">
                {queue.map((patient) => (
                    <QueueItem key={patient.id} patient={patient} />
                ))}
            </CardContent>
        </Card>
    );
}