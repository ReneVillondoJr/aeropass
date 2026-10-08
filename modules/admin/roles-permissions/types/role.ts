import type { Permission, Role, RoleCode } from '@/data/aeropass';

export type RoleFilter = 'ALL' | RoleCode;

export interface PermissionGroup {
  key: string;
  label: string;
  permissions: Permission[];
}

export interface RoleViewModel {
  id: string;
  code: RoleCode;
  name: string;
  description: string;
  userCount: number;
  permissionCount: number;
  permissionGroups: PermissionGroup[];
}

export interface RoleStats {
  totalRoles: number;
  totalPermissions: number;
  rolesInUse: number;
  usersCovered: number;
}

export interface RoleFilterOption {
  label: string;
  value: string;
}

export interface RolePermissionSummary {
  permission: Permission;
  groupKey: string;
  groupLabel: string;
}
