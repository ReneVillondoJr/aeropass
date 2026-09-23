import { demoCredentials, users } from '@/data/aeropass';

import type {
  AuthRole,
  CustomerRegisterInput,
  AdminRegisterInput,
  LocalPasswordOverride,
  LocalPasswordResetToken,
  LocalRegisteredUser,
  LocalSession,
  LoginInput,
} from '../types/auth';

const REGISTERED_USERS_KEY = 'aeropass-registered-users';

const PASSWORD_OVERRIDES_KEY = 'aeropass-password-overrides';

const RESET_TOKENS_KEY = 'aeropass-password-reset-tokens';

const SESSION_KEY = 'aeropass-session';

const ADMIN_INVITE_CODE = 'AEROPASS-ADMIN';

const RESET_TOKEN_LIFETIME = 15 * 60 * 1000;

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function createResetToken() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) {
    const bytes = new Uint8Array(24);

    crypto.getRandomValues(bytes);

    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, '0'))
      .join('');
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function readRegisteredUsers(): LocalRegisteredUser[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(REGISTERED_USERS_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as LocalRegisteredUser[];
  } catch {
    return [];
  }
}

function writeRegisteredUsers(value: LocalRegisteredUser[]) {
  window.localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(value));
}

function readPasswordOverrides(): LocalPasswordOverride[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(PASSWORD_OVERRIDES_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as LocalPasswordOverride[];
  } catch {
    return [];
  }
}

function writePasswordOverrides(value: LocalPasswordOverride[]) {
  window.localStorage.setItem(PASSWORD_OVERRIDES_KEY, JSON.stringify(value));
}

function readResetTokens(): LocalPasswordResetToken[] {
  if (typeof window === 'undefined') {
    return [];
  }

  const raw = window.localStorage.getItem(RESET_TOKENS_KEY);

  if (!raw) {
    return [];
  }

  try {
    return JSON.parse(raw) as LocalPasswordResetToken[];
  } catch {
    return [];
  }
}

function writeResetTokens(value: LocalPasswordResetToken[]) {
  window.localStorage.setItem(RESET_TOKENS_KEY, JSON.stringify(value));
}

function createSession(session: LocalSession) {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function getSeedUser(email: string, role: AuthRole) {
  const normalizedEmail = normalizeEmail(email);

  return users.find(
    (user) =>
      normalizeEmail(user.email) === normalizedEmail &&
      (role === 'CUSTOMER' ?
        user.role === 'CUSTOMER'
      : user.role === 'ADMIN' || user.role === 'SUPER_ADMIN'),
  );
}

function getPasswordOverride(email: string, role: AuthRole) {
  const normalizedEmail = normalizeEmail(email);

  return readPasswordOverrides().find(
    (override) =>
      normalizeEmail(override.email) === normalizedEmail &&
      override.role === role,
  );
}

function getStoredPassword(email: string, role: AuthRole) {
  const registeredUser = readRegisteredUsers().find(
    (user) =>
      normalizeEmail(user.email) === normalizeEmail(email) &&
      user.role === role,
  );

  if (registeredUser) {
    return registeredUser.password;
  }

  return getPasswordOverride(email, role)?.password;
}

function accountExists(email: string, role: AuthRole) {
  return Boolean(
    readRegisteredUsers().some(
      (user) =>
        normalizeEmail(user.email) === normalizeEmail(email) &&
        user.role === role,
    ) || getSeedUser(email, role),
  );
}

export function loginLocal(input: LoginInput) {
  if (typeof window === 'undefined') {
    return {
      success: false,
      message: 'Authentication is unavailable.',
    };
  }

  const email = normalizeEmail(input.email);

  const storedPassword = getStoredPassword(email, input.role);

  if (
    storedPassword &&
    storedPassword === input.password &&
    accountExists(email, input.role)
  ) {
    const registeredUser = readRegisteredUsers().find(
      (user) =>
        normalizeEmail(user.email) === email && user.role === input.role,
    );

    const seedUser = getSeedUser(email, input.role);

    const user = registeredUser ?? seedUser;

    if (!user) {
      return {
        success: false,
        message: 'The email or password is incorrect.',
      };
    }

    createSession({
      userId: user.id,
      name: user.name,
      email: user.email,
      role: input.role,
    });

    return {
      success: true,
      message: 'Login successful.',
      user,
    };
  }

  return {
    success: false,
    message: 'The email or password is incorrect.',
  };
}

export function registerCustomerLocal(input: CustomerRegisterInput) {
  const existingUsers = readRegisteredUsers();

  const email = normalizeEmail(input.email);

  if (accountExists(email, 'CUSTOMER')) {
    return {
      success: false,
      message: 'An account with this email already exists.',
    };
  }

  const user: LocalRegisteredUser = {
    id: createId('customer'),
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
    password: input.password,
    role: 'CUSTOMER',
    createdAt: new Date().toISOString(),
  };

  writeRegisteredUsers([...existingUsers, user]);

  createSession({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return {
    success: true,
    message: 'Customer account created.',
    user,
  };
}

export function registerAdminLocal(input: AdminRegisterInput) {
  if (input.inviteCode !== ADMIN_INVITE_CODE) {
    return {
      success: false,
      message: 'Invalid admin invite code.',
    };
  }

  const existingUsers = readRegisteredUsers();

  const email = normalizeEmail(input.email);

  if (accountExists(email, 'ADMIN')) {
    return {
      success: false,
      message: 'An account with this email already exists.',
    };
  }

  const user: LocalRegisteredUser = {
    id: createId('admin'),
    name: input.name.trim(),
    email,
    phone: input.phone.trim(),
    password: input.password,
    role: 'ADMIN',
    createdAt: new Date().toISOString(),
  };

  writeRegisteredUsers([...existingUsers, user]);

  createSession({
    userId: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  });

  return {
    success: true,
    message: 'Admin account created.',
    user,
  };
}

export function requestPasswordReset(email: string, role: AuthRole) {
  if (typeof window === 'undefined') {
    return {
      success: false,
      message: 'Reset is unavailable.',
      resetLink: null,
    };
  }

  const normalizedEmail = normalizeEmail(email);

  const exists = accountExists(normalizedEmail, role);

  if (!exists) {
    return {
      success: true,
      message:
        'If the account exists, a reset link has been created for this development environment.',
      resetLink: null,
    };
  }

  const token = createResetToken();

  const expiresAt = Date.now() + RESET_TOKEN_LIFETIME;

  const tokens = readResetTokens().filter(
    (item) => item.expiresAt > Date.now(),
  );

  tokens.push({
    token,
    email: normalizedEmail,
    role,
    expiresAt,
  });

  writeResetTokens(tokens);

  const baseUrl = window.location.origin;

  const path = role === 'ADMIN' ? '/admin/reset-password' : '/reset-password';

  const resetLink = `${baseUrl}${path}?token=${encodeURIComponent(token)}`;

  return {
    success: true,
    message: 'A development reset link has been created.',
    resetLink,
  };
}

export function validatePasswordResetToken(token: string, role: AuthRole) {
  const tokens = readResetTokens();

  const resetToken = tokens.find(
    (item) =>
      item.token === token && item.role === role && item.expiresAt > Date.now(),
  );

  return resetToken ?? null;
}

export function resetPasswordLocal(
  token: string,
  role: AuthRole,
  newPassword: string,
) {
  if (typeof window === 'undefined') {
    return {
      success: false,
      message: 'Reset is unavailable.',
    };
  }

  const tokens = readResetTokens();

  const resetToken = tokens.find(
    (item) =>
      item.token === token && item.role === role && item.expiresAt > Date.now(),
  );

  if (!resetToken) {
    return {
      success: false,
      message: 'This reset link is invalid or expired.',
    };
  }

  const email = normalizeEmail(resetToken.email);

  const registeredUsers = readRegisteredUsers();

  const registeredUserIndex = registeredUsers.findIndex(
    (user) => normalizeEmail(user.email) === email && user.role === role,
  );

  if (registeredUserIndex >= 0) {
    registeredUsers[registeredUserIndex] = {
      ...registeredUsers[registeredUserIndex],
      password: newPassword,
    };

    writeRegisteredUsers(registeredUsers);
  } else {
    const overrides = readPasswordOverrides();

    const filtered = overrides.filter(
      (override) =>
        !(normalizeEmail(override.email) === email && override.role === role),
    );

    filtered.push({
      email,
      role,
      password: newPassword,
      updatedAt: new Date().toISOString(),
    });

    writePasswordOverrides(filtered);
  }

  writeResetTokens(tokens.filter((item) => item.token !== token));

  return {
    success: true,
    message: 'Your password has been updated.',
  };
}

export function getLocalSession(): LocalSession | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const raw = window.localStorage.getItem(SESSION_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as LocalSession;
  } catch {
    return null;
  }
}

export function logoutLocal() {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.removeItem(SESSION_KEY);
}
