'use client';

import { UsersFilters } from './components/filters';
import { UserDetail } from './components/detail';
import { UsersHeader } from './components/header';
import { UsersList } from './components/list';
import { UsersStats } from './components/stats';
import { useUsers } from './hooks/use-user';

export function Users() {
  const {
    users,
    selectedUser,
    selectedId,
    stats,
    roleOptions,
    filters,
    hasFilters,
    setSearch,
    setStatus,
    setRole,
    resetFilters,
    selectUser,
  } = useUsers();

  return (
    <div className='flex flex-col gap-6'>
      <UsersHeader stats={stats} />

      <UsersStats stats={stats} />

      <UsersFilters
        search={filters.search}
        status={filters.status}
        role={filters.role}
        resultCount={users.length}
        hasFilters={hasFilters}
        roleOptions={roleOptions}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onRoleChange={setRole}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <UsersList
          users={users}
          selectedId={selectedId}
          onSelect={selectUser}
        />

        <UserDetail user={selectedUser} />
      </div>
    </div>
  );
}
