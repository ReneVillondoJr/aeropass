export type CustomerAccountStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string | null;
  role: string;
  status: CustomerAccountStatus;
  createdAt: string;
  lastLoginAt: string | null;
}

export interface CustomerProfileFormValues {
  name: string;
  email: string;
  phone: string;
}

export interface ProfileFieldErrors {
  name?: string;
  email?: string;
  phone?: string;
}
