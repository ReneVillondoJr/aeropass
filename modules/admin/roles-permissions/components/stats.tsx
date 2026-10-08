import { KeyRound, ShieldCheck, UsersRound } from 'lucide-react';

import type { RoleStats } from '../types/role';

interface RolesStatsProps {
  stats: RoleStats;
}

function StatCard({
  icon: Icon,
  label,
  value,
  helper,
  iconClassName = 'text-muted-foreground',
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string | number;
  helper: string;
  iconClassName?: string;
}) {
  return (
    <div className='rounded-[1.5rem] border border-border/70 bg-card p-5 shadow-sm'>
      <div className='flex items-start justify-between gap-4'>
        <div>
          <p className='text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground'>
            {label}
          </p>

          <p className='mt-2 text-2xl font-semibold tracking-tight'>{value}</p>

          <p className='mt-1 text-xs text-muted-foreground'>{helper}</p>
        </div>

        <div className='rounded-xl border border-border/70 bg-muted/40 p-2.5'>
          <Icon className={`size-4 ${iconClassName}`} />
        </div>
      </div>
    </div>
  );
}

export function RolesStats({ stats }: RolesStatsProps) {
  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-4'>
      <StatCard
        icon={ShieldCheck}
        label='Roles'
        value={stats.totalRoles}
        helper='Configured access profiles'
        iconClassName='text-[#102A43]'
      />

      <StatCard
        icon={KeyRound}
        label='Permissions'
        value={stats.totalPermissions}
        helper='Central permission definitions'
      />

      <StatCard
        icon={ShieldCheck}
        label='Roles in use'
        value={stats.rolesInUse}
        helper='Roles assigned to users'
        iconClassName='text-emerald-600'
      />

      <StatCard
        icon={UsersRound}
        label='Users covered'
        value={stats.usersCovered}
        helper='Accounts using platform roles'
      />
    </section>
  );
}
