'use client';

import { ShieldCheck, UserRound, UsersRound } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  UserFilterRole,
  UserFilterStatus,
  UserRoleOption,
} from '../types/user';

interface UsersFiltersProps {
  search: string;
  status: UserFilterStatus;
  role: UserFilterRole;
  resultCount: number;
  hasFilters: boolean;
  roleOptions: UserRoleOption[];
  onSearchChange: (value: string) => void;
  onStatusChange: (value: UserFilterStatus) => void;
  onRoleChange: (value: UserFilterRole) => void;
  onReset: () => void;
}

export function UsersFilters({
  search,
  status,
  role,
  resultCount,
  hasFilters,
  roleOptions,
  onSearchChange,
  onStatusChange,
  onRoleChange,
  onReset,
}: UsersFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search name, email, employee ID, or department...'
      resultCount={resultCount}
      resultLabel='user'
      resultLabelPlural='users'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Filter accounts by status or access role.'
    >
      <AdminFilterSelect
        id='users-status'
        label='Status'
        value={status}
        onChange={(value) => onStatusChange(value as UserFilterStatus)}
        options={[
          {
            label: 'All statuses',
            value: 'ALL',
          },
          {
            label: 'Active',
            value: 'ACTIVE',
          },
          {
            label: 'Inactive',
            value: 'INACTIVE',
          },
          {
            label: 'Suspended',
            value: 'SUSPENDED',
          },
        ]}
        className='w-full sm:w-[150px]'
        icon={<UserRound className='size-3.5 shrink-0 text-muted-foreground' />}
      />

      <AdminFilterSelect
        id='users-role'
        label='Role'
        value={role}
        onChange={(value) => onRoleChange(value as UserFilterRole)}
        options={[
          {
            label: 'All roles',
            value: 'ALL',
          },
          ...roleOptions,
        ]}
        className='w-full sm:w-[220px]'
        icon={
          <ShieldCheck className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <div className='hidden items-center gap-2 rounded-xl border border-border/70 bg-background px-3 text-[10px] text-muted-foreground lg:flex'>
        <UsersRound className='size-3.5' />
        Account directory
      </div>
    </AdminFilterBar>
  );
}
