// src/components/forms/PatientFields.tsx
'use client';

import { Control, FieldPath } from 'react-hook-form';
import { AddPatientFormValues } from '@/lib/validation';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface PatientFieldsProps {
    control: Control<AddPatientFormValues>;
}

export function PatientFields({ control }: PatientFieldsProps) {
    
    const priorityOptions = [
        { value: 'Emergency', label: 'Emergency' },
        { value: 'Normal', label: 'Normal' },
    ];

    return (
        <>
            <FormField
                control={control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Patient Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Rahim Ahmed" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="problem"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Symptoms</FormLabel>
                        <FormControl>
                            <Input placeholder="High fever, headache" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={control}
                name="priority"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Priority</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Priority" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {priorityOptions.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </>
    );
}