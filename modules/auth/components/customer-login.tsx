'use client';

import type { FormEvent } from 'react';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AuthShell } from '../components/auth-shell';
import { PasswordField } from '../components/password-field';
import { useLocalAuth } from '../hooks/use-local-auth';
import { loginSchema } from '../schema/auth';

export function CustomerLogin() {
  const router = useRouter();

  const { loading, error: authError, login } = useLocalAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const parsed = loginSchema.safeParse({
      email,
      password,
      role: 'CUSTOMER',
    });

    if (!parsed.success) {
      setError(
        parsed.error.issues[0]?.message ?? 'Please check your information.',
      );

      return;
    }

    const result = await login({
      email,
      password,
      role: 'CUSTOMER',
    });

    if (!result.success) {
      return;
    }

    router.push('/customer/dashboard');
  }

  return (
    <AuthShell
      mode='CUSTOMER'
      eyebrow='Passenger account'
      title='Welcome back'
      description='Sign in to manage your trips, bookings, digital tickets, payments, and boarding information.'
    >
      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-2'>
          <Label
            htmlFor='customer-email'
            className='text-xs font-medium text-[#102a43]'
          >
            Email address
          </Label>

          <Input
            id='customer-email'
            name='email'
            type='email'
            value={email}
            placeholder='you@example.com'
            autoComplete='email'
            onChange={(event) => setEmail(event.target.value)}
            className='h-11 rounded-xl border-slate-200 bg-white px-3.5 text-sm shadow-none placeholder:text-slate-300 focus-visible:border-sky-300 focus-visible:ring-sky-100'
          />
        </div>

        <PasswordField
          id='customer-password'
          name='password'
          label='Password'
          value={password}
          placeholder='Enter your password'
          onChange={setPassword}
        />

        {error || authError ?
          <div className='rounded-xl border border-destructive/20 bg-destructive/5 px-3.5 py-3'>
            <p className='text-xs leading-5 text-destructive'>
              {error ?? authError}
            </p>
          </div>
        : null}

        <div className='flex items-center justify-between gap-4'>
          <label className='flex items-center gap-2 text-xs text-slate-500'>
            <input
              type='checkbox'
              className='size-3.5 rounded border-slate-300 accent-[#102a43]'
            />
            Remember me
          </label>

          <Link
            href='/forgot-password'
            className='text-xs font-medium text-[#3f7194] transition-colors hover:text-[#102a43] hover:underline'
          >
            Forgot password?
          </Link>
        </div>

        <Button
          type='submit'
          disabled={loading}
          className='h-11 w-full gap-2 rounded-xl bg-[#102a43] text-white shadow-[0_10px_24px_-14px_rgba(16,42,67,0.65)] transition-all hover:bg-[#183b5b] hover:shadow-[0_14px_28px_-14px_rgba(16,42,67,0.70)]'
        >
          {loading ? 'Signing in...' : 'Continue to account'}

          {!loading ?
            <ArrowRight className='size-4 transition-transform group-hover:translate-x-0.5' />
          : null}
        </Button>

        <div className='pt-1 text-center'>
          <p className='text-sm text-slate-500'>
            Don&apos;t have an account?{' '}
            <Link
              href='/register'
              className='font-medium text-[#102a43] hover:underline'
            >
              Create one
            </Link>
          </p>
        </div>
      </form>
    </AuthShell>
  );
}
