import type { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { AdminHeader } from '@/components/admin/layout/header';
import { AdminSidebar } from '@/components/admin/layout/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen>
      <AdminSidebar />

      <SidebarInset>
        <AdminHeader />

        <main className='flex-1 p-6 lg:p-10'>
          <div className='mx-auto w-full max-w-[1600px]'>{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
