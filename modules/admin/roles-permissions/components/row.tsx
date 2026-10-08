import { ArrowRight, KeyRound, ShieldCheck, UsersRound } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { RoleViewModel } from '../types/role';

interface RoleRowProps {
  role: RoleViewModel;
  selected: boolean;
  onClick: () => void;
}

const roleClasses = {
  SUPER_ADMIN: 'border-violet-200 bg-violet-50 text-violet-700',
  ADMIN: 'border-blue-200 bg-blue-50 text-blue-700',
  FLIGHT_MANAGER: 'border-cyan-200 bg-cyan-50 text-cyan-700',
  CHECK_IN_AGENT: 'border-amber-200 bg-amber-50 text-amber-700',
  GATE_AGENT: 'border-orange-200 bg-orange-50 text-orange-700',
  CUSTOMER: 'border-slate-200 bg-slate-50 text-slate-700',
} as const;

export function RoleRow({ role, selected, onClick }: RoleRowProps) {
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
            'flex size-11 shrink-0 items-center justify-center rounded-xl border',
            selected ?
              'border-[#5BA9D6]/30 bg-white text-[#102A43]'
            : 'border-border/70 bg-muted/40 text-muted-foreground',
          ].join(' ')}
        >
          <ShieldCheck className='size-5' />
        </div>

        <div className='min-w-0 flex-1'>
          <div className='flex flex-wrap items-start justify-between gap-2'>
            <div className='min-w-0'>
              <div className='flex flex-wrap items-center gap-2'>
                <p className='truncate font-semibold tracking-tight'>
                  {role.name}
                </p>

                <Badge
                  variant='outline'
                  className={['text-[10px]', roleClasses[role.code]].join(' ')}
                >
                  {role.code}
                </Badge>
              </div>

              <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                {role.description}
              </p>
            </div>
          </div>

          <div className='mt-4 grid gap-3 sm:grid-cols-2'>
            <div className='rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5'>
              <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
                <UsersRound className='size-3.5' />
                Users
              </div>

              <p className='mt-1 text-sm font-semibold'>{role.userCount}</p>
            </div>

            <div className='rounded-xl border border-border/60 bg-muted/20 px-3 py-2.5'>
              <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.12em] text-muted-foreground'>
                <KeyRound className='size-3.5' />
                Catalog
              </div>

              <p className='mt-1 text-sm font-semibold'>
                {role.permissionCount}
              </p>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between gap-4 border-t border-border/60 pt-3'>
            <span className='text-[11px] text-muted-foreground'>
              Review role definition
            </span>

            <ArrowRight className='size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5' />
          </div>
        </div>
      </div>
    </button>
  );
}
