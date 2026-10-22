'use client';

import { useState } from 'react';

import { Check, LoaderCircle, RotateCcw, UserRound, X } from 'lucide-react';

import type {
  CustomerProfileFormValues,
  ProfileFieldErrors,
} from '../types/profile';

import { validateProfileValues } from '../data/profile';

interface ProfileFormProps {
  initialValues: CustomerProfileFormValues;
  onCancel: () => void;
  onSave: (values: CustomerProfileFormValues) => void;
}

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  type?: 'text' | 'email' | 'tel';
  required?: boolean;
  onChange: (value: string) => void;
}

function FormField({
  id,
  label,
  value,
  placeholder,
  error,
  type = 'text',
  required = false,
  onChange,
}: FormFieldProps) {
  return (
    <div className='space-y-2'>
      <label htmlFor={id} className='text-sm font-semibold text-[#102A43]'>
        {label}
        {required && <span className='ml-1 text-rose-500'>*</span>}
      </label>

      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={(event) => onChange(event.target.value)}
        className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-[#102A43] outline-none transition placeholder:text-slate-400 focus:ring-2 ${
          error ?
            'border-rose-300 focus:border-rose-400 focus:ring-rose-100'
          : 'border-slate-200 focus:border-[#5BA9D6] focus:ring-[#E5F5FC]'
        }`}
      />

      {error && (
        <p id={`${id}-error`} className='text-xs text-rose-600' role='alert'>
          {error}
        </p>
      )}
    </div>
  );
}

export function ProfileForm({
  initialValues,
  onCancel,
  onSave,
}: ProfileFormProps) {
  const [values, setValues] =
    useState<CustomerProfileFormValues>(initialValues);

  const [errors, setErrors] = useState<ProfileFieldErrors>({});
  const [isSaving, setIsSaving] = useState(false);

  function updateField(field: keyof CustomerProfileFormValues, value: string) {
    setValues((current) => ({
      ...current,
      [field]: value,
    }));

    setErrors((current) => ({
      ...current,
      [field]: undefined,
    }));
  }

  function handleReset() {
    setValues(initialValues);
    setErrors({});
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      phone: values.phone.trim(),
    };

    const validationErrors = validateProfileValues(normalizedValues);

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSaving(true);

    try {
      onSave(normalizedValues);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white'>
      <div className='border-b border-slate-100 px-5 py-5 sm:px-6'>
        <div className='flex items-center gap-3'>
          <div className='flex size-11 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#24658A]'>
            <UserRound className='size-5' />
          </div>

          <div>
            <h2 className='font-semibold text-[#102A43]'>
              Personal information
            </h2>
            <p className='mt-1 text-sm text-slate-500'>
              Update the contact details associated with your account.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5 p-5 sm:p-6'>
        <FormField
          id='profile-name'
          label='Full name'
          value={values.name}
          placeholder='Enter your full name'
          error={errors.name}
          required
          onChange={(value) => updateField('name', value)}
        />

        <FormField
          id='profile-email'
          label='Email address'
          value={values.email}
          placeholder='you@example.com'
          error={errors.email}
          type='email'
          required
          onChange={(value) => updateField('email', value)}
        />

        <FormField
          id='profile-phone'
          label='Phone number'
          value={values.phone}
          placeholder='+63 900 000 0000'
          error={errors.phone}
          type='tel'
          onChange={(value) => updateField('phone', value)}
        />

        <div className='rounded-xl border border-[#D4EAF5] bg-[#EEF7FB] p-4'>
          <p className='text-sm font-semibold text-[#102A43]'>Demo mode</p>
          <p className='mt-1 text-xs leading-5 text-slate-600'>
            Saving updates this page&apos;s local profile state. Changes are not
            persisted to the shared mock data or a database.
          </p>
        </div>

        <div className='flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between'>
          <button
            type='button'
            onClick={handleReset}
            disabled={isSaving}
            className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
          >
            <RotateCcw className='size-4' />
            Reset fields
          </button>

          <div className='flex flex-col gap-3 sm:flex-row'>
            <button
              type='button'
              onClick={onCancel}
              disabled={isSaving}
              className='inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50'
            >
              <X className='size-4' />
              Cancel
            </button>

            <button
              type='submit'
              disabled={isSaving}
              className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#102A43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183D5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60'
            >
              {isSaving ?
                <LoaderCircle className='size-4 animate-spin' />
              : <Check className='size-4' />}
              Save changes
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
