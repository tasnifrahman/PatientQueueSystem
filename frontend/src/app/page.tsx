// src/app/page.tsx
'use client';

// Import the Toaster for Sonner (must be included in the root layout)
import { Toaster } from 'sonner';

// Import all application components
import { SummarySection } from '@/components/summary/SummarySection';
import { PatientEntryForm } from '@/components/forms/PatientEntryForm';
import { PatientQueueList } from '@/components/queue/PatientQueueList';
import { Separator } from '@/components/ui/separator';

/**
 * The main layout for the Patient Queue application.
 * It integrates all major components: Summary, Form, and Queue List.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen justify-center bg-gray-50 dark:bg-zinc-900">
      <main className="w-full max-w-6xl p-6 md:p-10 lg:p-12">
        
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-50">
            Patient Queue Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage patient intake, prioritization, and flow.
          </p>
        </header>

        {/* 1. Summary Section */}
        <section className="mb-8">
          <SummarySection />
        </section>
        
        <Separator className="my-6" />

        {/* Main Content: Form and Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* 2. Patient Entry Form (Left Column) */}
          <div className="lg:col-span-1">
            <PatientEntryForm />
          </div>

          {/* 3. Patient Queue List (Right Column - takes up more space) */}
          <div className="lg:col-span-2">
            <PatientQueueList />
          </div>
        </div>
        
      </main>

      {/* 4. Sonner Toaster (Global Notification Container) */}
      {/* Positioned bottom-right for clean UX */}
      <Toaster position="bottom-right" richColors />
    </div>
  );
}