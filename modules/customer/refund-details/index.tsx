import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';
import { CustomerStatusBadge } from '@/components/customer/shared/customer-status-badge';

import { RefundOverview } from './components/overview';
import { RefundBookingSummary } from './components/booking-summary';
import { RefundStatusTimeline } from './components/status-timeline';

import type { CustomerRefundDetail } from '@/modules/customer/refunds/types/refund';

interface CustomerRefundDetailsModuleProps {
  refund: CustomerRefundDetail;
}

export function CustomerRefundDetailsModule({
  refund,
}: CustomerRefundDetailsModuleProps) {
  return (
    <section className='space-y-6'>
      <Link
        href='/customer/refunds'
        className='inline-flex min-h-9 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-muted-foreground outline-none transition hover:bg-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-[#5BA9D6]'
      >
        <ArrowLeft className='size-3.5' aria-hidden='true' />
        Back to my refunds
      </Link>

      <CustomerPageHeader
        eyebrow={`Refund ${refund.refund.id}`}
        title='Refund details'
        description='Review your refund amount, recorded status, associated booking, original payment, and processing history.'
        actions={<CustomerStatusBadge status={refund.refund.status} />}
      />

      <div className='grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]'>
        <div className='min-w-0 space-y-6'>
          <RefundOverview record={refund} />

          <RefundBookingSummary record={refund} />
        </div>

        <div className='min-w-0 space-y-6'>
          <RefundStatusTimeline record={refund} />

          <section className='rounded-2xl border border-[#D9EAF3] bg-[#EEF7FB]/70 p-4 sm:p-5'>
            <h2 className='text-sm font-semibold text-[#102A43]'>
              Need help with this refund?
            </h2>

            <p className='mt-2 text-xs leading-5 text-[#34556D]'>
              Review the original booking and payment records first. If the
              refund information needs correction, contact the airline support
              team through your configured support channel.
            </p>

            <Link
              href='/customer/help'
              className='mt-4 inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-[#B8D6E6] bg-white px-3.5 py-2 text-xs font-semibold text-[#102A43] outline-none transition hover:bg-[#E5F5FC] focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2'
            >
              Help & support
              <ArrowUpRight className='size-3.5' aria-hidden='true' />
            </Link>
          </section>
        </div>
      </div>

      <p className='text-[11px] leading-5 text-muted-foreground'>
        AeroPass local mock mode: this detail page displays existing refund and
        booking records. It does not initiate or transfer a refund.
      </p>
    </section>
  );
}
