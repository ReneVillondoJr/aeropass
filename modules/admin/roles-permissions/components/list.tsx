import { ShieldCheck } from 'lucide-react';

import type { RoleViewModel } from '../types/role';

import { RoleRow } from './row';

interface RolesListProps {
  roles: RoleViewModel[];
  selectedId: string | null;
  onSelect: (role: RoleViewModel) => void;
}

export function RolesList({ roles, selectedId, onSelect }: RolesListProps) {
  return (
    <section className='min-w-0 rounded-[1.5rem] border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-sm font-semibold tracking-tight'>
            Role directory
          </h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Review role scope, usage, and permission definitions.
          </p>
        </div>

        <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/50'>
          <ShieldCheck className='size-4 text-muted-foreground' />
        </div>
      </div>

      {roles.length > 0 ?
        <div className='max-h-165.5 overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {roles.map((role) => (
              <RoleRow
                key={role.id}
                role={role}
                selected={role.id === selectedId}
                onClick={() => onSelect(role)}
              />
            ))}
          </div>
        </div>
      : <div className='flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center'>
          <div className='flex size-11 items-center justify-center rounded-xl bg-background'>
            <ShieldCheck className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>No roles found</h3>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try changing your search or removing the active role filter.
          </p>
        </div>
      }
    </section>
  );
}
