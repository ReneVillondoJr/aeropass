import type { ReactNode } from 'react';

import Link from 'next/link';

import { Plane, ShieldCheck } from 'lucide-react';

type AuthShellProps = {
  children: ReactNode;
  title: string;
  description: string;
  eyebrow: string;
  mode: 'CUSTOMER' | 'ADMIN';
};

export function AuthShell({
  children,
  title,
  description,
  eyebrow,
  mode,
}: AuthShellProps) {
  const admin = mode === 'ADMIN';

  return (
    <div className='h-svh overflow-hidden bg-[#f4f9fc] text-[#102a43]'>
      <div className='relative flex h-full flex-col overflow-hidden'>
        {/* Background atmosphere */}
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-0 overflow-hidden'
        >
          <div className='absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(91,169,214,0.16),transparent_28%),radial-gradient(circle_at_85%_10%,rgba(197,164,109,0.10),transparent_22%),linear-gradient(180deg,#f8fcff_0%,#f4f9fc_58%,#eef5f9_100%)]' />

          <div className='absolute -left-28 top-20 size-80 rounded-full border border-sky-200/40' />

          <div className='absolute -right-32 bottom-0 size-[28rem] rounded-full border border-sky-200/30' />

          <div className='absolute left-[12%] top-[28%] size-3 rounded-full bg-sky-300/50 blur-[1px]' />

          <div className='absolute right-[18%] top-[22%] size-2 rounded-full bg-[#c5a46d]/45' />

          <div className='absolute bottom-[20%] left-[20%] size-2 rounded-full bg-sky-300/40' />

          {/* Flight path */}
          <div className='absolute left-[8%] top-[18%] hidden h-px w-[30%] rotate-[18deg] bg-gradient-to-r from-transparent via-sky-300/40 to-transparent lg:block' />

          <div className='absolute right-[7%] bottom-[22%] hidden h-px w-[25%] -rotate-[16deg] bg-gradient-to-r from-transparent via-sky-300/30 to-transparent lg:block' />
        </div>

        <header className='relative z-10 shrink-0 border-b border-sky-100/80 bg-white/75 backdrop-blur-xl'>
          <div className='mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10'>
            <Link href='/' className='inline-flex items-center gap-3'>
              <span className='flex size-9 items-center justify-center rounded-xl bg-[#102a43] text-white shadow-sm'>
                <Plane className='size-4' />
              </span>

              <span>
                <span className='block text-sm font-semibold tracking-tight text-[#102a43]'>
                  AeroPass
                </span>

                <span className='block text-[10px] uppercase tracking-[0.16em] text-slate-400'>
                  Airline Reservation
                </span>
              </span>
            </Link>

            <div className='flex items-center gap-2 text-[11px] text-slate-400'>
              <ShieldCheck className='size-3.5' />

              <span>Secure access</span>
            </div>
          </div>
        </header>

        <div className='relative z-10 flex min-h-0 flex-1 overflow-y-auto'>
          <div className='mx-auto flex w-full max-w-7xl flex-1 items-center justify-center px-5 py-8 sm:px-8 lg:px-10'>
            <div className='w-full max-w-[430px]'>
              {/* Brand / flight visual */}
              <div className='mb-7 text-center'>
                <div className='mx-auto mb-5 flex size-16 items-center justify-center rounded-[22px] border border-white bg-white/85 shadow-[0_15px_40px_-24px_rgba(16,42,67,0.35)] backdrop-blur'>
                  <div className='flex size-11 items-center justify-center rounded-2xl bg-[#e5f5fc] text-[#3f88b2]'>
                    <Plane className='size-5' />
                  </div>
                </div>

                <div className='mb-3 flex items-center justify-center gap-2'>
                  <span className='size-1.5 rounded-full bg-sky-400' />
                  <span className='size-1 rounded-full bg-slate-300' />
                  <span className='size-1 rounded-full bg-slate-300' />
                  <span className='size-1.5 rounded-full bg-[#c5a46d]/80' />
                </div>

                <p className='text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400'>
                  {eyebrow}
                </p>

                <h1 className='mt-2 text-3xl font-semibold tracking-[-0.03em] text-[#102a43] sm:text-[2.15rem]'>
                  {title}
                </h1>

                <p className='mx-auto mt-3 max-w-[370px] text-sm leading-6 text-slate-500'>
                  {description}
                </p>
              </div>

              {/* Authentication card */}
              <div className='overflow-hidden rounded-[24px] border border-sky-100 bg-white/95 shadow-[0_24px_70px_-34px_rgba(16,42,67,0.30)] backdrop-blur-xl'>
                <div className='relative border-b border-sky-100 bg-gradient-to-r from-[#f4fbff] via-white to-[#fffdf8] px-5 py-4 sm:px-6'>
                  <div
                    aria-hidden='true'
                    className='absolute inset-y-0 right-0 w-32 bg-[radial-gradient(circle_at_center,rgba(91,169,214,0.10),transparent_65%)]'
                  />

                  <div className='relative flex items-center justify-between'>
                    <div>
                      <p className='text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400'>
                        {admin ? 'AeroPass access' : 'Passenger account'}
                      </p>

                      <p className='mt-1 text-xs font-medium text-[#102a43]'>
                        {admin ?
                          'Secure account access'
                        : 'Manage your journey'}
                      </p>
                    </div>

                    <div className='flex size-8 items-center justify-center rounded-lg border border-sky-100 bg-white text-slate-400 shadow-sm'>
                      <ShieldCheck className='size-3.5' />
                    </div>
                  </div>
                </div>

                <div className='p-5 sm:p-7'>{children}</div>

                <div className='border-t border-dashed border-sky-100 bg-[#fbfdfe] px-5 py-3.5 sm:px-7'>
                  <div className='flex items-center justify-center gap-2'>
                    <span className='size-1.5 rounded-full bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.08)]' />

                    <span className='text-[10px] font-medium uppercase tracking-[0.15em] text-slate-400'>
                      AeroPass
                    </span>
                  </div>
                </div>
              </div>

              <div className='mt-6 text-center'>
                <p className='text-[11px] text-slate-400'>
                  Your journey, connected in one place.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className='relative z-10 shrink-0 px-5 py-4 text-center sm:px-8'>
          <p className='text-[10px] text-slate-400'>© AeroPass</p>
        </footer>
      </div>
    </div>
  );
}
