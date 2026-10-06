import { AdminFilterBar } from '@/components/filter-bar';
import { AdminFilterSelect } from '@/components/filter-select';

import type {
  BookingPaymentMethodFilter,
  BookingPaymentStatusFilter,
  BookingStatusFilter,
} from '../types/booking';

interface BookingFiltersProps {
  search: string;

  status: BookingStatusFilter;

  paymentStatus: BookingPaymentStatusFilter;

  paymentMethod: BookingPaymentMethodFilter;

  resultCount: number;

  onSearchChange: (value: string) => void;

  onStatusChange: (value: BookingStatusFilter) => void;

  onPaymentStatusChange: (value: BookingPaymentStatusFilter) => void;

  onPaymentMethodChange: (value: BookingPaymentMethodFilter) => void;

  onReset: () => void;
}

const statusOptions = [
  {
    label: 'All booking statuses',
    value: 'ALL',
  },
  {
    label: 'Pending payment',
    value: 'PENDING_PAYMENT',
  },
  {
    label: 'Confirmed',
    value: 'CONFIRMED',
  },
  {
    label: 'Checked in',
    value: 'CHECKED_IN',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
  {
    label: 'Refund pending',
    value: 'REFUND_PENDING',
  },
  {
    label: 'Refunded',
    value: 'REFUNDED',
  },
];

const paymentStatusOptions = [
  {
    label: 'All payment statuses',
    value: 'ALL',
  },
  {
    label: 'Pending',
    value: 'PENDING',
  },
  {
    label: 'Processing',
    value: 'PROCESSING',
  },
  {
    label: 'Paid',
    value: 'PAID',
  },
  {
    label: 'Failed',
    value: 'FAILED',
  },
  {
    label: 'Cancelled',
    value: 'CANCELLED',
  },
  {
    label: 'Refunded',
    value: 'REFUNDED',
  },
];

const paymentMethodOptions = [
  {
    label: 'All payment methods',
    value: 'ALL',
  },
  {
    label: 'GCash',
    value: 'GCASH',
  },
  {
    label: 'Maya',
    value: 'MAYA',
  },
  {
    label: 'QR Ph',
    value: 'QRPH',
  },
  {
    label: 'Card',
    value: 'CARD',
  },
  {
    label: 'Bank transfer',
    value: 'BANK_TRANSFER',
  },
];

export function BookingFilters({
  search,
  status,
  paymentStatus,
  paymentMethod,
  resultCount,
  onSearchChange,
  onStatusChange,
  onPaymentStatusChange,
  onPaymentMethodChange,
  onReset,
}: BookingFiltersProps) {
  const hasFilters =
    search.length > 0 ||
    status !== 'ALL' ||
    paymentStatus !== 'ALL' ||
    paymentMethod !== 'ALL';

  return (
    <AdminFilterBar
      search={search}
      searchPlaceholder='Search reference, customer, passenger, flight...'
      resultCount={resultCount}
      resultLabel='booking'
      resultLabelPlural='bookings'
      hasFilters={hasFilters}
      onSearchChange={onSearchChange}
      onReset={onReset}
      helperText='Select a booking to inspect passengers, travel, and payment details.'
    >
      <AdminFilterSelect
        id='booking-status'
        label='Booking status'
        value={status}
        options={statusOptions}
        onChange={(value) => onStatusChange(value as BookingStatusFilter)}
        className='w-full sm:w-[175px]'
      />

      <AdminFilterSelect
        id='booking-payment-status'
        label='Payment status'
        value={paymentStatus}
        options={paymentStatusOptions}
        onChange={(value) =>
          onPaymentStatusChange(value as BookingPaymentStatusFilter)
        }
        className='w-full sm:w-[180px]'
      />

      <AdminFilterSelect
        id='booking-payment-method'
        label='Payment method'
        value={paymentMethod}
        options={paymentMethodOptions}
        onChange={(value) =>
          onPaymentMethodChange(value as BookingPaymentMethodFilter)
        }
        className='w-full sm:w-[180px]'
      />
    </AdminFilterBar>
  );
}
