import { UsersRound } from 'lucide-react';

import type { UserViewModel } from '../types/user';

import { UserRow } from './row';

interface UsersListProps {
  users: UserViewModel[];
  selectedId: string | null;
  onSelect: (user: UserViewModel) => void;
}

export function UsersList({ users, selectedId, onSelect }: UsersListProps) {
  return (
    <section className='min-w-0 rounded-[1.5rem] border border-border/70 bg-card p-4 shadow-sm sm:p-5'>
      <div className='mb-4 flex items-center justify-between gap-4'>
        <div>
          <h2 className='text-sm font-semibold tracking-tight'>
            User directory
          </h2>

          <p className='mt-1 text-xs text-muted-foreground'>
            Review account identity, role, department, and status.
          </p>
        </div>

        <div className='flex size-9 shrink-0 items-center justify-center rounded-xl bg-muted/50'>
          <UsersRound className='size-4 text-muted-foreground' />
        </div>
      </div>

      {users.length > 0 ?
        <div className='max-h-[640px] overflow-y-auto overscroll-contain pr-1'>
          <div className='grid min-w-0 gap-3'>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                selected={user.id === selectedId}
                onClick={() => onSelect(user)}
              />
            ))}
          </div>
        </div>
      : <div className='flex min-h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 text-center'>
          <div className='flex size-11 items-center justify-center rounded-xl bg-background'>
            <UsersRound className='size-5 text-muted-foreground' />
          </div>

          <h3 className='mt-4 text-sm font-semibold'>No users found</h3>

          <p className='mt-1 max-w-sm text-xs leading-5 text-muted-foreground'>
            Try changing your search or removing one of the active account
            filters.
          </p>
        </div>
      }
    </section>
  );
}
