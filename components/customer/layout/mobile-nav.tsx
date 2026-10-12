'use client';

import { X } from 'lucide-react';

import { CustomerSidebar } from './sidebar';

interface CustomerMobileNavProps {
  open: boolean;
  onClose: () => void;
}

export function CustomerMobileNav({ open, onClose }: CustomerMobileNavProps) {
  if (!open) return null;

  return (
    <div className='fixed inset-0 z-50 lg:hidden' role='presentation'>
      <button
        type='button'
        aria-label='Close navigation menu'
        onClick={onClose}
        className='absolute inset-0 cursor-default bg-slate-950/45 backdrop-blur-[2px]'
      />

      <div
        role='dialog'
        aria-modal='true'
        aria-label='Customer navigation menu'
        className='relative z-10 h-full w-fit max-w-[88vw] transition-transform duration-200'
      >
        <button
          type='button'
          onClick={onClose}
          aria-label='Close menu'
          className='absolute right-3 top-4 z-20 inline-flex size-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6]'
        >
          <X className='size-4' aria-hidden='true' />
        </button>
        <CustomerSidebar variant='mobile' onNavigate={onClose} />
      </div>
    </div>
  );
}
