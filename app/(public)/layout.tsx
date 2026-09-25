import type { ReactNode } from 'react';

import { PublicFooter } from '@/components/public/layout/footer';
import { PublicHeader } from '@/components/public/layout/header';

export default function PublicLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className='flex min-h-svh flex-col bg-[#f4f9fc] text-[#102a43]'>
      <PublicHeader />

      <main className='flex-1'>{children}</main>

      <PublicFooter />
    </div>
  );
}
