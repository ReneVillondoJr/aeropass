import { ArrowRight, Plane, ScanLine, Ticket } from 'lucide-react';

import Link from 'next/link';

const travelServices = [
  {
    title: 'Book a flight',
    description:
      'Search routes, compare fares, and choose the journey that fits you.',
    href: '/search',
    icon: Plane,
  },
  {
    title: 'Manage booking',
    description:
      'View your reservation, passenger details, payment status, and ticket.',
    href: '/manage-booking',
    icon: Ticket,
  },
  {
    title: 'Online check-in',
    description:
      'Check in before your flight and access your boarding information.',
    href: '/check-in',
    icon: ScanLine,
  },
];

export function TravelServices() {
  return (
    <section className='bg-[#f4f9fc]'>
      <div className='mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20'>
        <div className='max-w-xl'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400'>
            Your journey
          </p>

          <h2 className='mt-2 text-2xl font-semibold tracking-tight text-[#102a43] sm:text-3xl'>
            Everything you need in one place
          </h2>

          <p className='mt-2 text-sm leading-6 text-slate-500'>
            From booking your flight to getting ready for departure, AeroPass
            keeps the important parts of your trip together.
          </p>
        </div>

        <div className='mt-9 grid gap-4 lg:grid-cols-3'>
          {travelServices.map((service) => {
            const Icon = service.icon;

            return (
              <Link
                key={service.title}
                href={service.href}
                className='group rounded-2xl border border-sky-100 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-sky-200 hover:shadow-[0_18px_50px_-30px_rgba(16,42,67,0.30)]'
              >
                <div className='flex size-11 items-center justify-center rounded-xl bg-[#e5f5fc] text-[#3f88b2]'>
                  <Icon className='size-5' />
                </div>

                <h3 className='mt-5 text-base font-semibold text-[#102a43]'>
                  {service.title}
                </h3>

                <p className='mt-2 text-sm leading-6 text-slate-500'>
                  {service.description}
                </p>

                <div className='mt-5 flex items-center gap-2 text-xs font-medium text-[#3f7194]'>
                  Learn more
                  <ArrowRight className='size-3.5 transition-transform group-hover:translate-x-1' />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
