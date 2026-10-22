import { ArrowLeft, ShieldCheck, UserRound } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  onEdit: () => void;
}

export function ProfileHeader({ name, onEdit }: ProfileHeaderProps) {
  return (
    <section className='relative overflow-hidden rounded-3xl border border-slate-200 bg-white'>
      <div className='absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-[#EEF7FB] to-transparent md:block' />

      <div className='relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between'>
        <div className='space-y-3'>
          <div className='inline-flex items-center gap-2 rounded-full border border-[#D4EAF5] bg-[#EEF7FB] px-3 py-1.5 text-xs font-semibold text-[#102A43]'>
            <UserRound className='size-3.5' />
            CUSTOMER ACCOUNT
          </div>

          <div>
            <h1 className='text-2xl font-bold tracking-tight text-[#102A43] sm:text-3xl'>
              My Profile
            </h1>

            <p className='mt-2 max-w-xl text-sm leading-6 text-slate-500 sm:text-base'>
              Manage your account information and keep your AeroPass contact
              details up to date.
            </p>
          </div>

          <p className='text-sm text-slate-600'>
            Welcome back,{' '}
            <span className='font-semibold text-[#102A43]'>{name}</span>
          </p>
        </div>

        <div className='flex flex-col gap-3 sm:flex-row lg:items-center'>
          <div className='flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-800'>
            <ShieldCheck className='size-5 shrink-0' />
            <span className='font-medium'>Account information</span>
          </div>

          <button
            type='button'
            onClick={onEdit}
            className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#102A43] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#183D5B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
          >
            Edit profile
            <ArrowLeft className='size-4 rotate-180' />
          </button>
        </div>
      </div>
    </section>
  );
}
