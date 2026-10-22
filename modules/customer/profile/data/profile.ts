import { getUserById } from '@/data/aeropass';

import type {
  CustomerAccountStatus,
  CustomerProfile,
  CustomerProfileFormValues,
  ProfileFieldErrors,
} from '../types/profile';

const ACCOUNT_STATUSES: CustomerAccountStatus[] = [
  'ACTIVE',
  'INACTIVE',
  'SUSPENDED',
];

function normalizeStatus(status: string): CustomerAccountStatus {
  if (ACCOUNT_STATUSES.includes(status as CustomerAccountStatus)) {
    return status as CustomerAccountStatus;
  }

  return 'INACTIVE';
}

function normalizeOptionalString(value: string | null | undefined): string {
  return value?.trim() ?? '';
}

export function getCustomerProfile(customerId: string): CustomerProfile | null {
  const user = getUserById(customerId);

  if (!user || user.role !== 'CUSTOMER') {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: normalizeOptionalString(user.phone),
    avatar: user.avatar ?? null,
    role: user.role,
    status: normalizeStatus(user.status),
    createdAt: user.createdAt,
    lastLoginAt: user.lastLoginAt ?? null,
  };
}

export function getInitialProfileValues(
  profile: CustomerProfile,
): CustomerProfileFormValues {
  return {
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  };
}

export function validateProfileValues(
  values: CustomerProfileFormValues,
): ProfileFieldErrors {
  const errors: ProfileFieldErrors = {};

  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();

  if (!name) {
    errors.name = 'Full name is required.';
  } else if (name.length < 2) {
    errors.name = 'Full name must be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (phone && !/^[+()\d\s.-]{7,20}$/.test(phone)) {
    errors.phone = 'Enter a valid phone number.';
  }

  return errors;
}

export function formatProfileDate(value: string | null | undefined): string {
  if (!value) {
    return 'Not available';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Not available';
  }

  return new Intl.DateTimeFormat('en-PH', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getProfileInitials(name: string): string {
  const initials = name
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');

  return initials || 'AP';
}

export function getProfileCompletion(profile: CustomerProfile): number {
  const fields = [profile.name, profile.email, profile.phone];

  const completed = fields.filter((field) => field.trim().length > 0).length;

  return Math.round((completed / fields.length) * 100);
}

export function getAccountStatusLabel(status: CustomerAccountStatus): string {
  const labels: Record<CustomerAccountStatus, string> = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    SUSPENDED: 'Suspended',
  };

  return labels[status];
}
