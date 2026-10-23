'use client';

import { useState } from 'react';

import { AlertCircle, CheckCircle2, LoaderCircle, Send, X } from 'lucide-react';

import type {
  HelpCategory,
  SupportPriority,
  SupportRequestFieldErrors,
  SupportRequestFormValues,
} from '../types/help-support';

interface SupportRequestFormProps {
  onSubmit: (values: SupportRequestFormValues) => void;
  onCancel: () => void;
}

const categoryOptions: {
  value: HelpCategory;
  label: string;
}[] = [
  { value: 'BOOKING', label: 'Booking and reservations' },
  { value: 'PAYMENTS', label: 'Payments and refunds' },
  { value: 'FLIGHTS', label: 'Flight information' },
  { value: 'CHECK_IN', label: 'Check-in and boarding' },
  { value: 'BAGGAGE', label: 'Baggage' },
  { value: 'ACCOUNT', label: 'Account and profile' },
];

const priorityOptions: {
  value: SupportPriority;
  label: string;
}[] = [
  { value: 'LOW', label: 'Low' },
  { value: 'NORMAL', label: 'Normal' },
  { value: 'HIGH', label: 'High' },
];

export function SupportRequestForm({
  onSubmit,
  onCancel,
}: SupportRequestFormProps) {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState<HelpCategory>('BOOKING');
  const [message, setMessage] = useState('');
  const [priority, setPriority] = useState<SupportPriority>('NORMAL');

  const [errors, setErrors] = useState<SupportRequestFieldErrors>({});

  function validate(): boolean {
    const nextErrors: SupportRequestFieldErrors = {};

    if (!subject.trim()) {
      nextErrors.subject = 'A subject is required.';
    } else if (subject.trim().length < 5) {
      nextErrors.subject = 'Subject must be at least 5 characters.';
    } else if (subject.trim().length > 120) {
      nextErrors.subject = 'Subject must not exceed 120 characters.';
    }

    if (!category) {
      nextErrors.category = 'Select a support category.';
    }

    if (!message.trim()) {
      nextErrors.message = 'Describe your concern.';
    } else if (message.trim().length < 20) {
      nextErrors.message = 'Please provide at least 20 characters.';
    } else if (message.trim().length > 3000) {
      nextErrors.message = 'Message must not exceed 3,000 characters.';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onSubmit({
      subject: subject.trim(),
      category,
      message: message.trim(),
      priority,
    });
  }

  return (
    <section
      id='support-request-form'
      className='overflow-hidden rounded-2xl border border-slate-200 bg-white'
    >
      <div className='border-b border-slate-100 px-5 py-5 sm:px-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h2 className='text-lg font-bold text-[#102A43]'>
              Create a support request
            </h2>

            <p className='mt-1 text-sm leading-6 text-slate-500'>
              Tell us what happened so your request can be reviewed.
            </p>
          </div>

          <div className='flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#24658A]'>
            <Send className='size-5' />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5 p-5 sm:p-6' noValidate>
        <div className='space-y-2'>
          <label
            htmlFor='support-subject'
            className='text-sm font-semibold text-[#102A43]'
          >
            Subject <span className='text-rose-500'>*</span>
          </label>

          <input
            id='support-subject'
            value={subject}
            maxLength={120}
            onChange={(event) => {
              setSubject(event.target.value);
              setErrors((current) => ({
                ...current,
                subject: undefined,
              }));
            }}
            placeholder='Briefly describe your issue'
            aria-invalid={Boolean(errors.subject)}
            className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#102A43] outline-none transition placeholder:text-slate-400 focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#E5F5FC]'
          />

          {errors.subject && (
            <p className='text-xs text-rose-600' role='alert'>
              {errors.subject}
            </p>
          )}
        </div>

        <div className='grid gap-5 sm:grid-cols-2'>
          <div className='space-y-2'>
            <label
              htmlFor='support-category'
              className='text-sm font-semibold text-[#102A43]'
            >
              Category <span className='text-rose-500'>*</span>
            </label>

            <select
              id='support-category'
              value={category}
              onChange={(event) => {
                setCategory(event.target.value as HelpCategory);
                setErrors((current) => ({
                  ...current,
                  category: undefined,
                }));
              }}
              aria-invalid={Boolean(errors.category)}
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#102A43] outline-none transition focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#E5F5FC]'
            >
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {errors.category && (
              <p className='text-xs text-rose-600' role='alert'>
                {errors.category}
              </p>
            )}
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='support-priority'
              className='text-sm font-semibold text-[#102A43]'
            >
              Priority
            </label>

            <select
              id='support-priority'
              value={priority}
              onChange={(event) =>
                setPriority(event.target.value as SupportPriority)
              }
              className='w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#102A43] outline-none transition focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#E5F5FC]'
            >
              {priorityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center justify-between gap-3'>
            <label
              htmlFor='support-message'
              className='text-sm font-semibold text-[#102A43]'
            >
              Describe your concern <span className='text-rose-500'>*</span>
            </label>

            <span className='text-xs text-slate-400'>
              {message.length}/3000
            </span>
          </div>

          <textarea
            id='support-message'
            value={message}
            maxLength={3000}
            rows={6}
            onChange={(event) => {
              setMessage(event.target.value);
              setErrors((current) => ({
                ...current,
                message: undefined,
              }));
            }}
            placeholder='Explain what happened and what assistance you need. Include a booking reference if relevant.'
            aria-invalid={Boolean(errors.message)}
            className='w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-[#102A43] outline-none transition placeholder:text-slate-400 focus:border-[#5BA9D6] focus:ring-2 focus:ring-[#E5F5FC]'
          />

          {errors.message && (
            <p className='text-xs text-rose-600' role='alert'>
              {errors.message}
            </p>
          )}
        </div>

        <div className='flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4'>
          <AlertCircle className='mt-0.5 size-4 shrink-0 text-amber-700' />

          <p className='text-xs leading-5 text-amber-800'>
            Do not include passwords, one-time verification codes, full payment
            card numbers, or other sensitive credentials in your message.
          </p>
        </div>

        <div className='flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end'>
          <button
            type='button'
            onClick={onCancel}
            className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
          >
            <X className='size-4' />
            Cancel
          </button>

          <button
            type='submit'
            className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#102A43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183D5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
          >
            <Send className='size-4' />
            Submit request
          </button>
        </div>
      </form>
    </section>
  );
}

export function SupportRequestSuccess({
  requestId,
  onClose,
}: {
  requestId: string;
  onClose: () => void;
}) {
  return (
    <section className='rounded-2xl border border-emerald-200 bg-white p-6 sm:p-8'>
      <div className='mx-auto flex max-w-lg flex-col items-center text-center'>
        <div className='flex size-16 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600'>
          <CheckCircle2 className='size-8' />
        </div>

        <h2 className='mt-5 text-xl font-bold text-[#102A43]'>
          Request created
        </h2>

        <p className='mt-2 text-sm leading-6 text-slate-500'>
          Your support request has been recorded in the current demo session. No
          email has been sent, and no ticket has been saved to a backend.
        </p>

        <div className='mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 p-4'>
          <p className='text-xs font-medium uppercase tracking-wide text-slate-500'>
            Demo reference
          </p>

          <p className='mt-2 break-all font-mono text-lg font-bold text-[#102A43]'>
            {requestId}
          </p>
        </div>

        <button
          type='button'
          onClick={onClose}
          className='mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-[#102A43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183D5B]'
        >
          <CheckCircle2 className='size-4' />
          Back to help center
        </button>
      </div>
    </section>
  );
}
