'use client';

import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ArrowRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { AuthShell } from '../components/auth-shell';
import { PasswordField } from '../components/password-field';

import { customerRegisterSchema } from '../schema/auth';

import { registerCustomerLocal } from '../services/local-auth';

export function CustomerRegister() {
  const router = useRouter();

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [phone, setPhone] = useState('');

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const parsed = customerRegisterSchema.safeParse({
      name,
      email,
      phone,
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
      const result = registerCustomerLocal({
        name,
        email,
        phone,
        password,
      });

      if (!result.success) {
        setError(result.message);
        return;
      }

      router.push('/customer/dashboard');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell
      mode='CUSTOMER'
      eyebrow='Customer registration'
      title='Create your account'
      description='Set up your AeroPass account to book flights and manage your journey.'
    >
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='customer-name'>Full name</Label>

          <Input
            id='customer-name'
            name='name'
            value={name}
            placeholder='Enter your full name'
            autoComplete='name'
            onChange={(event) => setName(event.target.value)}
            className='h-11'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='customer-register-email'>Email address</Label>

          <Input
            id='customer-register-email'
            name='email'
            type='email'
            value={email}
            placeholder='you@example.com'
            autoComplete='email'
            onChange={(event) => setEmail(event.target.value)}
            className='h-11'
          />
        </div>

        <div className='space-y-2'>
          <Label htmlFor='customer-phone'>Phone number</Label>

          <Input
            id='customer-phone'
            name='phone'
            value={phone}
            placeholder='+63 917 000 0000'
            autoComplete='tel'
            onChange={(event) => setPhone(event.target.value)}
            className='h-11'
          />
        </div>

        <PasswordField
          id='customer-register-password'
          name='password'
          label='Password'
          value={password}
          placeholder='Create a password'
          autoComplete='new-password'
          onChange={setPassword}
        />

        <PasswordField
          id='customer-confirm-password'
          name='confirmPassword'
          label='Confirm password'
          value={confirmPassword}
          placeholder='Confirm your password'
          autoComplete='new-password'
          onChange={setConfirmPassword}
        />

        {error ?
          <div className='rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2.5'>
            <p className='text-xs text-destructive'>{error}</p>
          </div>
        : null}

        <Button type='submit' disabled={loading} className='h-11 w-full gap-2'>
          {loading ? 'Creating account...' : 'Create account'}

          {!loading ?
            <ArrowRight className='size-4' />
          : null}
        </Button>

        <p className='text-center text-sm text-muted-foreground'>
          Already have an account?{' '}
          <Link
            href='/login'
            className='font-medium text-foreground hover:underline'
          >
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
