'use client';

import { RolesFilters } from './components/filters';
import { RoleDetail } from './components/detail';
import { RolesHeader } from './components/header';
import { RolesList } from './components/list';
import { RolesStats } from './components/stats';
import { useRoles } from './hooks/use-role';

export function Roles() {
  const {
    roles,
    selectedRole,
    selectedId,
    stats,
    roleOptions,
    filters,
    hasFilters,
    setSearch,
    setRole,
    resetFilters,
    selectRole,
  } = useRoles();

  return (
    <div className='flex flex-col gap-6'>
      <RolesHeader stats={stats} />

      <RolesStats stats={stats} />

      <RolesFilters
        search={filters.search}
        role={filters.role}
        resultCount={roles.length}
        hasFilters={hasFilters}
        roleOptions={roleOptions}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <RolesList
          roles={roles}
          selectedId={selectedId}
          onSelect={selectRole}
        />

        <RoleDetail role={selectedRole} />
      </div>
    </div>
  );
}
