'use client';

import { useCallback, useState } from 'react';

import { loginLocal, logoutLocal } from '../services/local-auth';

import type { LoginInput } from '../types/auth';

export function useLocalAuth() {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (input: LoginInput) => {
    setLoading(true);
    setError(null);

    try {
      const result = loginLocal(input);

      if (!result.success) {
        setError(result.message);
      }

      return result;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    logoutLocal();
  }, []);

  return {
    loading,
    error,
    login,
    logout,
  };
}
