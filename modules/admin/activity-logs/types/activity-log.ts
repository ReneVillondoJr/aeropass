import type { RoleCode } from '@/data/aeropass';

export type ActivityActionFilter = 'ALL' | string;
export type ActivityEntityFilter = 'ALL' | string;

export interface ActivityLogViewModel {
  id: string;
  userId: string;
  actorName: string;
  actorEmail: string;
  actorRole: RoleCode | null;

  action: string;
  entity: string;
  entityId: string | null;
  description: string;
  createdAt: string;
}

export interface ActivityLogStats {
  total: number;
  uniqueActors: number;
  entityTypes: number;
  actionTypes: number;
}

export interface ActivityFilterOption {
  label: string;
  value: string;
}
