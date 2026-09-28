import Link from 'next/link';

import { ArrowRight, Headphones, MessageCircle } from 'lucide-react';

export function HelpSupportCard() {
  return (
    <section id='support' className='px-6 pb-20 sm:px-8 lg:px-10 lg:pb-24'>
      <div className='mx-auto max-w-5xl'>
        <div className='flex flex-col gap-6 rounded-[2rem] border border-[#d7e7ef] bg-white p-6 shadow-[0_18px_50px_rgba(16,42,67,0.06)] sm:p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10'>
          <div className='flex gap-4'>
            <div className='flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#e5f5fc] text-[#3f88b2]'>
              <Headphones className='size-5' />
            </div>

            <div>
              <p className='text-sm font-semibold uppercase tracking-[0.14em] text-[#6590aa]'>
                Need more help?
              </p>

              <h2 className='mt-1.5 text-2xl font-semibold tracking-tight text-[#102a43]'>
                Our support team can step in.
              </h2>

              <p className='mt-2 max-w-2xl text-sm leading-6 text-[#718396]'>
                When the Concierge cannot answer your question, contact AeroPass
                support with your booking details and message.
              </p>
            </div>
          </div>

          <Link
            href='#chat'
            className='inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-[#102a43] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#183b5b]'
          >
            <MessageCircle className='size-4' />
            Ask Concierge
            <ArrowRight className='size-4' />
          </Link>
        </div>
      </div>
    </section>
  );
}
