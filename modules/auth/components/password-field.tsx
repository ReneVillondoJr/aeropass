'use client';

import { useState } from 'react';

import { Eye, EyeOff } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { PasswordFieldProps } from '@/modules/auth/types/auth';

export function PasswordField({
  id,
  name,
  label,
  value,
  placeholder = 'Enter your password',
  autoComplete = 'current-password',
  error,
  onChange,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className='space-y-2'>
      <Label htmlFor={id}>{label}</Label>

      <div className='relative'>
        <Input
          id={id}
          name={name}
          type={visible ? 'text' : 'password'}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          onChange={(event) => onChange(event.target.value)}
          className='h-11 pr-11'
        />

        <Button
          type='button'
          variant='ghost'
          size='icon'
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((current) => !current)}
          className='absolute right-1 top-1 size-9 text-muted-foreground hover:bg-muted hover:text-foreground'
        >
          {visible ?
            <EyeOff className='size-4' />
          : <Eye className='size-4' />}
        </Button>
      </div>

      {error ?
        <p className='text-xs text-destructive'>{error}</p>
      : null}
    </div>
  );
}
