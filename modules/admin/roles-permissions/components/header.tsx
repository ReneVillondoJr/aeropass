import { KeyRound, ShieldCheck, UsersRound } from 'lucide-react';

import type { RoleStats } from '../types/role';

interface RolesHeaderProps {
  stats: RoleStats;
}

export function RolesHeader({ stats }: RolesHeaderProps) {
  return (
    <section className='overflow-hidden rounded-[1.75rem] bg-[#102A43] text-white shadow-sm'>
      <div className='relative px-6 py-7 sm:px-8'>
        <div className='absolute -right-16 -top-20 size-48 rounded-full bg-[#5BA9D6]/10 blur-3xl' />
        <div className='absolute -bottom-24 left-1/3 size-56 rounded-full bg-white/5 blur-3xl' />

        <div className='relative flex flex-col gap-7'>
          <div className='flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-2xl'>
              <div className='mb-3 flex items-center gap-2 text-[#9FD5EE]'>
                <ShieldCheck className='size-4' />

                <span className='text-[11px] font-semibold uppercase tracking-[0.18em]'>
                  Platform Security
                </span>
              </div>

              <h1 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
                Roles & Permissions
              </h1>

              <p className='mt-2 max-w-xl text-sm leading-6 text-white/65'>
                Review AeroPass access roles and the centralized permission
                catalog used across the platform.
              </p>
            </div>

            <div className='flex flex-wrap items-center gap-2 text-xs text-white/60'>
              <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2'>
                <ShieldCheck className='size-3.5' />
                {stats.totalRoles} roles
              </div>

              <div className='flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2'>
                <KeyRound className='size-3.5' />
                {stats.totalPermissions} permissions
              </div>
            </div>
          </div>

          <div className='grid gap-2 sm:grid-cols-3'>
            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <ShieldCheck className='size-3.5' />
                Defined roles
              </div>

              <p className='mt-2 text-xl font-semibold'>{stats.totalRoles}</p>

              <p className='mt-1 text-[11px] text-white/45'>
                Access profiles configured
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <KeyRound className='size-3.5' />
                Permission catalog
              </div>

              <p className='mt-2 text-xl font-semibold'>
                {stats.totalPermissions}
              </p>

              <p className='mt-1 text-[11px] text-white/45'>
                Platform capabilities defined
              </p>
            </div>

            <div className='rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-2 text-xs text-white/50'>
                <UsersRound className='size-3.5' />
                Users covered
              </div>

              <p className='mt-2 text-xl font-semibold'>{stats.usersCovered}</p>

              <p className='mt-1 text-[11px] text-white/45'>
                Accounts using these roles
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
