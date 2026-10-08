import { permissions, roles, users } from '@/data/aeropass';

import type { Permission, RoleCode } from '@/data/aeropass';

import type {
  PermissionGroup,
  RoleFilterOption,
  RoleStats,
  RoleViewModel,
} from '../types/role';

const permissionGroupOrder = [
  'dashboard',
  'flights',
  'schedules',
  'routes',
  'airports',
  'aircraft',
  'seat_maps',
  'fare_classes',
  'bookings',
  'passengers',
  'tickets',
  'payments',
  'refunds',
  'check_ins',
  'boarding',
  'baggage',
  'reports',
  'users',
  'roles',
  'notifications',
  'activity_logs',
  'settings',
];

const permissionGroupLabels: Record<string, string> = {
  dashboard: 'Dashboard',
  flights: 'Flights',
  schedules: 'Schedules',
  routes: 'Routes',
  airports: 'Airports',
  aircraft: 'Aircraft',
  seat_maps: 'Seat Maps',
  fare_classes: 'Fare Classes',
  bookings: 'Bookings',
  passengers: 'Passengers',
  tickets: 'Tickets',
  payments: 'Payments',
  refunds: 'Refunds',
  check_ins: 'Check-in',
  boarding: 'Boarding',
  baggage: 'Baggage',
  reports: 'Reports',
  users: 'Users',
  roles: 'Roles & Permissions',
  notifications: 'Notifications',
  activity_logs: 'Activity Logs',
  settings: 'Settings',
};

function getPermissionGroupKey(code: string) {
  return code.split('.')[0] ?? code;
}

function buildPermissionGroups(items: Permission[]): PermissionGroup[] {
  const grouped = new Map<string, Permission[]>();

  for (const permission of items) {
    const key = getPermissionGroupKey(permission.code);

    const existing = grouped.get(key) ?? [];

    existing.push(permission);

    grouped.set(key, existing);
  }

  return Array.from(grouped.entries())
    .sort(([left], [right]) => {
      const leftIndex = permissionGroupOrder.indexOf(left);
      const rightIndex = permissionGroupOrder.indexOf(right);

      const normalizedLeft =
        leftIndex === -1 ? Number.MAX_SAFE_INTEGER : leftIndex;

      const normalizedRight =
        rightIndex === -1 ? Number.MAX_SAFE_INTEGER : rightIndex;

      return normalizedLeft - normalizedRight;
    })
    .map(([key, groupPermissions]) => ({
      key,
      label: permissionGroupLabels[key] ?? key,
      permissions: [...groupPermissions].sort((left, right) =>
        left.code.localeCompare(right.code),
      ),
    }));
}

export function buildRoleViewModels(): RoleViewModel[] {
  const permissionGroups = buildPermissionGroups(permissions);

  return roles.map((role) => ({
    id: role.id,
    code: role.code,
    name: role.name,
    description: role.description,
    userCount: users.filter((user) => user.role === role.code).length,
    permissionCount: permissions.length,
    permissionGroups,
  }));
}

export function buildRoleStats(items: RoleViewModel[]): RoleStats {
  const usersCovered = users.length;

  return {
    totalRoles: items.length,
    totalPermissions: permissions.length,
    rolesInUse: items.filter((item) => item.userCount > 0).length,
    usersCovered,
  };
}

export function getRoleFilterOptions(): RoleFilterOption[] {
  return roles.map((role) => ({
    label: role.name,
    value: role.code,
  }));
}

export function getPermissionGroups(): PermissionGroup[] {
  return buildPermissionGroups(permissions);
}

export function getRoleUsersCount(roleCode: RoleCode) {
  return users.filter((user) => user.role === roleCode).length;
}
