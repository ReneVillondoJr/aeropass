import { roles, users, getRoleByCode } from '@/data/aeropass';

import type { UserRoleOption, UserStats, UserViewModel } from '../types/user';

export function buildUserViewModels(): UserViewModel[] {
  return users.map((user) => {
    const role = getRoleByCode(user.role);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      roleName: role?.name ?? user.role,
      roleDescription: role?.description ?? 'No role description',
      status: user.status,
      avatar: user.avatar,
      department: user.department ?? null,
      employeeId: user.employeeId ?? null,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
    };
  });
}

export function buildUserStats(items: UserViewModel[]): UserStats {
  const staffRoles = new Set([
    'SUPER_ADMIN',
    'ADMIN',
    'FLIGHT_MANAGER',
    'CHECK_IN_AGENT',
    'GATE_AGENT',
  ]);

  return {
    total: items.length,
    active: items.filter((item) => item.status === 'ACTIVE').length,
    inactive: items.filter((item) => item.status === 'INACTIVE').length,
    suspended: items.filter((item) => item.status === 'SUSPENDED').length,
    staff: items.filter((item) => staffRoles.has(item.role)).length,
    customers: items.filter((item) => item.role === 'CUSTOMER').length,
  };
}

export function getUserRoleOptions(): UserRoleOption[] {
  return roles.map((role) => ({
    label: role.name,
    value: role.code,
  }));
}
