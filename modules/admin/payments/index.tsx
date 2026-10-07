'use client';

import { PaymentDetail } from './components/detail';
import { PaymentFilters } from './components/filters';
import { PaymentHeader } from './components/header';
import { PaymentList } from './components/list';
import { PaymentStats } from './components/stats';

import { usePayments } from './hooks/use-payment';

export function Payments() {
  const {
    filteredPayments,
    selectedPayment,
    selectedPaymentId,
    stats,
    filters,
    hasFilters,

    updateSearch,
    updateStatus,
    updateMethod,

    resetFilters,
    selectPayment,
  } = usePayments();

  return (
    <div className='flex flex-col gap-6'>
      <PaymentHeader stats={stats} />

      <PaymentStats stats={stats} />

      <PaymentFilters
        search={filters.search}
        status={filters.status}
        method={filters.method}
        resultCount={filteredPayments.length}
        hasFilters={hasFilters}
        onSearchChange={updateSearch}
        onStatusChange={updateStatus}
        onMethodChange={updateMethod}
        onReset={resetFilters}
      />

      <div className='grid min-w-0 items-start gap-6 xl:grid-cols-[minmax(0,1fr)_390px]'>
        <PaymentList
          payments={filteredPayments}
          selectedPaymentId={selectedPaymentId}
          onSelect={selectPayment}
        />

        <PaymentDetail payment={selectedPayment} />
      </div>
    </div>
  );
}
