'use client';

import { KeyRound, ShieldCheck, UsersRound } from 'lucide-react';

import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type { RoleFilter, RoleFilterOption } from '../types/role';

interface RolesFiltersProps {
  search: string;
  role: RoleFilter;
  resultCount: number;
  hasFilters: boolean;
  roleOptions: RoleFilterOption[];
  onSearchChange: (value: string) => void;
  onRoleChange: (value: RoleFilter) => void;
  onReset: () => void;
}

export function RolesFilters({
  search,
  role,
  resultCount,
  hasFilters,
  roleOptions,
  onSearchChange,
  onRoleChange,
  onReset,
}: RolesFiltersProps) {
  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search role name, code, or description...'
      resultCount={resultCount}
      resultLabel='role'
      resultLabelPlural='roles'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Review access profiles and their permission catalog.'
    >
      <AdminFilterSelect
        id='roles-role'
        label='Role'
        value={role}
        onChange={(value) => onRoleChange(value as RoleFilter)}
        options={[
          {
            label: 'All roles',
            value: 'ALL',
          },
          ...roleOptions,
        ]}
        className='w-full sm:w-[240px]'
        icon={
          <ShieldCheck className='size-3.5 shrink-0 text-muted-foreground' />
        }
      />

      <div className='hidden items-center gap-2 rounded-xl border border-border/70 bg-background px-3 text-[10px] text-muted-foreground lg:flex'>
        <KeyRound className='size-3.5' />
        Permission catalog
      </div>

      <div className='hidden items-center gap-2 rounded-xl border border-border/70 bg-background px-3 text-[10px] text-muted-foreground 2xl:flex'>
        <UsersRound className='size-3.5' />
        RBAC
      </div>
    </AdminFilterBar>
  );
}
