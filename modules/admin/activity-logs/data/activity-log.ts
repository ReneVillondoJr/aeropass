import { activityLogs, getUserById } from '@/data/aeropass';

import type {
  ActivityFilterOption,
  ActivityLogStats,
  ActivityLogViewModel,
} from '../types/activity-log';

function formatOptionLabel(value: string) {
  return value
    .split('_')
    .filter(Boolean)
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(' ');
}

export function buildActivityLogViewModels(): ActivityLogViewModel[] {
  return activityLogs
    .map((log) => {
      const actor = getUserById(log.userId);

      return {
        id: log.id,
        userId: log.userId,
        actorName: actor?.name ?? 'Unknown user',
        actorEmail: actor?.email ?? '—',
        actorRole: actor?.role ?? null,

        action: log.action,
        entity: log.entity,
        entityId: log.entityId ?? null,
        description: log.description,
        createdAt: log.createdAt,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
}

export function buildActivityLogStats(
  items: ActivityLogViewModel[],
): ActivityLogStats {
  return {
    total: items.length,
    uniqueActors: new Set(items.map((item) => item.userId)).size,
    entityTypes: new Set(items.map((item) => item.entity)).size,
    actionTypes: new Set(items.map((item) => item.action)).size,
  };
}

export function getActivityActionOptions(
  items: ActivityLogViewModel[],
): ActivityFilterOption[] {
  return [...new Set(items.map((item) => item.action))]
    .sort((a, b) => a.localeCompare(b))
    .map((action) => ({
      value: action,
      label: formatOptionLabel(action),
    }));
}

export function getActivityEntityOptions(
  items: ActivityLogViewModel[],
): ActivityFilterOption[] {
  return [...new Set(items.map((item) => item.entity))]
    .sort((a, b) => a.localeCompare(b))
    .map((entity) => ({
      value: entity,
      label: formatOptionLabel(entity),
    }));
}
