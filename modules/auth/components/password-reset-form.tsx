'use client';

import type { FormEvent } from 'react';

import { useState } from 'react';

import Link from 'next/link';

import { useRouter, useSearchParams } from 'next/navigation';

import { ArrowRight, CircleAlert, CircleCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { resetPasswordSchema } from '../schema/auth';

import {
  resetPasswordLocal,
  validatePasswordResetToken,
} from '../services/local-auth';

import type { AuthRole } from '../types/auth';

import { PasswordField } from './password-field';

type PasswordResetFormProps = {
  role: AuthRole;
};

export function PasswordResetForm({ role }: PasswordResetFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get('token') ?? '';

  const isAdmin = role === 'ADMIN';

  const loginHref = isAdmin ? '/admin/login' : '/login';

  const resetHref = isAdmin ? '/admin/forgot-password' : '/forgot-password';

  const isValidToken = Boolean(
    token && validatePasswordResetToken(token, role),
  );

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [success, setSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const parsed = resetPasswordSchema.safeParse({
      token,
      password,
      confirmPassword,
    });

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? 'Please check your information.',
      );

      return;
    }

    setLoading(true);

    try {
      const result = resetPasswordLocal(token, role, password);

      if (!result.success) {
        setError(result.message);

        return;
      }

      setSuccess(true);

      window.setTimeout(() => {
        router.push(loginHref);
      }, 1200);
    } finally {
      setLoading(false);
    }
  }

  if (!isValidToken) {
    return (
      <div className='space-y-5'>
        <div className='rounded-xl border border-destructive/20 bg-destructive/5 p-5'>
          <div className='flex gap-3'>
            <CircleAlert className='mt-0.5 size-5 shrink-0 text-destructive' />

            <div>
              <p className='text-sm font-medium'>Reset link unavailable</p>

              <p className='mt-1 text-xs leading-5 text-muted-foreground'>
                This local reset link is invalid or has expired.
              </p>
            </div>
          </div>
        </div>

        <Button
          type='button'
          className='h-11 w-full'
          onClick={() => router.push(resetHref)}
        >
          Request a new link
        </Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className='space-y-5'>
        <div className='rounded-xl border border-emerald-200 bg-emerald-50 p-5'>
          <div className='flex gap-3'>
            <CircleCheck className='mt-0.5 size-5 shrink-0 text-emerald-600' />

            <div>
              <p className='text-sm font-medium text-emerald-900'>
                Password updated
              </p>

              <p className='mt-1 text-xs leading-5 text-emerald-800/70'>
                Redirecting you to the sign-in page...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <PasswordField
        id='reset-password'
        name='password'
        label='New password'
        value={password}
        placeholder='Create a new password'
        autoComplete='new-password'
        onChange={setPassword}
      />

      <PasswordField
        id='reset-confirm-password'
        name='confirmPassword'
        label='Confirm new password'
        value={confirmPassword}
        placeholder='Confirm your new password'
        autoComplete='new-password'
        onChange={setConfirmPassword}
      />

      {error ?
        <div className='rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5'>
          <p className='text-xs text-destructive'>{error}</p>
        </div>
      : null}

      <Button type='submit' disabled={loading} className='h-11 w-full gap-2'>
        {loading ? 'Updating password...' : 'Update password'}

        {!loading ?
          <ArrowRight className='size-4' />
        : null}
      </Button>

      <p className='text-center text-sm text-muted-foreground'>
        Remember your password?{' '}
        <Link
          href={loginHref}
          className='font-medium text-foreground hover:underline'
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
