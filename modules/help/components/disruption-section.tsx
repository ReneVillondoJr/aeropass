import { AlertTriangle, ArrowRight } from 'lucide-react';

import { disruptionItems } from '../data/help';

export function HelpDisruptionSection() {
  return (
    <section id='disruptions' className='px-6 py-14 sm:px-8 lg:px-10 lg:py-18'>
      <div className='mx-auto max-w-6xl'>
        <div className='overflow-hidden rounded-[2rem] border border-[#dce8ef] bg-white'>
          <div className='grid lg:grid-cols-[0.8fr_1.2fr]'>
            <div className='bg-[#102a43] px-6 py-9 text-white sm:px-8 lg:px-10 lg:py-10'>
              <div className='flex size-11 items-center justify-center rounded-2xl bg-white/10'>
                <AlertTriangle className='size-5 text-[#a8d9f0]' />
              </div>

              <p className='mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-[#9fd3ef]'>
                Flight disruptions
              </p>

              <h2 className='mt-2 text-2xl font-semibold tracking-tight sm:text-3xl'>
                Something changed with your flight?
              </h2>

              <p className='mt-4 text-sm leading-7 text-white/70'>
                Use your booking information to review your trip and available
                options, or contact AeroPass support when you need assistance.
              </p>
            </div>

            <div className='p-6 sm:p-8 lg:p-10'>
              <div className='space-y-3'>
                {disruptionItems.map((item) => (
                  <a
                    key={item.title}
                    href='/manage-booking'
                    className='group flex items-center justify-between gap-4 rounded-2xl border border-[#dce8ef] p-4 transition-colors hover:border-[#b9d8e7] hover:bg-[#f8fbfd]'
                  >
                    <div>
                      <h3 className='font-semibold text-[#102a43]'>
                        {item.title}
                      </h3>

                      <p className='mt-1 text-sm leading-6 text-[#718396]'>
                        {item.description}
                      </p>
                    </div>

                    <ArrowRight className='size-4 shrink-0 text-[#8a9baa] transition-transform duration-200 group-hover:translate-x-1 group-hover:text-[#3f88b2]' />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
