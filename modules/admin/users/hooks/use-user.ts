'use client';

import { useMemo, useState } from 'react';

import {
  buildUserStats,
  buildUserViewModels,
  getUserRoleOptions,
} from '../data/user';

import { userFilterSchema } from '../schema';

import type {
  UserFilterRole,
  UserFilterStatus,
  UserViewModel,
} from '../types/user';

export function useUsers() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    status: 'ALL' as UserFilterStatus,
    role: 'ALL' as UserFilterRole,
  });

  const allUsers = useMemo(() => buildUserViewModels(), []);

  const stats = useMemo(() => buildUserStats(allUsers), [allUsers]);

  const roleOptions = useMemo(() => getUserRoleOptions(), []);

  const filteredUsers = useMemo(() => {
    const parsed = userFilterSchema.safeParse(filters);

    if (!parsed.success) {
      return allUsers;
    }

    const values = parsed.data;
    const search = values.search.trim().toLowerCase();

    return allUsers.filter((item) => {
      const matchesSearch =
        !search ||
        [
          item.name,
          item.email,
          item.phone,
          item.role,
          item.roleName,
          item.department ?? '',
          item.employeeId ?? '',
          item.roleDescription,
        ]
          .join(' ')
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        values.status === 'ALL' || item.status === values.status;

      const matchesRole = values.role === 'ALL' || item.role === values.role;

      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [allUsers, filters]);

  const selectedUser =
    filteredUsers.find((item) => item.id === selectedId) ?? null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.status !== 'ALL' ||
    filters.role !== 'ALL';

  function setSearch(search: string) {
    setFilters((current) => ({
      ...current,
      search,
    }));
  }

  function setStatus(status: UserFilterStatus) {
    setFilters((current) => ({
      ...current,
      status,
    }));
  }

  function setRole(role: UserFilterRole) {
    setFilters((current) => ({
      ...current,
      role,
    }));
  }

  function resetFilters() {
    setFilters({
      search: '',
      status: 'ALL',
      role: 'ALL',
    });
  }

  function selectUser(user: UserViewModel) {
    setSelectedId(user.id);
  }

  return {
    users: filteredUsers,
    allUsers,
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
  };
}
