'use client';

import { useMemo, useState } from 'react';

import { AlertCircle, CheckCircle2, UserRound } from 'lucide-react';

import { getCustomerProfile } from './data/profile';

import { getInitialProfileValues } from './data/profile';

import type {
  CustomerProfile,
  CustomerProfileFormValues,
} from './types/profile';

import { ProfileHeader } from './components/header';
import { ProfileOverview } from './components/overview';
import { ProfileForm } from './components/form';
import { ProfileAccountDetails } from './components/account-details';

interface CustomerProfileModuleProps {
  customerId: string;
}

export function CustomerProfileModule({
  customerId,
}: CustomerProfileModuleProps) {
  const canonicalProfile = useMemo(
    () => getCustomerProfile(customerId),
    [customerId],
  );

  const [localProfile, setLocalProfile] = useState<CustomerProfile | null>(
    canonicalProfile,
  );

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const profile = localProfile;

  const initialValues = useMemo(
    () => (profile ? getInitialProfileValues(profile) : null),
    [profile],
  );

  if (!profile || !initialValues) {
    return (
      <section className='flex min-h-[420px] items-center justify-center p-6'>
        <div className='w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center'>
          <div className='mx-auto flex size-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-500'>
            <UserRound className='size-7' />
          </div>

          <h1 className='mt-5 text-xl font-bold text-[#102A43]'>
            Profile unavailable
          </h1>

          <p className='mt-2 text-sm leading-6 text-slate-500'>
            We couldn&apos;t find a customer account associated with this
            profile. Please check the customer ID and try again.
          </p>
        </div>
      </section>
    );
  }

  function handleSave(values: CustomerProfileFormValues) {
    setLocalProfile((current) => {
      if (!current) {
        return current;
      }

      return {
        ...current,
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
    });

    setIsEditing(false);
    setShowSuccess(true);
  }

  function handleCancel() {
    setIsEditing(false);
  }

  return (
    <section className='mx-auto w-full max-w-7xl space-y-6 p-4 sm:p-6 lg:p-8'>
      <ProfileHeader
        name={profile.name}
        onEdit={() => {
          setShowSuccess(false);
          setIsEditing(true);
        }}
      />

      {showSuccess && (
        <div
          role='status'
          className='flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4'
        >
          <CheckCircle2 className='mt-0.5 size-5 shrink-0 text-emerald-600' />

          <div className='min-w-0 flex-1'>
            <p className='text-sm font-semibold text-emerald-800'>
              Profile updated
            </p>

            <p className='mt-1 text-sm leading-5 text-emerald-700'>
              Your profile has been updated in the current demo session. Changes
              are not saved to the canonical mock data or a database.
            </p>
          </div>

          <button
            type='button'
            onClick={() => setShowSuccess(false)}
            aria-label='Dismiss success message'
            className='rounded-lg p-1 text-emerald-700 transition hover:bg-emerald-100'
          >
            <AlertCircle className='size-4' />
          </button>
        </div>
      )}

      <div className='grid items-start gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]'>
        <div className='min-w-0 space-y-6'>
          {isEditing ?
            <ProfileForm
              key={`${profile.id}-profile-form`}
              initialValues={initialValues}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          : <ProfileOverview profile={profile} />}
        </div>

        <div className='min-w-0 space-y-6 xl:sticky xl:top-6'>
          <ProfileAccountDetails profile={profile} />

          <section className='rounded-2xl border border-[#D4EAF5] bg-[#EEF7FB] p-5 sm:p-6'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-xl bg-white text-[#24658A]'>
                <UserRound className='size-5' />
              </div>

              <h2 className='font-semibold text-[#102A43]'>
                Keep your profile up to date
              </h2>
            </div>

            <p className='mt-3 text-sm leading-6 text-slate-600'>
              Use your current contact information so your account details stay
              accurate. Passenger details for individual trips belong in the
              separate passenger management section.
            </p>

            {!isEditing && (
              <button
                type='button'
                onClick={() => {
                  setShowSuccess(false);
                  setIsEditing(true);
                }}
                className='mt-4 inline-flex items-center justify-center rounded-xl border border-[#C5E3F2] bg-white px-4 py-2.5 text-sm font-semibold text-[#102A43] transition hover:bg-[#F8FCFE]'
              >
                Update information
              </button>
            )}
          </section>
        </div>
      </div>
    </section>
  );
}
