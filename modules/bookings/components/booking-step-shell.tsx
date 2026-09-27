import type { ReactNode } from 'react';

interface BookingStepShellProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function BookingStepShell({
  title,
  description,
  children,
}: BookingStepShellProps) {
  return (
    <div className='bg-[#f4f9fc]'>
      <div className='mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10'>
        <div className='max-w-2xl'>
          <h1 className='text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl'>
            {title}
          </h1>

          <p className='mt-2 text-sm leading-6 text-slate-500'>{description}</p>
        </div>

        <div className='mt-8'>{children}</div>
      </div>
    </div>
  );
}
