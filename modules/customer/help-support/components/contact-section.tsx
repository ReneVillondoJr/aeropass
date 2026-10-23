'use client';

import { Mail, MessageSquareText, Send } from 'lucide-react';

import { HelpContactCard } from './contact-card';

interface HelpContactSectionProps {
  onContactForm: () => void;
}

export function HelpContactSection({ onContactForm }: HelpContactSectionProps) {
  function handleEmail() {
    window.location.href =
      'mailto:help@aeropass.demo?subject=AeroPass%20Support%20Request';
  }

  return (
    <section className='space-y-4'>
      <div>
        <h2 className='text-lg font-bold text-[#102A43]'>Still need help?</h2>

        <p className='mt-1 text-sm leading-6 text-slate-500'>
          Choose a support option if you cannot find the answer you need.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-2'>
        <HelpContactCard
          icon={MessageSquareText}
          title='Submit a support request'
          description='Describe your concern and provide the information needed to help resolve it.'
          actionLabel='Create support request'
          onAction={onContactForm}
        />

        <HelpContactCard
          icon={Mail}
          title='Email support'
          description='Open your email application with a prefilled support subject. Replace the demo address with your actual support address before deployment.'
          actionLabel='Open email'
          onAction={handleEmail}
        />
      </div>

      <div className='flex items-start gap-3 rounded-2xl border border-[#D4EAF5] bg-[#EEF7FB] p-4'>
        <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#24658A]'>
          <Send className='size-4' />
        </div>

        <div>
          <p className='text-sm font-semibold text-[#102A43]'>
            Help us assist you faster
          </p>

          <p className='mt-1 text-sm leading-6 text-slate-600'>
            Include your booking reference when your concern relates to a
            reservation. Do not include passwords, one-time verification codes,
            or full payment card details in support messages.
          </p>
        </div>
      </div>
    </section>
  );
}
