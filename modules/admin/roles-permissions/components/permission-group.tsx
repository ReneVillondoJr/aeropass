import { Check, Eye, KeyRound, Pencil } from 'lucide-react';

import { Badge } from '@/components/ui/badge';

import type { PermissionGroup } from '../types/role';

interface PermissionGroupProps {
  group: PermissionGroup;
}

function getPermissionAction(code: string) {
  const [, action] = code.split('.');

  return action ?? 'access';
}

function getActionIcon(code: string) {
  const action = getPermissionAction(code);

  if (action === 'view') {
    return Eye;
  }

  if (
    action === 'manage' ||
    action === 'create' ||
    action === 'update' ||
    action === 'delete'
  ) {
    return Pencil;
  }

  return KeyRound;
}

export function PermissionGroupCard({ group }: PermissionGroupProps) {
  return (
    <div className='rounded-2xl border border-border/70 bg-background'>
      <div className='flex items-center justify-between gap-4 border-b border-border/60 px-4 py-3'>
        <div className='min-w-0'>
          <p className='text-xs font-semibold'>{group.label}</p>

          <p className='mt-0.5 text-[10px] text-muted-foreground'>
            {group.permissions.length}{' '}
            {group.permissions.length === 1 ? 'permission' : 'permissions'}
          </p>
        </div>

        <Badge
          variant='outline'
          className='shrink-0 border-border/70 bg-muted/30 text-[10px]'
        >
          {group.key}
        </Badge>
      </div>

      <div className='grid divide-y divide-border/60'>
        {group.permissions.map((permission) => {
          const Icon = getActionIcon(permission.code);

          return (
            <div
              key={permission.id}
              className='flex items-center gap-3 px-4 py-3'
            >
              <div className='flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted/40'>
                <Icon className='size-3.5 text-muted-foreground' />
              </div>

              <div className='min-w-0 flex-1'>
                <p className='truncate text-xs font-medium'>
                  {permission.name}
                </p>

                <p className='mt-0.5 truncate font-mono text-[10px] text-muted-foreground'>
                  {permission.code}
                </p>
              </div>

              <div className='flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-700'>
                <Check className='size-3.5' />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
