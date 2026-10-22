import { CalendarDays, Copy, Fingerprint, ShieldCheck } from 'lucide-react';

import { useState } from 'react';

import type { CustomerProfile } from '../types/profile';

import { formatProfileDate, getAccountStatusLabel } from '../data/profile';

interface ProfileAccountDetailsProps {
  profile: CustomerProfile;
}

const statusStyles = {
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  INACTIVE: 'bg-slate-100 text-slate-600',
  SUSPENDED: 'bg-rose-50 text-rose-700',
};

export function ProfileAccountDetails({ profile }: ProfileAccountDetailsProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopyId() {
    try {
      await navigator.clipboard.writeText(profile.id);
      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className='rounded-2xl border border-slate-200 bg-white p-5 sm:p-6'>
      <div className='flex items-center gap-3'>
        <div className='flex size-11 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#24658A]'>
          <Fingerprint className='size-5' />
        </div>

        <div>
          <h2 className='font-semibold text-[#102A43]'>Account details</h2>
          <p className='mt-1 text-sm text-slate-500'>
            Information linked to your AeroPass account.
          </p>
        </div>
      </div>

      <div className='mt-5 divide-y divide-slate-100'>
        <div className='flex items-start justify-between gap-4 py-4'>
          <div className='flex items-start gap-3'>
            <Fingerprint className='mt-0.5 size-4 shrink-0 text-slate-400' />

            <div>
              <p className='text-xs text-slate-500'>Customer ID</p>
              <p className='mt-1 break-all font-mono text-sm font-medium text-[#102A43]'>
                {profile.id}
              </p>
            </div>
          </div>

          <button
            type='button'
            onClick={() => void handleCopyId()}
            aria-label='Copy customer ID'
            className='inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50'
          >
            <Copy className='size-3.5' />
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>

        <div className='flex items-start justify-between gap-4 py-4'>
          <div className='flex items-start gap-3'>
            <ShieldCheck className='mt-0.5 size-4 shrink-0 text-slate-400' />

            <div>
              <p className='text-xs text-slate-500'>Account status</p>
              <p className='mt-1 text-sm font-medium text-[#102A43]'>
                {getAccountStatusLabel(profile.status)}
              </p>
            </div>
          </div>

          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[profile.status]}`}
          >
            {profile.status}
          </span>
        </div>

        <div className='flex items-start gap-3 py-4'>
          <CalendarDays className='mt-0.5 size-4 shrink-0 text-slate-400' />

          <div>
            <p className='text-xs text-slate-500'>Date joined</p>
            <p className='mt-1 text-sm font-medium text-[#102A43]'>
              {formatProfileDate(profile.createdAt)}
            </p>
          </div>
        </div>
      </div>

      <p className='mt-2 rounded-xl bg-slate-50 p-3 text-xs leading-5 text-slate-500'>
        Your customer ID identifies your account within this demo application.
        Keep it available when referencing your account.
      </p>
    </section>
  );
}
