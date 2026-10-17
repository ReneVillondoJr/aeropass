'use client';

import { useSyncExternalStore } from 'react';

import { getLocalSession } from '../services/local-auth';

function subscribe(onChange: () => void) {
  window.addEventListener('storage', onChange);

  return () => window.removeEventListener('storage', onChange);
}

function getCustomerIdSnapshot() {
  const session = getLocalSession();
  return session?.role === 'CUSTOMER' ? session.userId : null;
}

function getServerCustomerIdSnapshot() {
  return null;
}

export function useCustomerId() {
  return useSyncExternalStore(
    subscribe,
    getCustomerIdSnapshot,
    getServerCustomerIdSnapshot,
  );
}
