import Link from 'next/link';
import { AlertCircle, ArrowLeft, CreditCard } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';
import { CustomerPageHeader } from '@/components/customer/shared/customer-page-header';

import { getCustomerPaymentDetailView } from '@/modules/customer/payments/data/payment-view';
import { PaymentAttempts } from './components/payment-attempts';
import { PaymentBookingSummary } from './components/payment-booking-summary';
import { PaymentOverview } from './components/payment-overview';
import { PaymentRefundSummary } from './components/payment-refund-summary';

interface CustomerPaymentDetailsModuleProps {
  customerId: string;
  paymentId: string;
}

export function CustomerPaymentDetailsModule({
  customerId,
  paymentId,
}: CustomerPaymentDetailsModuleProps) {
  const payment = getCustomerPaymentDetailView(customerId, paymentId);

  if (!payment) {
    return (
      <section className="space-y-5">
        <CustomerPageHeader
          eyebrow="Payment center"
          title="Payment not found"
          description="This payment record may not exist or may not belong to the current customer account."
          actions={
            <Link href="/customer/payments" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
              <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to payments
            </Link>
          }
        />
        <CustomerEmptyState
          title="Payment record unavailable"
          description="Check the payment link or return to your payment history. Only records connected to your own AeroPass bookings can be viewed."
          icon={AlertCircle}
          actionLabel="View my payments"
          actionHref="/customer/payments"
        />
      </section>
    );
  }

  return (
    <section className="space-y-6">
      <CustomerPageHeader
        eyebrow="Payment center"
        title="Payment details"
        description={`Review transaction ${payment.providerReference}, its related booking, attempt history, and any linked refund request.`}
        actions={
          <Link href="/customer/payments" className="inline-flex min-h-9 items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-semibold text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5BA9D6] focus-visible:ring-offset-2">
            <ArrowLeft className="size-3.5" aria-hidden="true" /> Back to payments
          </Link>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] xl:items-start">
        <div className="space-y-4">
          <PaymentOverview payment={payment} />
          <PaymentAttempts payment={payment} />
          <PaymentRefundSummary payment={payment} />
        </div>
        <div className="space-y-4 xl:sticky xl:top-6">
          <PaymentBookingSummary payment={payment} />
          <div className="rounded-2xl border border-[#D9EAF3] bg-[#EEF7FB]/70 p-4 text-xs leading-5 text-[#34556D]">
            <div className="flex items-center gap-2 font-semibold text-[#102A43]">
              <CreditCard className="size-4" aria-hidden="true" /> Local mock payment record
            </div>
            <p className="mt-2">AeroPass is displaying local demonstration data. This page does not charge a payment method, contact a provider, or initiate a refund.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
