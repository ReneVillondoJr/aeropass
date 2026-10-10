'use client';

import { useMemo, useState } from 'react';

import {
  buildActivityLogStats,
  buildActivityLogViewModels,
  getActivityActionOptions,
  getActivityEntityOptions,
} from '../data/activity-log';

import { activityLogFilterSchema } from '../schema';

import type {
  ActivityActionFilter,
  ActivityEntityFilter,
  ActivityLogViewModel,
} from '../types/activity-log';

export function useActivityLogs() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    search: '',
    action: 'ALL' as ActivityActionFilter,
    entity: 'ALL' as ActivityEntityFilter,
  });

  const allActivityLogs = useMemo(() => buildActivityLogViewModels(), []);

  const stats = useMemo(
    () => buildActivityLogStats(allActivityLogs),
    [allActivityLogs],
  );

  const actionOptions = useMemo(
    () => getActivityActionOptions(allActivityLogs),
    [allActivityLogs],
  );

  const entityOptions = useMemo(
    () => getActivityEntityOptions(allActivityLogs),
    [allActivityLogs],
  );

  const filteredActivityLogs = useMemo(() => {
    const parsed = activityLogFilterSchema.safeParse(filters);

    if (!parsed.success) {
      return allActivityLogs;
    }

    const values = parsed.data;
    const search = values.search.trim().toLowerCase();

    return allActivityLogs.filter((item) => {
      const matchesSearch =
        !search ||
        [
          item.id,
          item.userId,
          item.actorName,
          item.actorEmail,
          item.actorRole ?? '',
          item.action,
          item.entity,
          item.entityId ?? '',
          item.description,
        ]
          .join(' ')
          .toLowerCase()
          .includes(search);

      const matchesAction =
        values.action === 'ALL' || item.action === values.action;

      const matchesEntity =
        values.entity === 'ALL' || item.entity === values.entity;

      return matchesSearch && matchesAction && matchesEntity;
    });
  }, [allActivityLogs, filters]);

  const selectedActivityLog =
    filteredActivityLogs.find((item) => item.id === selectedId) ?? null;

  const hasFilters =
    filters.search.trim().length > 0 ||
    filters.action !== 'ALL' ||
    filters.entity !== 'ALL';

  function setSearch(search: string) {
    setFilters((current) => ({
      ...current,
      search,
    }));
  }

  function setAction(action: ActivityActionFilter) {
    setFilters((current) => ({
      ...current,
      action,
    }));
  }

  function setEntity(entity: ActivityEntityFilter) {
    setFilters((current) => ({
      ...current,
      entity,
    }));
  }

  function resetFilters() {
    setFilters({
      search: '',
      action: 'ALL',
      entity: 'ALL',
    });
  }

  function selectActivityLog(item: ActivityLogViewModel) {
    setSelectedId(item.id);
  }

  return {
    activityLogs: filteredActivityLogs,
    allActivityLogs,
    selectedActivityLog,
    selectedId,
    stats,
    actionOptions,
    entityOptions,
    filters,
    hasFilters,
    setSearch,
    setAction,
    setEntity,
    resetFilters,
    selectActivityLog,
  };
}
