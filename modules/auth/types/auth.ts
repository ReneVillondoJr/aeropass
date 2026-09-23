export type AuthRole = 'CUSTOMER' | 'ADMIN';

export type LocalSession = {
  userId: string;
  name: string;
  email: string;
  role: AuthRole;
};

export type LocalRegisteredUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: AuthRole;
  createdAt: string;
};

export type LocalPasswordOverride = {
  email: string;
  role: AuthRole;
  password: string;
  updatedAt: string;
};

export type LocalPasswordResetToken = {
  token: string;
  email: string;
  role: AuthRole;
  expiresAt: number;
};

export type LoginInput = {
  email: string;
  password: string;
  role: AuthRole;
};

export type CustomerRegisterInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type AdminRegisterInput = {
  name: string;
  email: string;
  phone: string;
  password: string;
  inviteCode: string;
};
export type PasswordFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  onChange: (value: string) => void;
};
