'use client';

import { Suspense } from 'react';

import { AuthShell } from '../components/auth-shell';
import { PasswordResetForm } from '../components/password-reset-form';

function CustomerResetContent() {
  return (
    <AuthShell
      mode='CUSTOMER'
      eyebrow='Account recovery'
      title='Create a new password'
      description='Choose a new password for your AeroPass customer account.'
    >
      <PasswordResetForm role='CUSTOMER' />
    </AuthShell>
  );
}

export function CustomerResetPassword() {
  return (
    <Suspense
      fallback={
        <AuthShell
          mode='CUSTOMER'
          eyebrow='Account recovery'
          title='Create a new password'
          description='Checking your reset link.'
        >
          <div className='rounded-xl border border-border/70 bg-card p-6 text-center text-sm text-muted-foreground shadow-sm'>
            Checking reset link...
          </div>
        </AuthShell>
      }
    >
      <CustomerResetContent />
    </Suspense>
  );
}
