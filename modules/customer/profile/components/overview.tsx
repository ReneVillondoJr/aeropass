import {
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import type { CustomerProfile } from '../types/profile';

import {
  formatProfileDate,
  getAccountStatusLabel,
  getProfileCompletion,
} from '../data/profile';

import { ProfileAvatar } from './avatar';

interface ProfileOverviewProps {
  profile: CustomerProfile;
}

const statusStyles = {
  ACTIVE: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  INACTIVE: 'border-slate-200 bg-slate-100 text-slate-600',
  SUSPENDED: 'border-rose-200 bg-rose-50 text-rose-700',
};

export function ProfileOverview({ profile }: ProfileOverviewProps) {
  const completion = getProfileCompletion(profile);

  return (
    <div className='space-y-5'>
      <section className='overflow-hidden rounded-2xl border border-slate-200 bg-white'>
        <div className='h-24 bg-gradient-to-r from-[#102A43] via-[#1F5477] to-[#5BA9D6]' />

        <div className='px-5 pb-6 sm:px-6'>
          <div className='-mt-12 flex flex-col gap-4 sm:flex-row sm:items-end'>
            <div className='rounded-2xl border-4 border-white bg-white'>
              <ProfileAvatar
                name={profile.name}
                avatar={profile.avatar}
                size='lg'
              />
            </div>

            <div className='min-w-0 flex-1 pb-1'>
              <h2 className='break-words text-xl font-bold text-[#102A43]'>
                {profile.name}
              </h2>

              <p className='mt-1 break-all text-sm text-slate-500'>
                {profile.email}
              </p>
            </div>

            <span
              className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${statusStyles[profile.status]}`}
            >
              <span className='size-1.5 rounded-full bg-current' />
              {getAccountStatusLabel(profile.status)}
            </span>
          </div>

          <div className='mt-6 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2'>
            <div className='flex items-start gap-3'>
              <div className='rounded-xl bg-[#EEF7FB] p-2.5 text-[#24658A]'>
                <Mail className='size-4' />
              </div>

              <div className='min-w-0'>
                <p className='text-xs font-medium text-slate-500'>
                  Email address
                </p>
                <p className='mt-1 break-all text-sm font-medium text-[#102A43]'>
                  {profile.email}
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3'>
              <div className='rounded-xl bg-[#EEF7FB] p-2.5 text-[#24658A]'>
                <Phone className='size-4' />
              </div>

              <div className='min-w-0'>
                <p className='text-xs font-medium text-slate-500'>
                  Phone number
                </p>
                <p className='mt-1 text-sm font-medium text-[#102A43]'>
                  {profile.phone || 'Not provided'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className='rounded-2xl border border-slate-200 bg-white p-5 sm:p-6'>
        <div className='flex items-start justify-between gap-4'>
          <div>
            <h3 className='font-semibold text-[#102A43]'>Profile completion</h3>
            <p className='mt-1 text-sm text-slate-500'>
              Complete your basic account information.
            </p>
          </div>

          <div className='flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#24658A]'>
            <CheckCircle2 className='size-5' />
          </div>
        </div>

        <div className='mt-5 flex items-center justify-between gap-4'>
          <span className='text-sm text-slate-600'>Basic information</span>
          <span className='text-sm font-bold text-[#102A43]'>
            {completion}%
          </span>
        </div>

        <div
          className='mt-3 h-2 overflow-hidden rounded-full bg-slate-100'
          role='progressbar'
          aria-label='Profile completion'
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={completion}
        >
          <div
            className='h-full rounded-full bg-[#5BA9D6] transition-all'
            style={{ width: `${completion}%` }}
          />
        </div>

        <p className='mt-3 text-xs leading-5 text-slate-500'>
          Your completion score is based on your name, email address, and phone
          number.
        </p>
      </section>

      <section className='rounded-2xl border border-slate-200 bg-white p-5 sm:p-6'>
        <div className='flex items-center gap-3'>
          <div className='flex size-10 items-center justify-center rounded-xl bg-[#EEF7FB] text-[#24658A]'>
            <ShieldCheck className='size-5' />
          </div>

          <div>
            <h3 className='font-semibold text-[#102A43]'>
              Account information
            </h3>
            <p className='text-sm text-slate-500'>
              Your AeroPass account details
            </p>
          </div>
        </div>

        <div className='mt-5 space-y-4'>
          <div className='flex items-start gap-3'>
            <UserRound className='mt-0.5 size-4 shrink-0 text-slate-400' />

            <div className='min-w-0 flex-1'>
              <p className='text-xs text-slate-500'>Account type</p>
              <p className='mt-1 text-sm font-medium text-[#102A43]'>
                Customer
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <Clock3 className='mt-0.5 size-4 shrink-0 text-slate-400' />

            <div className='min-w-0 flex-1'>
              <p className='text-xs text-slate-500'>Member since</p>
              <p className='mt-1 text-sm font-medium text-[#102A43]'>
                {formatProfileDate(profile.createdAt)}
              </p>
            </div>
          </div>

          <div className='flex items-start gap-3'>
            <Clock3 className='mt-0.5 size-4 shrink-0 text-slate-400' />

            <div className='min-w-0 flex-1'>
              <p className='text-xs text-slate-500'>Last login</p>
              <p className='mt-1 text-sm font-medium text-[#102A43]'>
                {formatProfileDate(profile.lastLoginAt)}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
