import { CreditCard, SearchX } from 'lucide-react';

import { CustomerEmptyState } from '@/components/customer/shared/empty-state';

import type { CustomerPaymentItem } from '../types/payment';
import { PaymentListItem } from './payment-list-item';

interface PaymentListProps {
  payments: CustomerPaymentItem[];
  totalPayments: number;
  hasFilters: boolean;
  onReset: () => void;
}

export function PaymentList({
  payments,
  totalPayments,
  hasFilters,
  onReset,
}: PaymentListProps) {
  if (totalPayments === 0) {
    return (
      <CustomerEmptyState
        title="No payment records yet"
        description="Payment records connected to your AeroPass bookings will appear here. Open My Bookings to review a reservation or its payment status."
        icon={CreditCard}
        actionLabel="View my bookings"
        actionHref="/customer/bookings"
      />
    );
  }

  if (payments.length === 0) {
    return (
      <CustomerEmptyState
        title="No payments match your filters"
        description="Try another reference, payment method, flight, route, or payment status."
        icon={SearchX}
        actionLabel={hasFilters ? 'Clear filters' : undefined}
        onAction={hasFilters ? onReset : undefined}
      />
    );
  }

  return (
    <section className="space-y-3" aria-label="Customer payment records">
      <div className="flex items-center justify-between gap-3 px-1">
        <h2 className="text-sm font-semibold text-foreground">Payment history</h2>
        <p className="text-xs text-muted-foreground">Showing {payments.length} of {totalPayments}</p>
      </div>
      <div className="grid gap-3">
        {payments.map((payment) => (
          <PaymentListItem key={payment.id} payment={payment} />
        ))}
      </div>
    </section>
  );
}
