'use client';

import { Toaster } from 'sonner';
import { PatientQueueProvider } from '@/hooks/usePatientQueue'; 
import { SummarySection } from '@/components/summary/SummarySection';
import { PatientEntryForm } from '@/components/forms/PatientEntryForm';
import { PatientQueueList } from '@/components/queue/PatientQueueList';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <PatientQueueProvider> 
      <div className="flex min-h-screen justify-center bg-gray-50 dark:bg-zinc-900">
        <main className="w-full max-w-6xl p-6 md:p-10 lg:p-12">
          
          <header className="mb-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
              Patient Queue Dashboard
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage patient intake, prioritization, and flow.
            </p>
          </header>

          <section className="mb-8">
            <SummarySection />
          </section>
          
          <Separator className="my-6" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <PatientEntryForm />
            </div>
            <div className="lg:col-span-2">
              <PatientQueueList />
            </div>
          </div>
          
        </main>
        <Toaster position="bottom-right" richColors />
      </div>
    </PatientQueueProvider>
  );
}