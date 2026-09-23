'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowRight, ShieldCheck } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AuthShell } from '../components/auth-shell';
import { PasswordField } from '../components/password-field';
import { useLocalAuth } from '../hooks/use-local-auth';

import { loginSchema } from '../schema/auth';

export function AdminLogin() {
  const router = useRouter();

  const { loading, error: authError, login } = useLocalAuth();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const parsed = loginSchema.safeParse({
      email,
      password,
      role: 'ADMIN',
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
      role: 'ADMIN',
    });

    if (!result.success) {
      return;
    }

    router.push('/admin/dashboard');
  }

  return (
    <AuthShell
      mode='ADMIN'
      eyebrow='Administration'
      title='Operations sign in'
      description='Access the AeroPass operations workspace and manage airline activity.'
    >
      <div className='mb-6 rounded-xl border border-border/70 bg-muted/40 p-4'>
        <div className='flex gap-3'>
          <div className='flex size-9 shrink-0 items-center justify-center rounded-lg bg-background'>
            <ShieldCheck className='size-4 text-muted-foreground' />
          </div>

          <div>
            <p className='text-sm font-medium'>Authorized access</p>

            <p className='mt-1 text-xs leading-5 text-muted-foreground'>
              This development portal is intended for AeroPass administration
              and operations staff.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-5'>
        <div className='space-y-2'>
          <Label htmlFor='admin-email'>Work email</Label>

          <Input
            id='admin-email'
            name='email'
            type='email'
            value={email}
            placeholder='admin@example.com'
            autoComplete='email'
            onChange={(event) => setEmail(event.target.value)}
            className='h-11'
          />
        </div>

        <PasswordField
          id='admin-password'
          name='password'
          label='Password'
          value={password}
          onChange={setPassword}
        />

        {error || authError ?
          <div className='rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5'>
            <p className='text-xs text-destructive'>{error ?? authError}</p>
          </div>
        : null}

        <Button type='submit' disabled={loading} className='h-11 w-full gap-2'>
          {loading ? 'Signing in...' : 'Sign in to operations'}

          {!loading ?
            <ArrowRight className='size-4' />
          : null}
        </Button>

        <p className='text-center text-sm text-muted-foreground'>
          Need a local admin account?{' '}
          <Link
            href='/admin/register'
            className='font-medium text-foreground hover:underline'
          >
            Register
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
