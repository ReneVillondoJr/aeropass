import type { RoleCode, UserStatus } from '@/data/aeropass';

export type UserFilterStatus = 'ALL' | UserStatus;
export type UserFilterRole = 'ALL' | RoleCode;

export interface UserViewModel {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: RoleCode;
  roleName: string;
  roleDescription: string;
  status: UserStatus;
  avatar: string | null;
  department: string | null;
  employeeId: string | null;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  suspended: number;
  staff: number;
  customers: number;
}

export interface UserRoleOption {
  label: string;
  value: string;
}
