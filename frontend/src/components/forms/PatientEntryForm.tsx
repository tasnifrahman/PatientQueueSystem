// src/components/forms/PatientEntryForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { AddPatientSchema, AddPatientFormValues } from '@/lib/validation';
import { usePatientQueue } from '@/hooks/usePatientQueue';
import { PatientFields } from './PatientFields';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PatientEntryForm() {
    const { addPatient } = usePatientQueue();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<AddPatientFormValues>({
        resolver: zodResolver(AddPatientSchema),
        defaultValues: {
            name: '',
            problem: '',
            priority: 'Normal',
        },
    });

    async function onSubmit(values: AddPatientFormValues) {
        setIsSubmitting(true);
        try {
            await addPatient(values);
            
            toast.success('Patient Added!', {
                description: `${values.name} successfully added to the waiting queue.`,
                duration: 3000,
            });
            
            form.reset({ 
                name: '', 
                problem: '', 
                priority: form.getValues('priority')
            }); 
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
            
            toast.error('Submission Failed', {
                description: errorMessage,
                duration: 5000,
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Add Patient to Queue</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        
                        <PatientFields control={form.control} />
                        
                        <Button type="submit" className="w-full" disabled={isSubmitting}>
                            {isSubmitting ? 'Adding...' : 'Add to Queue'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}