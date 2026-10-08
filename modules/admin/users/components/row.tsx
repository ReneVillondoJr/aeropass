import {
  ArrowRight,
  Building2,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { UserViewModel } from '../types/user';

interface UserRowProps {
  user: UserViewModel;
  selected: boolean;
  onClick: () => void;
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

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

export function UserRow({ user, selected, onClick }: UserRowProps) {
  const status = statusConfig[user.status];

  return (
    <button
      type='button'
      onClick={onClick}
      className={[
        'group w-full rounded-2xl border p-4 text-left transition',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]/40',
        selected ?
          'border-[#5BA9D6]/50 bg-[#E5F5FC]/70 shadow-sm'
        : 'border-border/70 bg-card hover:border-border hover:bg-muted/20',
      ].join(' ')}
    >
      <div className='flex min-w-0 items-start gap-4'>
        <div
          className={[
            'flex size-11 shrink-0 items-center justify-center rounded-xl border text-xs font-semibold',
            selected ?
              'border-[#5BA9D6]/30 bg-white text-[#102A43]'
            : 'border-border/70 bg-muted/40 text-muted-foreground',
          ].join(' ')}
        >
          {user.avatar ?
            <img
              src={user.avatar}
              alt=''
              className='size-full rounded-xl object-cover'
            />
          : getInitials(user.name)}
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='truncate font-semibold tracking-tight'>
                  {user.name}
                </p>

                <Badge
                  variant='outline'
                  className={['text-[10px]', roleConfig[user.role]].join(' ')}
                >
                  {user.roleName}
                </Badge>
              </div>

              <p className='mt-1 truncate text-xs text-muted-foreground'>
                {user.email}
              </p>
            </div>

            <Badge
              variant='outline'
              className={[
                'shrink-0 text-[10px] font-medium',
                status.className,
              ].join(' ')}
            >
              {status.label}
            </Badge>
          </div>

          <div className='mt-4 grid gap-3 sm:grid-cols-2'>
            <div className='min-w-0'>
              <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Contact
              </p>

              <div className='mt-1 flex min-w-0 items-center gap-1.5 text-xs'>
                <Phone className='size-3.5 shrink-0 text-muted-foreground' />
                <span className='truncate'>{user.phone}</span>
              </div>
            </div>

            <div className='min-w-0'>
              <p className='text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
                Organization
              </p>

              <div className='mt-1 flex min-w-0 items-center gap-1.5 text-xs'>
                <Building2 className='size-3.5 shrink-0 text-muted-foreground' />

                <span className='truncate'>
                  {user.department ?? 'Customer account'}
                </span>
              </div>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between gap-4 border-t border-border/60 pt-3'>
            <div className='flex min-w-0 items-center gap-2'>
              <ShieldCheck className='size-3.5 shrink-0 text-muted-foreground' />

              <span className='truncate text-[11px] text-muted-foreground'>
                {user.employeeId ?? 'Customer account'}
              </span>

              {user.employeeId ?
                <>
                  <span className='text-border'>•</span>

                  <span className='truncate text-[11px] text-muted-foreground'>
                    {user.department ?? '—'}
                  </span>
                </>
              : null}
            </div>

            <ArrowRight className='size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5' />
          </div>
        </div>
      </div>
    </button>
  );
}
