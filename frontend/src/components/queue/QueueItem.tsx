'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Patient } from '@/lib/types';
import { usePatientQueue } from '@/hooks/usePatientQueue';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2 } from 'lucide-react';

interface QueueItemProps {
    patient: Patient;
}

export function QueueItem({ patient }: QueueItemProps) {
    const { markVisited } = usePatientQueue();
    const [isUpdating, setIsUpdating] = useState(false);

    const handleMarkVisited = async () => {
        setIsUpdating(true);
        try {
            await markVisited(patient.id);
            toast.success('Status Updated', {
                description: `${patient.name} marked as Visited and removed from the queue.`,
                duration: 3000,
            });
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Failed to update status.";
            toast.error('Update Failed', {
                description: errorMessage,
                duration: 5000,
            });
        } finally {
            setIsUpdating(false);
        }
    };

    const isEmergency = patient.priority === 'Emergency';
    const cardClass = isEmergency
        ? "border-4 border-red-500 shadow-lg"
        : "border-gray-200";

    const formattedTime = new Date(patient.arrivalTime).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });

    return (
        <Card className={`flex justify-between items-center p-4 ${cardClass}`}>
            <div className="space-y-1">
                <CardTitle className="flex items-center gap-3 text-lg">
                    {patient.name}
                    <Badge variant={isEmergency ? "destructive" : "secondary"}>
                        {patient.priority}
                    </Badge>
                </CardTitle>
                <CardDescription>
                    Problem: {patient.problem}
                </CardDescription>
                <p className="text-sm text-muted-foreground">
                    Arrived: {formattedTime}
                </p>
            </div>
            
            <Button 
                onClick={handleMarkVisited} 
                disabled={isUpdating}
                variant="outline"
                className="shrink-0"
            >
                {isUpdating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Updating
                    </>
                ) : (
                    "Mark as Visited"
                )}
            </Button>
        </Card>
    );
}