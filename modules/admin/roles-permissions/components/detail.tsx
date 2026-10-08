import { CheckCircle2, KeyRound, ShieldCheck, UsersRound } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { RoleViewModel } from '../types/role';

import { PermissionGroupCard } from './permission-group';

interface RoleDetailProps {
  role: RoleViewModel | null;
}

const roleClasses = {
  SUPER_ADMIN: 'border-violet-200 bg-violet-50 text-violet-700',
  ADMIN: 'border-blue-200 bg-blue-50 text-blue-700',
  FLIGHT_MANAGER: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  CHECK_IN_AGENT: 'border-amber-200 bg-amber-50 text-amber-700',
  GATE_AGENT: 'border-orange-200 bg-orange-50 text-orange-700',
  CUSTOMER: 'border-slate-200 bg-slate-50 text-slate-700',
} as const;

export function RoleDetail({ role }: RoleDetailProps) {
  if (!role) {
    return (
      <section className='rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
        <div className='flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-muted/50'>
            <ShieldCheck className='size-6 text-muted-foreground' />
          </div>

          <h2 className='mt-4 text-sm font-semibold'>Select a role</h2>

          <p className='mt-1 max-w-xs text-xs leading-5 text-muted-foreground'>
            Select a role from the directory to inspect its definition and
            permission catalog.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className='flex max-h-[760px] flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
      {/* Fixed role summary */}
      <div className='shrink-0 border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6'>
        <div className='flex items-start gap-4'>
          <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#E5F5FC] text-[#102A43]'>
            <ShieldCheck className='size-6' />
          </div>

          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='truncate text-lg font-semibold tracking-tight'>
                {role.name}
              </h2>

              <Badge
                variant='outline'
                className={`text-[10px] ${roleClasses[role.code]}`}
              >
                {role.code}
              </Badge>
            </div>

            <p className='mt-2 text-xs leading-5 text-muted-foreground'>
              {role.description}
            </p>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <UsersRound className='size-3.5' />
              Users
            </div>

            <p className='mt-2 text-lg font-semibold'>{role.userCount}</p>
          </div>

          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <KeyRound className='size-3.5' />
              Defined
            </div>

            <p className='mt-2 text-lg font-semibold'>{role.permissionCount}</p>
          </div>
        </div>
      </div>

      {/* Scrollable detail area */}
      <div className='min-h-0 overflow-y-auto overscroll-contain scrollbar-subtle'>
        <div className='grid gap-7 px-5 py-6 sm:px-6'>
          {/* Role definition */}
          <section>
            <div className='mb-4 flex items-center gap-2'>
              <ShieldCheck className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Role definition</h3>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  <ShieldCheck className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>{role.name}</p>

                  <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                    {role.description}
                  </p>
                </div>
              </div>

              <div className='mt-4 border-t border-border/50 pt-4'>
                <div className='flex items-center justify-between gap-4'>
                  <span className='text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
                    Role code
                  </span>

                  <span className='font-mono text-[11px] font-medium'>
                    {role.code}
                  </span>
                </div>

                <div className='mt-3 flex items-center justify-between gap-4'>
                  <span className='text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
                    Assigned users
                  </span>

                  <span className='text-xs font-semibold'>
                    {role.userCount}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Permission catalog */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center justify-between gap-4'>
              <div className='flex items-center gap-2'>
                <KeyRound className='size-4 text-muted-foreground' />

                <div>
                  <h3 className='text-sm font-semibold'>Permission catalog</h3>

                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    Available platform capabilities.
                  </p>
                </div>
              </div>

              <Badge
                variant='outline'
                className='shrink-0 border-border/60 text-[10px]'
              >
                {role.permissionCount}
              </Badge>
            </div>

            <div className='grid gap-3'>
              {role.permissionGroups.map((group) => (
                <PermissionGroupCard key={group.key} group={group} />
              ))}
            </div>
          </section>

          {/* Role usage */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <UsersRound className='size-4 text-muted-foreground' />

              <h3 className='text-sm font-semibold'>Role usage</h3>
            </div>

            <div className='grid gap-3'>
              <div className='flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/15 p-4'>
                <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-background'>
                  <UsersRound className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>Assigned accounts</p>

                  <p className='mt-1 text-[11px] text-muted-foreground'>
                    {role.userCount} {role.userCount === 1 ? 'user' : 'users'}{' '}
                    currently use this role.
                  </p>
                </div>
              </div>

              <div className='flex items-center gap-3 rounded-2xl border border-border/60 bg-muted/15 p-4'>
                <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-background'>
                  <CheckCircle2 className='size-4 text-emerald-600' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>
                    Permission definitions available
                  </p>

                  <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                    The current local database contains the centralized
                    permission catalog for this role system.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* RBAC note */}
          <div className='rounded-2xl border border-[#5BA9D6]/20 bg-[#E5F5FC]/60 p-4'>
            <div className='flex items-start gap-3'>
              <ShieldCheck className='mt-0.5 size-4 shrink-0 text-[#102A43]' />

              <div>
                <p className='text-xs font-semibold'>RBAC definition</p>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  Roles and permissions are read from the canonical AeroPass
                  mock database. A persisted role-permission assignment table
                  can be added later when the Prisma/PostgreSQL authorization
                  layer is introduced.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
