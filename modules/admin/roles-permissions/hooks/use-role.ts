'use client';

import { useMemo, useState } from 'react';

import {
  buildRoleStats,
  buildRoleViewModels,
  getRoleFilterOptions,
} from '../data/role';

import { roleFilterSchema } from '../schema';

import type { RoleFilter, RoleViewModel } from '../types/role';

export function useRoles() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    role: 'ALL' as RoleFilter,
  });

  const allRoles = useMemo(() => buildRoleViewModels(), []);

  const stats = useMemo(() => buildRoleStats(allRoles), [allRoles]);

  const roleOptions = useMemo(() => getRoleFilterOptions(), []);

  const filteredRoles = useMemo(() => {
    const parsed = roleFilterSchema.safeParse(filters);

    if (!parsed.success) {
      return allRoles;
    }

    const values = parsed.data;
    const search = values.search.trim().toLowerCase();

    return allRoles.filter((item) => {
      const matchesSearch =
        !search ||
        [item.name, item.code, item.description]
          .join(' ')
          .toLowerCase()
          .includes(search);

      const matchesRole = values.role === 'ALL' || item.code === values.role;

      return matchesSearch && matchesRole;
    });
  }, [allRoles, filters]);

  const selectedRole =
    filteredRoles.find((item) => item.id === selectedId) ?? null;

  const hasFilters = filters.search.trim().length > 0 || filters.role !== 'ALL';

  function setSearch(search: string) {
    setFilters((current) => ({
      ...current,
      search,
    }));
  }

  function setRole(role: RoleFilter) {
    setFilters((current) => ({
      ...current,
      role,
    }));
  }

  function resetFilters() {
    setFilters({
      search: '',
      role: 'ALL',
    });
  }

  function selectRole(role: RoleViewModel) {
    setSelectedId(role.id);
  }

  return {
    roles: filteredRoles,
    allRoles,
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
  };
}
