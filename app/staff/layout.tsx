import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Staff Workspace',
    template: '%s | AeroPass Staff',
  },
};

interface StaffLayoutProps {
  children: ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  return (
    <main className='min-h-screen bg-[#f4f9fc] px-5 py-10 sm:px-8 lg:px-10'>
      <div className='mx-auto max-w-7xl'>{children}</div>
    </main>
  );
}