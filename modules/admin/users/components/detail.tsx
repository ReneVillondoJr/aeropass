import {
  Activity,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { UserViewModel } from '../types/user';

interface UserDetailProps {
  user: UserViewModel | null;
}

const statusConfig = {
  ACTIVE: {
    label: 'Active',
    className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  INACTIVE: {
    label: 'Inactive',
    className: 'border-slate-200 bg-slate-50 text-slate-700',
  },
  SUSPENDED: {
    label: 'Suspended',
    className: 'border-rose-200 bg-rose-50 text-rose-700',
  },
} as const;

const roleConfig = {
  SUPER_ADMIN: 'border-violet-200 bg-violet-50 text-violet-700',
  ADMIN: 'border-blue-200 bg-blue-50 text-blue-700',
  FLIGHT_MANAGER: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  CHECK_IN_AGENT: 'border-amber-200 bg-amber-50 text-amber-700',
  GATE_AGENT: 'border-orange-200 bg-orange-50 text-orange-700',
  CUSTOMER: 'border-slate-200 bg-slate-50 text-slate-700',
} as const;

function formatDate(value: string | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return '—';
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function DetailItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: typeof UserRound;
}) {
  return (
    <div className='min-w-0'>
      <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
        {label}
      </p>

      <div className='mt-1 flex min-w-0 items-center gap-2'>
        {Icon ?
          <Icon className='size-3.5 shrink-0 text-muted-foreground' />
        : null}

        <p className='truncate text-xs font-medium'>{value}</p>
      </div>
    </div>
  );
}

function ActivityCard({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof CalendarDays;
  title: string;
  description: string;
}) {
  return (
    <div className='flex gap-3 rounded-2xl border border-border/60 bg-muted/15 p-4'>
      <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-background'>
        <Icon className='size-4 text-muted-foreground' />
      </div>

      <div className='min-w-0'>
        <p className='text-xs font-semibold'>{title}</p>
        <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  );
}

export function UserDetail({ user }: UserDetailProps) {
  if (!user) {
    return (
      <section className='rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
        <div className='flex min-h-[420px] flex-col items-center justify-center px-6 py-10 text-center'>
          <div className='flex size-12 items-center justify-center rounded-2xl bg-muted/50'>
            <UsersRound className='size-6 text-muted-foreground' />
          </div>

          <h2 className='mt-4 text-sm font-semibold'>Select a user</h2>

          <p className='mt-1 max-w-xs text-xs leading-5 text-muted-foreground'>
            Select an account from the directory to inspect its identity, role,
            status, and access information.
          </p>
        </div>
      </section>
    );
  }

  const status = statusConfig[user.status];
  const roleClassName = roleConfig[user.role];

  return (
    <section className='flex max-h-[760px] flex-col overflow-hidden rounded-[1.5rem] border border-border/70 bg-card shadow-sm xl:sticky xl:top-6'>
      {/* Fixed account summary */}
      <div className='shrink-0 border-b border-border/70 bg-muted/20 px-5 py-5 sm:px-6'>
        <div className='flex items-start gap-4'>
          <div className='flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-[#E5F5FC] text-sm font-semibold text-[#102A43]'>
            {user.avatar ?
              <img
                src={user.avatar}
                alt=''
                className='size-full rounded-2xl object-cover'
              />
            : getInitials(user.name)}
          </div>

          <div className='min-w-0 flex-1'>
            <div className='flex flex-wrap items-center gap-2'>
              <h2 className='truncate text-lg font-semibold tracking-tight'>
                {user.name}
              </h2>

              <Badge
                variant='outline'
                className={`text-[10px] ${status.className}`}
              >
                {status.label}
              </Badge>
            </div>

            <p className='mt-1 truncate text-xs text-muted-foreground'>
              {user.email}
            </p>

            <Badge
              variant='outline'
              className={`mt-3 text-[10px] ${roleClassName}`}
            >
              <ShieldCheck className='mr-1 size-3' />
              {user.roleName}
            </Badge>
          </div>
        </div>

        <div className='mt-5 grid grid-cols-2 gap-3'>
          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <CheckCircle2 className='size-3.5' />
              Status
            </div>

            <p className='mt-2 text-sm font-semibold'>{status.label}</p>
          </div>

          <div className='rounded-xl border border-border/60 bg-background/80 p-3'>
            <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
              <Clock3 className='size-3.5' />
              Last login
            </div>

            <p className='mt-2 truncate text-sm font-semibold'>
              {user.lastLoginAt ? formatDate(user.lastLoginAt) : 'Never'}
            </p>
          </div>
        </div>
      </div>

      {/* Scrollable detail area */}
      <div className='min-h-0 overflow-y-auto overscroll-contain scrollbar-subtle'>
        <div className='grid gap-7 px-5 py-6 sm:px-6'>
          {/* Account identity */}
          <section>
            <div className='mb-4 flex items-center gap-2'>
              <UserRound className='size-4 text-muted-foreground' />
              <h3 className='text-sm font-semibold'>Account identity</h3>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <DetailItem
                label='Full name'
                value={user.name}
                icon={UserRound}
              />

              <DetailItem
                label='Employee ID'
                value={user.employeeId ?? 'Customer account'}
              />

              <DetailItem label='Email' value={user.email} icon={Mail} />

              <DetailItem label='Phone' value={user.phone} icon={Phone} />

              <DetailItem
                label='Department'
                value={user.department ?? 'Customer'}
              />

              <DetailItem label='User ID' value={user.id} />
            </div>
          </section>

          {/* Access & role */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center justify-between gap-4'>
              <div className='flex items-center gap-2'>
                <ShieldCheck className='size-4 text-muted-foreground' />

                <div>
                  <h3 className='text-sm font-semibold'>Access & role</h3>

                  <p className='mt-1 text-[10px] text-muted-foreground'>
                    Assigned access definition for this account.
                  </p>
                </div>
              </div>

              <Badge
                variant='outline'
                className={`shrink-0 text-[10px] ${roleClassName}`}
              >
                {user.role}
              </Badge>
            </div>

            <div className='rounded-2xl border border-border/60 bg-muted/15 p-4'>
              <div className='flex items-start gap-3'>
                <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-background'>
                  <ShieldCheck className='size-4 text-muted-foreground' />
                </div>

                <div className='min-w-0'>
                  <p className='text-xs font-semibold'>{user.roleName}</p>

                  <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                    {user.roleDescription}
                  </p>
                </div>
              </div>

              <div className='mt-4 border-t border-border/50 pt-4'>
                <div className='flex items-center justify-between gap-4'>
                  <span className='text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
                    Role code
                  </span>

                  <span className='font-mono text-[11px] font-medium'>
                    {user.role}
                  </span>
                </div>

                <div className='mt-3 flex items-center justify-between gap-4'>
                  <span className='text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
                    Account status
                  </span>

                  <Badge
                    variant='outline'
                    className={`text-[10px] ${status.className}`}
                  >
                    {status.label}
                  </Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Account activity */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <Activity className='size-4 text-muted-foreground' />
              <h3 className='text-sm font-semibold'>Account activity</h3>
            </div>

            <div className='grid gap-3'>
              <ActivityCard
                icon={CalendarDays}
                title='Account created'
                description={formatDateTime(user.createdAt)}
              />

              <ActivityCard
                icon={Clock3}
                title='Last login'
                description={
                  user.lastLoginAt ?
                    formatDateTime(user.lastLoginAt)
                  : 'This account has not logged in yet.'
                }
              />

              <ActivityCard
                icon={CheckCircle2}
                title='Current account status'
                description={`${status.label} account${
                  user.lastLoginAt ?
                    ` • Last active ${formatDate(user.lastLoginAt)}`
                  : ''
                }`}
              />
            </div>
          </section>

          {/* Account summary */}
          <section className='border-t border-border/60 pt-7'>
            <div className='mb-4 flex items-center gap-2'>
              <UsersRound className='size-4 text-muted-foreground' />
              <h3 className='text-sm font-semibold'>Account summary</h3>
            </div>

            <div className='grid gap-4 sm:grid-cols-2'>
              <DetailItem
                label='Status'
                value={status.label}
                icon={CheckCircle2}
              />

              <DetailItem
                label='Role'
                value={user.roleName}
                icon={ShieldCheck}
              />

              <DetailItem
                label='Department'
                value={user.department ?? 'Customer'}
              />

              <DetailItem
                label='Created'
                value={formatDate(user.createdAt)}
                icon={CalendarDays}
              />
            </div>
          </section>

          {/* Access status note */}
          <div
            className={[
              'rounded-2xl border p-4',
              user.status === 'ACTIVE' ? 'border-emerald-200 bg-emerald-50'
              : user.status === 'SUSPENDED' ? 'border-rose-200 bg-rose-50'
              : 'border-border/70 bg-muted/20',
            ].join(' ')}
          >
            <div className='flex items-start gap-3'>
              <ShieldCheck className='mt-0.5 size-4 shrink-0' />

              <div>
                <p className='text-xs font-semibold'>
                  Account access: {status.label}
                </p>

                <p className='mt-1 text-[11px] leading-5 text-muted-foreground'>
                  {user.status === 'ACTIVE' ?
                    'This account is currently enabled according to the local AeroPass user directory.'
                  : user.status === 'SUSPENDED' ?
                    'This account is suspended and should be reviewed before access is restored.'
                  : 'This account is inactive and is not currently enabled for normal access.'
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
