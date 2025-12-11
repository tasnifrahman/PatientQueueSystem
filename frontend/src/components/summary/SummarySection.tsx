'use client';

import { usePatientQueue } from '@/hooks/usePatientQueue';
import { Users, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react'; 
import { StatCard } from './StatCard'; 

export function SummarySection() {
    const { stats, isLoading } = usePatientQueue();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center p-4 h-32 w-full">
                <Loader2 className="mr-2 h-6 w-6 animate-spin text-muted-foreground" />
                <p className="text-muted-foreground">Loading summary...</p>
            </div>
        );
    }
    
    if (!stats) return null;

    const statsData = [
        {
            title: "Total Waiting",
            value: stats.totalPatientsWaiting,
            icon: Users,
            colorClass: "text-blue-500",
        },
        {
            title: "Emergency Cases",
            value: stats.totalEmergencyCases,
            icon: AlertTriangle,
            colorClass: "text-red-500",
        },
        {
            title: "Patients Visited",
            value: stats.totalVisitedPatients,
            icon: CheckCircle,
            colorClass: "text-green-500",
        },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {statsData.map((stat) => (
                <StatCard 
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={stat.icon}
                    colorClass={stat.colorClass}
                />
            ))}
        </div>
    );
}